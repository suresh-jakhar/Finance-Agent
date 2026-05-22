from __future__ import annotations

import time
from collections import defaultdict
from datetime import datetime, timezone
from typing import Any

from ai_harness.models import HarnessReport, TestResult, TestStatus, ValidationDomain


class MetricsCollector:
    """
    Aggregates and computes harness-run metrics from collected TestResult objects.
    """

    def __init__(self) -> None:
        self._timings: dict[str, list[float]] = defaultdict(list)
        self._domain_counts: dict[str, dict[str, int]] = defaultdict(
            lambda: {"PASS": 0, "FAIL": 0, "SKIP": 0, "ERROR": 0}
        )
        self._failure_mode_counts: dict[str, int] = defaultdict(int)
        self._run_start: float = time.monotonic()

    def record(self, result: TestResult) -> None:
        domain = result.domain.value
        status = result.status.value
        self._domain_counts[domain][status] += 1
        self._timings[domain].append(result.duration_ms)
        self._failure_mode_counts[result.failure_mode.value] += 1

    def compute(self) -> dict[str, Any]:
        total_elapsed = (time.monotonic() - self._run_start) * 1000

        domain_summary: dict[str, Any] = {}
        for domain, counts in self._domain_counts.items():
            total = sum(counts.values())
            timings = self._timings.get(domain, [0])
            domain_summary[domain] = {
                "total": total,
                "passed": counts["PASS"],
                "failed": counts["FAIL"],
                "skipped": counts["SKIP"],
                "errors": counts["ERROR"],
                "pass_rate": round(counts["PASS"] / total * 100, 1) if total else 0,
                "avg_duration_ms": round(sum(timings) / len(timings), 2) if timings else 0,
                "max_duration_ms": round(max(timings), 2) if timings else 0,
            }

        return {
            "total_elapsed_ms": round(total_elapsed, 2),
            "generated_at": datetime.now(tz=timezone.utc).isoformat(),
            "by_domain": domain_summary,
            "by_failure_mode": dict(self._failure_mode_counts),
        }


class StateVerifier:
    """
    Tracks processed invoice state within a harness run to detect
    double-processing, missing records, and state desync.
    """

    def __init__(self) -> None:
        self._seen: dict[str, list[str]] = defaultdict(list)

    def record_processed(self, invoice_no: str, action: str) -> None:
        self._seen[invoice_no].append(action)

    def verify_exactly_once(self) -> list[str]:
        return [
            inv
            for inv, actions in self._seen.items()
            if actions.count("process_invoice") > 1
        ]

    def verify_all_recorded(self, expected: list[str]) -> list[str]:
        return [inv for inv in expected if inv not in self._seen]

    def reset(self) -> None:
        self._seen.clear()


class ObservabilityLayer:
    """
    Lightweight, structured observability layer that tracks per-test
    durations, domain-level health, and produces a terminal summary.
    """

    def __init__(self) -> None:
        self.metrics = MetricsCollector()
        self._start_times: dict[str, float] = {}

    def start_test(self, test_name: str) -> None:
        self._start_times[test_name] = time.monotonic()

    def finish_test(self, result: TestResult) -> TestResult:
        start = self._start_times.pop(result.test_name, time.monotonic())
        result.duration_ms = (time.monotonic() - start) * 1000
        self.metrics.record(result)
        return result

    def enrich_report(self, report: HarnessReport) -> HarnessReport:
        report.metrics = self.metrics.compute()
        return report

    def print_terminal_summary(self, report: HarnessReport) -> None:
        sep = "-" * 68
        print(f"\n{'=' * 68}")
        print(f"  HARNESS RUN  {report.run_id}")
        print(f"{'=' * 68}")
        s = report.to_dict()["summary"]
        print(
            f"  Total: {s['total']}  |  "
            f"[PASS]: {s['passed']}  |  "
            f"[FAIL]: {s['failed']}  |  "
            f"[SKIP]: {s['skipped']}  |  "
            f"[ERR]: {s['errors']}  |  "
            f"Pass Rate: {s['pass_rate']}%"
        )
        print(sep)

        by_domain = report.metrics.get("by_domain", {})
        print("  Results by Domain:")
        for domain, stats in by_domain.items():
            indicator = " OK " if stats["failed"] == 0 and stats["errors"] == 0 else "FAIL"
            print(
                f"    [{indicator}] {domain:<35}  "
                f"pass={stats['passed']}  fail={stats['failed']}  "
                f"avg={stats['avg_duration_ms']}ms"
            )

        print(sep)
        failures = [r for r in report.results if r.status in (TestStatus.FAIL, TestStatus.ERROR)]
        if failures:
            print(f"  FAILURES ({len(failures)}):")
            for f in failures:
                print(f"    [FAIL] [{f.domain.value}] {f.test_name}")
                print(f"      -> {f.message}")
        else:
            print("  All tests passed - system is production-ready.")

        elapsed = report.metrics.get("total_elapsed_ms", 0)
        print(f"\n  Total elapsed: {elapsed:.1f}ms")
        print(f"{'=' * 68}\n")
