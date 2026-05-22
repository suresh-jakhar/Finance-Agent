from __future__ import annotations

import json
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from ai_harness.models import HarnessReport, TestResult, TestStatus
from ai_harness.observability import ObservabilityLayer
from ai_harness.scenario_engine import ScenarioEngine


class HarnessRunner:
    """
    Executes test scenarios registered in the ScenarioEngine,
    collects results through the ObservabilityLayer, and writes
    a structured JSON report to disk.
    """

    def __init__(self, output_dir: str = "outputs/harness") -> None:
        self.output_dir = Path(output_dir)
        self.obs = ObservabilityLayer()
        self.engine = ScenarioEngine(self.obs)

    def run(
        self,
        scenarios: list[str] | None = None,
        stop_on_first_failure: bool = False,
    ) -> HarnessReport:
        """
        Args:
            scenarios:             Subset of scenario keys to run. If None, runs all.
            stop_on_first_failure: Abort the run after the first FAIL or ERROR result.

        Returns:
            Fully populated HarnessReport.
        """
        report = HarnessReport()
        all_scenarios = dict(self.engine.all_scenarios())

        keys_to_run = (
            [k for k in all_scenarios if k in scenarios]
            if scenarios
            else list(all_scenarios.keys())
        )

        for key in keys_to_run:
            fn = all_scenarios[key]
            result: TestResult = fn()
            report.results.append(result)

            if stop_on_first_failure and result.status in (
                TestStatus.FAIL,
                TestStatus.ERROR,
            ):
                break

        report.finalise()
        self.obs.enrich_report(report)
        self._write_report(report)
        self.obs.print_terminal_summary(report)
        return report

    def _write_report(self, report: HarnessReport) -> None:
        self.output_dir.mkdir(parents=True, exist_ok=True)
        ts = datetime.now(tz=timezone.utc).strftime("%Y%m%dT%H%M%SZ")
        path = self.output_dir / f"harness_report_{ts}.json"
        path.write_text(
            json.dumps(report.to_dict(), indent=2), encoding="utf-8"
        )
        print(f"[HARNESS] Report written -> {path}")

    def run_domain(self, domain_key: str) -> HarnessReport:
        domain_prefix_map = {
            "smtp": ["smtp_dry_run", "smtp_bad_password", "smtp_timeout"],
            "schema": ["schema_valid", "schema_missing_fields"],
            "legal": ["legal_no_auto_send", "legal_rejection_detected"],
            "hallucination": ["halluc_clean_pass", "halluc_link_caught"],
            "prompt": ["prompt_registry", "prompt_no_banned", "prompt_banned_caught"],
            "dataset": ["dataset_schema", "dataset_no_dupes", "dataset_corrupt_caught"],
            "retry": ["retry_third_attempt", "retry_backoff", "retry_exhausted"],
            "audit": ["audit_fields", "audit_matches", "audit_missing"],
            "recovery": ["malformed_blocked", "dedup_guard"],
        }
        keys = domain_prefix_map.get(domain_key, [])
        return self.run(scenarios=keys)
