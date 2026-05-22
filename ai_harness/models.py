from __future__ import annotations

import uuid
from dataclasses import dataclass, field
from datetime import datetime, timezone
from enum import Enum
from typing import Any


class TestStatus(str, Enum):
    PASS = "PASS"
    FAIL = "FAIL"
    SKIP = "SKIP"
    ERROR = "ERROR"


class FailureMode(str, Enum):
    SMTP_BAD_PASSWORD = "smtp_bad_password"
    SMTP_TIMEOUT = "smtp_timeout"
    SMTP_REJECTION = "smtp_rejection"
    GROQ_TIMEOUT = "groq_timeout"
    GROQ_RATE_LIMIT = "groq_rate_limit_429"
    MALFORMED_LLM_RESPONSE = "malformed_llm_response"
    HALLUCINATED_PAYMENT_LINK = "hallucinated_payment_link"
    DUPLICATE_INVOICE = "duplicate_invoice_processing"
    SCHEDULER_INTERRUPT = "scheduler_interruption"
    CORRUPTED_INVOICE_ROW = "corrupted_invoice_row"
    PARTIAL_CSV_WRITE = "partial_csv_write"
    NETWORK_DISCONNECT = "network_disconnect"
    NONE = "none"


class ValidationDomain(str, Enum):
    SMTP = "smtp_reliability"
    GROQ = "groq_api_reliability"
    PROMPT = "prompt_correctness"
    OUTPUT_SCHEMA = "output_schema_validation"
    DATASET = "dataset_integrity"
    RETRY = "retry_behavior"
    LEGAL_ESCALATION = "legal_escalation_safety"
    AUDIT = "audit_consistency"
    HALLUCINATION = "hallucination_prevention"
    FAILURE_RECOVERY = "failure_recovery_behavior"
    OBSERVABILITY = "observability_and_metrics"


@dataclass
class TestResult:
    test_id: str = field(default_factory=lambda: str(uuid.uuid4())[:8])
    test_name: str = ""
    domain: ValidationDomain = ValidationDomain.SMTP
    failure_mode: FailureMode = FailureMode.NONE
    status: TestStatus = TestStatus.PASS
    message: str = ""
    duration_ms: float = 0.0
    timestamp: str = field(
        default_factory=lambda: datetime.now(tz=timezone.utc).isoformat()
    )
    metadata: dict[str, Any] = field(default_factory=dict)

    def to_dict(self) -> dict[str, Any]:
        return {
            "test_id": self.test_id,
            "test_name": self.test_name,
            "domain": self.domain.value,
            "failure_mode": self.failure_mode.value,
            "status": self.status.value,
            "message": self.message,
            "duration_ms": round(self.duration_ms, 3),
            "timestamp": self.timestamp,
            "metadata": self.metadata,
        }


@dataclass
class HarnessReport:
    run_id: str = field(default_factory=lambda: str(uuid.uuid4()))
    started_at: str = field(
        default_factory=lambda: datetime.now(tz=timezone.utc).isoformat()
    )
    finished_at: str = ""
    total: int = 0
    passed: int = 0
    failed: int = 0
    skipped: int = 0
    errors: int = 0
    results: list[TestResult] = field(default_factory=list)
    metrics: dict[str, Any] = field(default_factory=dict)

    def finalise(self) -> None:
        self.finished_at = datetime.now(tz=timezone.utc).isoformat()
        self.total = len(self.results)
        self.passed = sum(1 for r in self.results if r.status == TestStatus.PASS)
        self.failed = sum(1 for r in self.results if r.status == TestStatus.FAIL)
        self.skipped = sum(1 for r in self.results if r.status == TestStatus.SKIP)
        self.errors = sum(1 for r in self.results if r.status == TestStatus.ERROR)

    def to_dict(self) -> dict[str, Any]:
        return {
            "run_id": self.run_id,
            "started_at": self.started_at,
            "finished_at": self.finished_at,
            "summary": {
                "total": self.total,
                "passed": self.passed,
                "failed": self.failed,
                "skipped": self.skipped,
                "errors": self.errors,
                "pass_rate": (
                    round(self.passed / self.total * 100, 1) if self.total else 0
                ),
            },
            "results": [r.to_dict() for r in self.results],
            "metrics": self.metrics,
        }


@dataclass
class InvoiceFixture:
    invoice_no: str
    client_name: str
    invoice_amount: float
    due_date: str
    contact_email: str
    followup_count: int
    payment_status: str
    last_followup_date: str
    days_overdue: int

    def to_dict(self) -> dict[str, Any]:
        return self.__dict__.copy()


@dataclass
class RetryRecord:
    attempt: int
    delay_seconds: float
    outcome: str
    exception: str = ""
    timestamp: str = field(
        default_factory=lambda: datetime.now(tz=timezone.utc).isoformat()
    )
