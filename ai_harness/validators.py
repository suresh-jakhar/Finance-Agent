from __future__ import annotations

import re
import json
from typing import Any

from ai_harness.models import TestResult, TestStatus, ValidationDomain, FailureMode


class BaseValidator:
    domain: ValidationDomain

    def validate(self, *args: Any, **kwargs: Any) -> TestResult:
        raise NotImplementedError


class SMTPResultValidator(BaseValidator):
    domain = ValidationDomain.SMTP

    def validate(
        self,
        send_result: dict[str, Any],
        expected_status: str,
        test_name: str = "smtp_result_check",
        failure_mode: FailureMode = FailureMode.NONE,
    ) -> TestResult:
        actual = send_result.get("status", "")
        if actual == expected_status:
            return TestResult(
                test_name=test_name,
                domain=self.domain,
                failure_mode=failure_mode,
                status=TestStatus.PASS,
                message=f"SMTP status '{actual}' matched expected '{expected_status}'",
            )
        return TestResult(
            test_name=test_name,
            domain=self.domain,
            failure_mode=failure_mode,
            status=TestStatus.FAIL,
            message=f"Expected SMTP status '{expected_status}', got '{actual}'",
            metadata={"send_result": send_result},
        )


class NoFalseSentValidator(BaseValidator):
    """
    Guarantees that an email is never recorded as 'sent' when an error
    occurred during the SMTP transaction.
    """

    domain = ValidationDomain.SMTP

    def validate(
        self,
        send_result: dict[str, Any],
        smtp_raised_exception: bool,
        test_name: str = "no_false_sent_state",
        failure_mode: FailureMode = FailureMode.NONE,
    ) -> TestResult:
        status = send_result.get("status", "")
        if smtp_raised_exception and status == "sent":
            return TestResult(
                test_name=test_name,
                domain=self.domain,
                failure_mode=failure_mode,
                status=TestStatus.FAIL,
                message="FALSE SENT STATE: email recorded as 'sent' despite SMTP exception",
                metadata={"send_result": send_result},
            )
        return TestResult(
            test_name=test_name,
            domain=self.domain,
            failure_mode=failure_mode,
            status=TestStatus.PASS,
            message="No false sent state detected",
        )


class OutputSchemaValidator(BaseValidator):
    domain = ValidationDomain.OUTPUT_SCHEMA

    PROCESS_INVOICE_REQUIRED = {
        "invoice_no", "urgency_tier", "email_subject", "to_email",
        "send_status", "record_update"
    }
    EMAIL_REQUIRED = {"invoice_no", "to_email", "subject", "body"}
    SEND_REQUIRED = {"status", "to", "timestamp"}

    def validate_process_invoice(
        self,
        result: dict[str, Any],
        test_name: str = "output_schema_process_invoice",
        failure_mode: FailureMode = FailureMode.NONE,
    ) -> TestResult:
        return self._check_keys(
            result, self.PROCESS_INVOICE_REQUIRED, test_name, failure_mode
        )

    def validate_email_output(
        self,
        result: dict[str, Any],
        test_name: str = "output_schema_email_output",
        failure_mode: FailureMode = FailureMode.NONE,
    ) -> TestResult:
        return self._check_keys(
            result, self.EMAIL_REQUIRED, test_name, failure_mode
        )

    def validate_send_result(
        self,
        result: dict[str, Any],
        test_name: str = "output_schema_send_result",
        failure_mode: FailureMode = FailureMode.NONE,
    ) -> TestResult:
        return self._check_keys(
            result, self.SEND_REQUIRED, test_name, failure_mode
        )

    def _check_keys(
        self,
        result: dict[str, Any],
        required: set[str],
        test_name: str,
        failure_mode: FailureMode,
    ) -> TestResult:
        missing = required - set(result.keys())
        if missing:
            return TestResult(
                test_name=test_name,
                domain=self.domain,
                failure_mode=failure_mode,
                status=TestStatus.FAIL,
                message=f"Schema violation — missing keys: {sorted(missing)}",
                metadata={"result": result},
            )
        return TestResult(
            test_name=test_name,
            domain=self.domain,
            failure_mode=failure_mode,
            status=TestStatus.PASS,
            message="Output schema is valid",
        )


class LegalEscalationValidator(BaseValidator):
    """
    Stage 5 (legal_escalation) invoices MUST NEVER produce an auto-sent email.
    """

    domain = ValidationDomain.LEGAL_ESCALATION

    def validate(
        self,
        result: dict[str, Any],
        urgency_tier: str,
        test_name: str = "legal_escalation_no_auto_send",
        failure_mode: FailureMode = FailureMode.NONE,
    ) -> TestResult:
        from src.triage import TIER_LEGAL

        if urgency_tier != TIER_LEGAL:
            return TestResult(
                test_name=test_name,
                domain=self.domain,
                failure_mode=failure_mode,
                status=TestStatus.SKIP,
                message=f"Tier '{urgency_tier}' is not legal_escalation — skipped",
            )

        send_status = result.get("send_status") or result.get("status", "")
        if send_status in ("sent", "dry_run"):
            return TestResult(
                test_name=test_name,
                domain=self.domain,
                failure_mode=failure_mode,
                status=TestStatus.FAIL,
                message=f"CRITICAL: Stage-5 invoice auto-sent (status='{send_status}')",
                metadata={"result": result, "tier": urgency_tier},
            )
        return TestResult(
            test_name=test_name,
            domain=self.domain,
            failure_mode=failure_mode,
            status=TestStatus.PASS,
            message="Stage-5 invoice correctly blocked from auto-send",
        )


class HallucinationValidator(BaseValidator):
    domain = ValidationDomain.HALLUCINATION

    _KNOWN_PAYMENT_DOMAIN_PATTERN = re.compile(
        r"https?://payments\.example\.com", re.IGNORECASE
    )
    _EXTERNAL_LINK_PATTERN = re.compile(
        r"https?://(?!payments\.example\.com)[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,}[^\s]*",
        re.IGNORECASE,
    )

    def validate_payment_link(
        self,
        body: str,
        allowed_payment_link: str,
        test_name: str = "hallucination_payment_link",
        failure_mode: FailureMode = FailureMode.NONE,
    ) -> TestResult:
        external_links = self._EXTERNAL_LINK_PATTERN.findall(body)
        suspicious = [
            link for link in external_links
            if allowed_payment_link not in link
        ]
        if suspicious:
            return TestResult(
                test_name=test_name,
                domain=self.domain,
                failure_mode=failure_mode,
                status=TestStatus.FAIL,
                message=f"Hallucinated/unauthorized links detected: {suspicious[:3]}",
                metadata={"body_excerpt": body[:300], "suspicious_links": suspicious},
            )
        return TestResult(
            test_name=test_name,
            domain=self.domain,
            failure_mode=failure_mode,
            status=TestStatus.PASS,
            message="No hallucinated payment links found",
        )

    def validate_subject_present(
        self,
        subject: str,
        body: str,
        test_name: str = "hallucination_structure_check",
        failure_mode: FailureMode = FailureMode.NONE,
    ) -> TestResult:
        if not subject or len(body) < 20:
            return TestResult(
                test_name=test_name,
                domain=self.domain,
                failure_mode=failure_mode,
                status=TestStatus.FAIL,
                message=f"LLM output failed structure validation (subject={repr(subject)}, body_len={len(body)})",
            )
        return TestResult(
            test_name=test_name,
            domain=self.domain,
            failure_mode=failure_mode,
            status=TestStatus.PASS,
            message="Email structure is valid",
        )


class PromptValidator(BaseValidator):
    domain = ValidationDomain.PROMPT

    BANNED_WORDS = ["outstanding", "slipped through the cracks"]
    REQUIRED_TIERS = {
        "stage_1_warm", "stage_2_firm", "stage_3_serious", "stage_4_stern"
    }

    def validate_no_banned_words(
        self,
        body: str,
        test_name: str = "prompt_banned_words",
        failure_mode: FailureMode = FailureMode.NONE,
    ) -> TestResult:
        found = [w for w in self.BANNED_WORDS if w.lower() in body.lower()]
        if found:
            return TestResult(
                test_name=test_name,
                domain=self.domain,
                failure_mode=failure_mode,
                status=TestStatus.FAIL,
                message=f"Banned vocabulary detected in output: {found}",
                metadata={"body_excerpt": body[:200]},
            )
        return TestResult(
            test_name=test_name,
            domain=self.domain,
            failure_mode=failure_mode,
            status=TestStatus.PASS,
            message="No banned vocabulary detected",
        )

    def validate_tier_registry(
        self,
        test_name: str = "prompt_tier_registry",
        failure_mode: FailureMode = FailureMode.NONE,
    ) -> TestResult:
        from prompts.email_prompt import _PROMPT_REGISTRY
        from src.triage import TIER_LEGAL

        registered = set(_PROMPT_REGISTRY.keys())
        missing = self.REQUIRED_TIERS - registered
        if missing:
            return TestResult(
                test_name=test_name,
                domain=self.domain,
                failure_mode=failure_mode,
                status=TestStatus.FAIL,
                message=f"Prompt registry missing tiers: {missing}",
            )
        if TIER_LEGAL in registered:
            return TestResult(
                test_name=test_name,
                domain=self.domain,
                failure_mode=failure_mode,
                status=TestStatus.FAIL,
                message="CRITICAL: legal_escalation tier has an automated prompt — must be HITL only",
            )
        return TestResult(
            test_name=test_name,
            domain=self.domain,
            failure_mode=failure_mode,
            status=TestStatus.PASS,
            message="Prompt registry is correctly configured",
        )


class DatasetIntegrityValidator(BaseValidator):
    domain = ValidationDomain.DATASET

    REQUIRED_COLUMNS = {
        "invoice_no", "client_name", "invoice_amount", "due_date",
        "contact_email", "followup_count", "payment_status",
        "last_followup_date", "days_overdue",
    }

    def validate_schema(
        self,
        df_columns: list[str],
        test_name: str = "dataset_schema_check",
        failure_mode: FailureMode = FailureMode.NONE,
    ) -> TestResult:
        missing = self.REQUIRED_COLUMNS - set(df_columns)
        if missing:
            return TestResult(
                test_name=test_name,
                domain=self.domain,
                failure_mode=failure_mode,
                status=TestStatus.FAIL,
                message=f"Dataset missing required columns: {sorted(missing)}",
            )
        return TestResult(
            test_name=test_name,
            domain=self.domain,
            failure_mode=failure_mode,
            status=TestStatus.PASS,
            message="Dataset schema is valid",
        )

    def validate_no_duplicates(
        self,
        invoice_nos: list[str],
        test_name: str = "dataset_no_duplicate_invoice_nos",
        failure_mode: FailureMode = FailureMode.NONE,
    ) -> TestResult:
        seen: set[str] = set()
        dupes: list[str] = []
        for inv in invoice_nos:
            if inv in seen:
                dupes.append(inv)
            seen.add(inv)
        if dupes:
            return TestResult(
                test_name=test_name,
                domain=self.domain,
                failure_mode=failure_mode,
                status=TestStatus.FAIL,
                message=f"Duplicate invoice numbers detected: {dupes[:5]}",
                metadata={"duplicates": dupes},
            )
        return TestResult(
            test_name=test_name,
            domain=self.domain,
            failure_mode=failure_mode,
            status=TestStatus.PASS,
            message=f"No duplicate invoice numbers in {len(invoice_nos)} rows",
        )

    def validate_amount_positive(
        self,
        amounts: list[Any],
        test_name: str = "dataset_amounts_positive",
        failure_mode: FailureMode = FailureMode.NONE,
    ) -> TestResult:
        invalid = [a for a in amounts if not isinstance(a, (int, float)) or a <= 0]
        if invalid:
            return TestResult(
                test_name=test_name,
                domain=self.domain,
                failure_mode=failure_mode,
                status=TestStatus.FAIL,
                message=f"Non-positive invoice amounts found: {invalid[:5]}",
            )
        return TestResult(
            test_name=test_name,
            domain=self.domain,
            failure_mode=failure_mode,
            status=TestStatus.PASS,
            message="All invoice amounts are positive",
        )


class AuditConsistencyValidator(BaseValidator):
    domain = ValidationDomain.AUDIT

    def validate_log_matches_processed(
        self,
        log_entries: list[dict[str, Any]],
        processed_invoice_nos: list[str],
        test_name: str = "audit_log_matches_processed",
        failure_mode: FailureMode = FailureMode.NONE,
    ) -> TestResult:
        logged_invoices = {
            e["invoice_no"]
            for e in log_entries
            if e.get("action") in ("email_generated", "record_updated")
        } - {"SYSTEM"}
        processed_set = set(processed_invoice_nos)
        unlogged = processed_set - logged_invoices
        if unlogged:
            return TestResult(
                test_name=test_name,
                domain=self.domain,
                failure_mode=failure_mode,
                status=TestStatus.FAIL,
                message=f"Processed invoices not found in audit log: {unlogged}",
                metadata={"unlogged": list(unlogged)},
            )
        return TestResult(
            test_name=test_name,
            domain=self.domain,
            failure_mode=failure_mode,
            status=TestStatus.PASS,
            message=f"Audit log consistent — {len(processed_set)} invoices accounted for",
        )

    def validate_no_orphan_log_entries(
        self,
        log_entries: list[dict[str, Any]],
        valid_invoice_nos: list[str],
        test_name: str = "audit_no_orphan_entries",
        failure_mode: FailureMode = FailureMode.NONE,
    ) -> TestResult:
        valid_set = set(valid_invoice_nos) | {"SYSTEM"}
        orphans = [
            e for e in log_entries
            if e.get("invoice_no") not in valid_set
        ]
        if orphans:
            return TestResult(
                test_name=test_name,
                domain=self.domain,
                failure_mode=failure_mode,
                status=TestStatus.FAIL,
                message=f"Orphan log entries referencing unknown invoices: {[o['invoice_no'] for o in orphans[:3]]}",
            )
        return TestResult(
            test_name=test_name,
            domain=self.domain,
            failure_mode=failure_mode,
            status=TestStatus.PASS,
            message="No orphan log entries found",
        )

    def validate_required_log_fields(
        self,
        log_entries: list[dict[str, Any]],
        test_name: str = "audit_required_fields",
        failure_mode: FailureMode = FailureMode.NONE,
    ) -> TestResult:
        required = {"timestamp", "invoice_no", "action", "result", "reason"}
        violations = []
        for i, entry in enumerate(log_entries):
            missing = required - set(entry.keys())
            if missing:
                violations.append({"index": i, "missing": list(missing)})
        if violations:
            return TestResult(
                test_name=test_name,
                domain=self.domain,
                failure_mode=failure_mode,
                status=TestStatus.FAIL,
                message=f"Log entries missing required fields: {violations[:3]}",
            )
        return TestResult(
            test_name=test_name,
            domain=self.domain,
            failure_mode=failure_mode,
            status=TestStatus.PASS,
            message=f"All {len(log_entries)} log entries have required fields",
        )


class RetryValidator(BaseValidator):
    domain = ValidationDomain.RETRY

    def validate_retry_sequence(
        self,
        retry_records: list[dict[str, Any]],
        expected_attempts: int,
        test_name: str = "retry_sequence_correct",
        failure_mode: FailureMode = FailureMode.NONE,
    ) -> TestResult:
        if len(retry_records) != expected_attempts:
            return TestResult(
                test_name=test_name,
                domain=self.domain,
                failure_mode=failure_mode,
                status=TestStatus.FAIL,
                message=f"Expected {expected_attempts} retry attempts, got {len(retry_records)}",
                metadata={"records": retry_records},
            )
        for i, record in enumerate(retry_records):
            if record.get("attempt") != i + 1:
                return TestResult(
                    test_name=test_name,
                    domain=self.domain,
                    failure_mode=failure_mode,
                    status=TestStatus.FAIL,
                    message=f"Retry sequence out of order at index {i}: {record}",
                )
        return TestResult(
            test_name=test_name,
            domain=self.domain,
            failure_mode=failure_mode,
            status=TestStatus.PASS,
            message=f"Retry sequence correct — {expected_attempts} attempts recorded",
        )

    def validate_exponential_backoff(
        self,
        delays: list[float],
        base: float = 1.0,
        factor: float = 2.0,
        test_name: str = "retry_exponential_backoff",
        failure_mode: FailureMode = FailureMode.NONE,
    ) -> TestResult:
        for i in range(1, len(delays)):
            expected = base * (factor ** (i - 1))
            actual = delays[i - 1]
            if abs(actual - expected) > expected * 0.15:
                return TestResult(
                    test_name=test_name,
                    domain=self.domain,
                    failure_mode=failure_mode,
                    status=TestStatus.FAIL,
                    message=f"Backoff violation at attempt {i}: expected ~{expected:.2f}s, got {actual:.2f}s",
                    metadata={"delays": delays},
                )
        return TestResult(
            test_name=test_name,
            domain=self.domain,
            failure_mode=failure_mode,
            status=TestStatus.PASS,
            message=f"Exponential backoff verified across {len(delays)} delay intervals",
        )
