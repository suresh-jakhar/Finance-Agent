from __future__ import annotations

import json
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from ai_harness.models import HarnessReport, TestResult, TestStatus, ValidationDomain
from ai_harness.runner import HarnessRunner


class ReliabilityManager:
    """
    Centralized reliability manager — the single entry point for all harness
    operations. Maintains history, computes health scores, and exposes
    targeted re-run capability for failed domains.
    """

    _DOMAIN_WEIGHTS: dict[str, float] = {
        "smtp_reliability": 1.5,
        "legal_escalation_safety": 2.0,
        "hallucination_prevention": 2.0,
        "audit_consistency": 1.5,
        "output_schema_validation": 1.2,
        "prompt_correctness": 1.2,
        "dataset_integrity": 1.0,
        "retry_behavior": 1.0,
        "failure_recovery_behavior": 1.3,
        "groq_api_reliability": 1.2,
        "observability_and_metrics": 0.8,
    }

    def __init__(self, output_dir: str = "outputs/harness") -> None:
        self.output_dir = Path(output_dir)
        self._history: list[HarnessReport] = []

    def run_full_suite(self, stop_on_first_failure: bool = False) -> HarnessReport:
        runner = HarnessRunner(output_dir=str(self.output_dir))
        report = runner.run(stop_on_first_failure=stop_on_first_failure)
        self._history.append(report)
        return report

    def run_domain(self, domain_key: str) -> HarnessReport:
        runner = HarnessRunner(output_dir=str(self.output_dir))
        report = runner.run_domain(domain_key)
        self._history.append(report)
        return report

    def run_failed_from_last(self) -> HarnessReport | None:
        if not self._history:
            print("[ReliabilityManager] No previous run found.")
            return None

        last = self._history[-1]
        failed_keys = [
            r.test_name
            for r in last.results
            if r.status in (TestStatus.FAIL, TestStatus.ERROR)
        ]
        if not failed_keys:
            print("[ReliabilityManager] Last run had no failures.")
            return None

        print(f"[ReliabilityManager] Re-running {len(failed_keys)} failed scenarios.")
        runner = HarnessRunner(output_dir=str(self.output_dir))
        report = runner.run(scenarios=failed_keys)
        self._history.append(report)
        return report

    def health_score(self, report: HarnessReport) -> float:
        by_domain = report.metrics.get("by_domain", {})
        total_weight = 0.0
        weighted_pass = 0.0

        for domain, stats in by_domain.items():
            weight = self._DOMAIN_WEIGHTS.get(domain, 1.0)
            total = stats.get("total", 0)
            passed = stats.get("passed", 0)
            if total > 0:
                weighted_pass += weight * (passed / total)
                total_weight += weight

        if total_weight == 0:
            return 0.0
        return round((weighted_pass / total_weight) * 100, 2)

    def print_health_summary(self, report: HarnessReport) -> None:
        score = self.health_score(report)
        tier = (
            "PRODUCTION-READY"
            if score >= 95
            else "NEEDS ATTENTION"
            if score >= 75
            else "CRITICAL FAILURES"
        )
        print(f"\n  [ReliabilityManager] Weighted Health Score: {score}%  ->  {tier}")
        print(f"  Run ID: {report.run_id}")
        reports = list(self.output_dir.glob("harness_report_*.json"))
        latest = str(reports[-1]) if reports else "N/A"
        print(f"  Report: {latest}\n")

    def load_report(self, path: str) -> dict[str, Any]:
        return json.loads(Path(path).read_text(encoding="utf-8"))

    def compare_runs(
        self, report_a: HarnessReport, report_b: HarnessReport
    ) -> dict[str, Any]:
        score_a = self.health_score(report_a)
        score_b = self.health_score(report_b)
        regressions = [
            r.test_name
            for r in report_b.results
            if r.status in (TestStatus.FAIL, TestStatus.ERROR)
            and any(
                ra.test_name == r.test_name and ra.status == TestStatus.PASS
                for ra in report_a.results
            )
        ]
        improvements = [
            r.test_name
            for r in report_b.results
            if r.status == TestStatus.PASS
            and any(
                ra.test_name == r.test_name
                and ra.status in (TestStatus.FAIL, TestStatus.ERROR)
                for ra in report_a.results
            )
        ]
        return {
            "run_a": report_a.run_id,
            "run_b": report_b.run_id,
            "score_a": score_a,
            "score_b": score_b,
            "delta": round(score_b - score_a, 2),
            "regressions": regressions,
            "improvements": improvements,
        }
