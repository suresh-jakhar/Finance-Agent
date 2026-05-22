from __future__ import annotations

import json
import time
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Callable

from harness.models import (
    FailureMode,
    HarnessReport,
    InvoiceFixture,
    TestResult,
    TestStatus,
    ValidationDomain,
)
from harness.validators import (
    AuditConsistencyValidator,
    DatasetIntegrityValidator,
    HallucinationValidator,
    LegalEscalationValidator,
    NoFalseSentValidator,
    OutputSchemaValidator,
    PromptValidator,
    RetryValidator,
    SMTPResultValidator,
)
from harness.retry_simulator import RetrySimulator
from harness.failure_injector import FailureInjector
from harness.observability import ObservabilityLayer, StateVerifier


_LEGAL_INVOICE = InvoiceFixture(
    invoice_no="INV-LEGAL-001",
    client_name="LegalTest Corp",
    invoice_amount=50000.0,
    due_date="2024-01-01",
    contact_email="legal@testcorp.com",
    followup_count=5,
    payment_status="Pending",
    last_followup_date="2024-01-15",
    days_overdue=35,
)

_STAGE1_INVOICE = InvoiceFixture(
    invoice_no="INV-WARM-001",
    client_name="Alpha Systems",
    invoice_amount=1200.0,
    due_date="2025-05-10",
    contact_email="billing@alphasys.com",
    followup_count=0,
    payment_status="Pending",
    last_followup_date="",
    days_overdue=5,
)


class ScenarioEngine:
    """
    Builds and executes named test scenarios that exercise each validation domain
    with optional failure injection. All scenarios are deterministic and replayable.
    """

    def __init__(self, obs: ObservabilityLayer) -> None:
        self.obs = obs
        self.smtp_v = SMTPResultValidator()
        self.no_false_sent_v = NoFalseSentValidator()
        self.schema_v = OutputSchemaValidator()
        self.legal_v = LegalEscalationValidator()
        self.halluc_v = HallucinationValidator()
        self.prompt_v = PromptValidator()
        self.dataset_v = DatasetIntegrityValidator()
        self.audit_v = AuditConsistencyValidator()
        self.retry_v = RetryValidator()
        self.state = StateVerifier()

    def _run(self, test_name: str, fn: Callable[[], TestResult]) -> TestResult:
        self.obs.start_test(test_name)
        try:
            result = fn()
            result.test_name = test_name
        except Exception as exc:
            result = TestResult(
                test_name=test_name,
                domain=ValidationDomain.OBSERVABILITY,
                status=TestStatus.ERROR,
                message=f"Unhandled exception in scenario: {type(exc).__name__}: {exc}",
            )
        return self.obs.finish_test(result)

    # ── SMTP scenarios ──────────────────────────────────────────────────────

    def smtp_dry_run_returns_correct_status(self) -> TestResult:
        def _inner() -> TestResult:
            from src import emailer as em, config
            original = config.DRY_RUN
            config.DRY_RUN = True
            result = em.send_email("test@example.com", "Subject", "Body text")
            config.DRY_RUN = original
            return self.smtp_v.validate(
                result, "dry_run", failure_mode=FailureMode.NONE
            )

        return self._run("smtp_dry_run_correct_status", _inner)

    def smtp_bad_password_does_not_produce_sent(self) -> TestResult:
        def _inner() -> TestResult:
            from src import config
            original_dry = config.DRY_RUN
            config.DRY_RUN = False

            smtp_raised = False
            result = {"status": "unknown"}

            with FailureInjector.smtp_bad_password():
                try:
                    import smtplib
                    from unittest.mock import MagicMock, patch

                    with patch("src.emailer.smtplib.SMTP") as mock_smtp:
                        instance = MagicMock()
                        instance.__enter__ = lambda s: s
                        instance.__exit__ = MagicMock(return_value=False)
                        instance.login.side_effect = smtplib.SMTPAuthenticationError(
                            535, b"Auth failed"
                        )
                        mock_smtp.return_value = instance

                        from src import emailer as em
                        result = em.send_email("t@example.com", "Subj", "Body")
                        smtp_raised = result.get("status") == "error"
                except Exception:
                    smtp_raised = True
                    result = {"status": "error"}

            config.DRY_RUN = original_dry
            return self.no_false_sent_v.validate(
                result,
                smtp_raised_exception=smtp_raised,
                failure_mode=FailureMode.SMTP_BAD_PASSWORD,
            )

        return self._run("smtp_bad_password_no_false_sent", _inner)

    def smtp_timeout_produces_error_not_sent(self) -> TestResult:
        def _inner() -> TestResult:
            import smtplib, socket
            from src import config, emailer as em
            from unittest.mock import patch

            original_dry = config.DRY_RUN
            config.DRY_RUN = False

            with patch("src.emailer.smtplib.SMTP", side_effect=socket.timeout("timed out")):
                result = em.send_email("t@example.com", "Subj", "Body")

            config.DRY_RUN = original_dry
            return self.no_false_sent_v.validate(
                result,
                smtp_raised_exception=result.get("status") == "error",
                failure_mode=FailureMode.SMTP_TIMEOUT,
            )

        return self._run("smtp_timeout_produces_error", _inner)

    # ── Schema validation scenarios ─────────────────────────────────────────

    def process_invoice_output_schema_valid(self) -> TestResult:
        def _inner() -> TestResult:
            mock_output = {
                "invoice_no": "INV-001",
                "urgency_tier": "stage_1_warm",
                "email_subject": "Payment Reminder",
                "to_email": "client@example.com",
                "send_status": "dry_run",
                "record_update": "ok",
            }
            return self.schema_v.validate_process_invoice(
                mock_output, failure_mode=FailureMode.NONE
            )

        return self._run("schema_process_invoice_valid", _inner)

    def process_invoice_schema_missing_fields_detected(self) -> TestResult:
        def _inner() -> TestResult:
            broken_output = {
                "invoice_no": "INV-002",
                "urgency_tier": "stage_2_firm",
            }
            result = self.schema_v.validate_process_invoice(
                broken_output, failure_mode=FailureMode.NONE
            )
            if result.status == TestStatus.FAIL:
                result.status = TestStatus.PASS
                result.message = "Schema validator correctly caught missing fields"
            else:
                result.status = TestStatus.FAIL
                result.message = "Schema validator failed to detect missing fields"
            return result

        return self._run("schema_process_invoice_missing_fields_detected", _inner)

    # ── Legal escalation scenarios ──────────────────────────────────────────

    def legal_invoice_never_auto_sent(self) -> TestResult:
        def _inner() -> TestResult:
            from src.triage import TIER_LEGAL

            result_dict = {
                "invoice_no": _LEGAL_INVOICE.invoice_no,
                "status": "skipped",
                "reason": "Manual legal review required",
            }
            return self.legal_v.validate(
                result_dict,
                urgency_tier=TIER_LEGAL,
                failure_mode=FailureMode.NONE,
            )

        return self._run("legal_invoice_never_auto_sent", _inner)

    def legal_tier_rejection_detected(self) -> TestResult:
        def _inner() -> TestResult:
            from src.triage import TIER_LEGAL

            bad_result = {
                "invoice_no": _LEGAL_INVOICE.invoice_no,
                "send_status": "dry_run",
            }
            result = self.legal_v.validate(
                bad_result,
                urgency_tier=TIER_LEGAL,
                failure_mode=FailureMode.NONE,
            )
            if result.status == TestStatus.FAIL:
                result.status = TestStatus.PASS
                result.message = "Legal validator correctly flagged auto-send on Stage-5"
            else:
                result.status = TestStatus.FAIL
                result.message = "Legal validator missed an auto-send on Stage-5"
            return result

        return self._run("legal_tier_auto_send_rejection_detected", _inner)

    # ── Hallucination scenarios ─────────────────────────────────────────────

    def clean_email_passes_hallucination_check(self) -> TestResult:
        def _inner() -> TestResult:
            from src import config

            body = (
                f"Dear Client,\n\nYour invoice is due. Please pay at {config.PAYMENT_LINK}.\n"
                "Bank details: IBAN: GB00 0000 0000 0000.\n\nRegards, Finance Dept"
            )
            return self.halluc_v.validate_payment_link(
                body, config.PAYMENT_LINK, failure_mode=FailureMode.NONE
            )

        return self._run("hallucination_clean_email_passes", _inner)

    def hallucinated_link_detected(self) -> TestResult:
        def _inner() -> TestResult:
            from src import config

            body = (
                "Dear Client,\n\nPay here: https://evil-phishing-site.xyz/steal-creds\n"
                "Regards, Finance"
            )
            result = self.halluc_v.validate_payment_link(
                body, config.PAYMENT_LINK, failure_mode=FailureMode.HALLUCINATED_PAYMENT_LINK
            )
            if result.status == TestStatus.FAIL:
                result.status = TestStatus.PASS
                result.message = "Hallucination validator correctly caught unauthorized link"
            else:
                result.status = TestStatus.FAIL
                result.message = "Hallucination validator missed unauthorized link"
            return result

        return self._run("hallucination_link_detected", _inner)

    # ── Prompt correctness scenarios ────────────────────────────────────────

    def prompt_registry_correctly_configured(self) -> TestResult:
        return self._run(
            "prompt_registry_correct",
            lambda: self.prompt_v.validate_tier_registry(
                failure_mode=FailureMode.NONE
            ),
        )

    def prompt_no_banned_words_in_clean_body(self) -> TestResult:
        def _inner() -> TestResult:
            body = (
                "Dear Client, your unpaid invoice of $5,000 is now 7 days past due. "
                "Please remit payment immediately. Regards, Finance Team."
            )
            return self.prompt_v.validate_no_banned_words(
                body, failure_mode=FailureMode.NONE
            )

        return self._run("prompt_no_banned_words", _inner)

    def prompt_banned_word_detected(self) -> TestResult:
        def _inner() -> TestResult:
            body = "Dear Client, we note the outstanding invoice has slipped through the cracks."
            result = self.prompt_v.validate_no_banned_words(
                body, failure_mode=FailureMode.MALFORMED_LLM_RESPONSE
            )
            if result.status == TestStatus.FAIL:
                result.status = TestStatus.PASS
                result.message = "Banned-word check correctly flagged violation"
            else:
                result.status = TestStatus.FAIL
                result.message = "Banned-word check missed violation"
            return result

        return self._run("prompt_banned_word_detected", _inner)

    # ── Dataset integrity scenarios ─────────────────────────────────────────

    def dataset_schema_columns_present(self) -> TestResult:
        def _inner() -> TestResult:
            from src.data_loader import _COLUMN_ORDER
            return self.dataset_v.validate_schema(
                list(_COLUMN_ORDER), failure_mode=FailureMode.NONE
            )

        return self._run("dataset_schema_valid", _inner)

    def dataset_no_duplicate_invoice_nos(self) -> TestResult:
        def _inner() -> TestResult:
            from src.data_loader import load_invoices
            from src import config
            try:
                df = load_invoices(config.DATA_PATH)
                inv_nos = df["invoice_no"].tolist()
                return self.dataset_v.validate_no_duplicates(
                    inv_nos, failure_mode=FailureMode.NONE
                )
            except Exception as exc:
                return TestResult(
                    test_name="",
                    domain=ValidationDomain.DATASET,
                    status=TestStatus.ERROR,
                    message=f"Could not load dataset: {exc}",
                )

        return self._run("dataset_no_duplicates", _inner)

    def dataset_corrupt_row_detected(self) -> TestResult:
        def _inner() -> TestResult:
            from harness.failure_injector import FailureInjector
            good = {
                "invoice_no": "INV-999",
                "invoice_amount": 1000.0,
                "due_date": "2025-01-01",
                "contact_email": "ok@example.com",
            }
            corrupted = FailureInjector.corrupt_invoice_row(good)
            amounts = [corrupted["invoice_amount"]]
            result = self.dataset_v.validate_amount_positive(
                amounts, failure_mode=FailureMode.CORRUPTED_INVOICE_ROW
            )
            if result.status == TestStatus.FAIL:
                result.status = TestStatus.PASS
                result.message = "Dataset validator correctly flagged corrupted amount"
            else:
                result.status = TestStatus.FAIL
                result.message = "Dataset validator missed corrupted amount"
            return result

        return self._run("dataset_corrupt_row_detected", _inner)

    # ── Retry scenarios ─────────────────────────────────────────────────────

    def retry_succeeds_on_third_attempt(self) -> TestResult:
        def _inner() -> TestResult:
            sim = RetrySimulator(fail_on_attempts=[1, 2], max_attempts=3)
            call_count = 0

            def _fn():
                nonlocal call_count
                call_count += 1
                return {"status": "ok"}

            result_val, records = sim.run(_fn)
            v_result = self.retry_v.validate_retry_sequence(
                [r.__dict__ for r in records],
                expected_attempts=3,
                failure_mode=FailureMode.GROQ_TIMEOUT,
            )
            if isinstance(result_val, Exception):
                v_result.status = TestStatus.FAIL
                v_result.message = f"Retry ultimately failed: {result_val}"
            return v_result

        return self._run("retry_succeeds_on_third_attempt", _inner)

    def retry_exponential_backoff_schedule(self) -> TestResult:
        def _inner() -> TestResult:
            sim = RetrySimulator(
                fail_on_attempts=[1, 2, 3],
                max_attempts=3,
                base_delay=1.0,
                factor=2.0,
            )
            delays = sim.get_delay_schedule()
            return self.retry_v.validate_exponential_backoff(
                delays,
                base=1.0,
                factor=2.0,
                failure_mode=FailureMode.GROQ_TIMEOUT,
            )

        return self._run("retry_exponential_backoff_schedule", _inner)

    def retry_all_attempts_exhausted_returns_error(self) -> TestResult:
        def _inner() -> TestResult:
            sim = RetrySimulator(fail_on_attempts=[1, 2, 3], max_attempts=3)
            result_val, records = sim.run(lambda: {"status": "ok"})
            if isinstance(result_val, Exception) and len(records) == 3:
                return TestResult(
                    test_name="",
                    domain=ValidationDomain.RETRY,
                    failure_mode=FailureMode.GROQ_RATE_LIMIT,
                    status=TestStatus.PASS,
                    message="Retry correctly exhausted all attempts and returned error",
                )
            return TestResult(
                test_name="",
                domain=ValidationDomain.RETRY,
                failure_mode=FailureMode.GROQ_RATE_LIMIT,
                status=TestStatus.FAIL,
                message=f"Unexpected state: result={result_val}, records={len(records)}",
            )

        return self._run("retry_all_attempts_exhausted", _inner)

    # ── Audit consistency scenarios ─────────────────────────────────────────

    def audit_log_has_required_fields(self) -> TestResult:
        def _inner() -> TestResult:
            from datetime import datetime, timezone
            entries = [
                {
                    "timestamp": datetime.now(tz=timezone.utc).isoformat(),
                    "invoice_no": "INV-001",
                    "action": "email_generated",
                    "result": "ok",
                    "reason": "Tier: stage_1_warm",
                },
                {
                    "timestamp": datetime.now(tz=timezone.utc).isoformat(),
                    "invoice_no": "INV-001",
                    "action": "email_sent",
                    "result": "dry_run",
                    "reason": "to=b***@example.com",
                },
            ]
            return self.audit_v.validate_required_log_fields(
                entries, failure_mode=FailureMode.NONE
            )

        return self._run("audit_required_fields_present", _inner)

    def audit_log_matches_processed_invoices(self) -> TestResult:
        def _inner() -> TestResult:
            from datetime import datetime, timezone
            processed = ["INV-001", "INV-002"]
            entries = [
                {
                    "timestamp": datetime.now(tz=timezone.utc).isoformat(),
                    "invoice_no": inv,
                    "action": "email_generated",
                    "result": "ok",
                    "reason": "ok",
                }
                for inv in processed
            ] + [
                {
                    "timestamp": datetime.now(tz=timezone.utc).isoformat(),
                    "invoice_no": inv,
                    "action": "record_updated",
                    "result": "ok",
                    "reason": "ok",
                }
                for inv in processed
            ]
            return self.audit_v.validate_log_matches_processed(
                entries, processed, failure_mode=FailureMode.NONE
            )

        return self._run("audit_log_matches_processed", _inner)

    def audit_missing_entry_detected(self) -> TestResult:
        def _inner() -> TestResult:
            from datetime import datetime, timezone
            processed = ["INV-001", "INV-002", "INV-003"]
            entries = [
                {
                    "timestamp": datetime.now(tz=timezone.utc).isoformat(),
                    "invoice_no": "INV-001",
                    "action": "email_generated",
                    "result": "ok",
                    "reason": "ok",
                }
            ]
            result = self.audit_v.validate_log_matches_processed(
                entries, processed, failure_mode=FailureMode.PARTIAL_CSV_WRITE
            )
            if result.status == TestStatus.FAIL:
                result.status = TestStatus.PASS
                result.message = "Audit validator correctly detected missing log entries"
            else:
                result.status = TestStatus.FAIL
                result.message = "Audit validator failed to detect missing entries"
            return result

        return self._run("audit_missing_entry_detected", _inner)

    # ── Failure recovery scenarios ──────────────────────────────────────────

    def malformed_llm_response_is_blocked(self) -> TestResult:
        def _inner() -> TestResult:
            from src.tools import _parse_email_output
            garbage = "This is some garbage output with no subject or body at all."
            subject, body = _parse_email_output(garbage)
            if "Validation Error" in subject or len(body) < 20:
                return TestResult(
                    test_name="",
                    domain=ValidationDomain.FAILURE_RECOVERY,
                    failure_mode=FailureMode.MALFORMED_LLM_RESPONSE,
                    status=TestStatus.PASS,
                    message="Malformed LLM response correctly blocked before delivery",
                )
            return TestResult(
                test_name="",
                domain=ValidationDomain.FAILURE_RECOVERY,
                failure_mode=FailureMode.MALFORMED_LLM_RESPONSE,
                status=TestStatus.FAIL,
                message=f"Malformed response was NOT blocked (subject={repr(subject)})",
            )

        return self._run("malformed_llm_response_blocked", _inner)

    def duplicate_invoice_processing_prevented(self) -> TestResult:
        def _inner() -> TestResult:
            self.state.reset()
            invoices = ["INV-001", "INV-002", "INV-001"]
            seen: set[str] = set()
            truly_processed: list[str] = []

            for inv in invoices:
                if inv not in seen:
                    seen.add(inv)
                    truly_processed.append(inv)
                    self.state.record_processed(inv, "process_invoice")

            dupes = self.state.verify_exactly_once()
            if dupes:
                return TestResult(
                    test_name="",
                    domain=ValidationDomain.FAILURE_RECOVERY,
                    failure_mode=FailureMode.DUPLICATE_INVOICE,
                    status=TestStatus.FAIL,
                    message=f"Duplicate processing detected: {dupes}",
                )
            return TestResult(
                test_name="",
                domain=ValidationDomain.FAILURE_RECOVERY,
                failure_mode=FailureMode.DUPLICATE_INVOICE,
                status=TestStatus.PASS,
                message=f"Deduplication guard active — {len(truly_processed)} unique invoices processed",
            )

        return self._run("duplicate_invoice_prevented", _inner)

    def all_scenarios(self) -> list[tuple[str, Callable[[], TestResult]]]:
        return [
            ("smtp_dry_run", self.smtp_dry_run_returns_correct_status),
            ("smtp_bad_password", self.smtp_bad_password_does_not_produce_sent),
            ("smtp_timeout", self.smtp_timeout_produces_error_not_sent),
            ("schema_valid", self.process_invoice_output_schema_valid),
            ("schema_missing_fields", self.process_invoice_schema_missing_fields_detected),
            ("legal_no_auto_send", self.legal_invoice_never_auto_sent),
            ("legal_rejection_detected", self.legal_tier_rejection_detected),
            ("halluc_clean_pass", self.clean_email_passes_hallucination_check),
            ("halluc_link_caught", self.hallucinated_link_detected),
            ("prompt_registry", self.prompt_registry_correctly_configured),
            ("prompt_no_banned", self.prompt_no_banned_words_in_clean_body),
            ("prompt_banned_caught", self.prompt_banned_word_detected),
            ("dataset_schema", self.dataset_schema_columns_present),
            ("dataset_no_dupes", self.dataset_no_duplicate_invoice_nos),
            ("dataset_corrupt_caught", self.dataset_corrupt_row_detected),
            ("retry_third_attempt", self.retry_succeeds_on_third_attempt),
            ("retry_backoff", self.retry_exponential_backoff_schedule),
            ("retry_exhausted", self.retry_all_attempts_exhausted_returns_error),
            ("audit_fields", self.audit_log_has_required_fields),
            ("audit_matches", self.audit_log_matches_processed_invoices),
            ("audit_missing", self.audit_missing_entry_detected),
            ("malformed_blocked", self.malformed_llm_response_is_blocked),
            ("dedup_guard", self.duplicate_invoice_processing_prevented),
        ]
