"""
run_harness.py

Entry point for the AI Harness and Reliability Framework.

Usage:
    python run_harness.py                  # Full suite
    python run_harness.py --domain smtp    # Domain-targeted run
    python run_harness.py --domain legal
    python run_harness.py --domain hallucination
    python run_harness.py --domain retry
    python run_harness.py --domain audit
    python run_harness.py --domain dataset
    python run_harness.py --domain prompt
    python run_harness.py --domain schema
    python run_harness.py --domain recovery
    python run_harness.py --fail-fast      # Stop on first failure
"""

import argparse
import sys

from harness.reliability_manager import ReliabilityManager


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Finance Agent — AI Harness & Reliability Framework"
    )
    parser.add_argument(
        "--domain",
        type=str,
        default=None,
        choices=[
            "smtp", "schema", "legal", "hallucination",
            "prompt", "dataset", "retry", "audit", "recovery",
        ],
        help="Run only scenarios for a specific validation domain.",
    )
    parser.add_argument(
        "--fail-fast",
        action="store_true",
        default=False,
        help="Stop execution after the first FAIL or ERROR result.",
    )
    parser.add_argument(
        "--output-dir",
        type=str,
        default="outputs/harness",
        help="Directory to write harness reports (default: outputs/harness).",
    )

    args = parser.parse_args()

    manager = ReliabilityManager(output_dir=args.output_dir)

    if args.domain:
        print(f"[HARNESS] Running domain: {args.domain.upper()}")
        report = manager.run_domain(args.domain)
    else:
        print("[HARNESS] Running full reliability suite...")
        report = manager.run_full_suite(stop_on_first_failure=args.fail_fast)

    manager.print_health_summary(report)

    failed = report.failed + report.errors
    sys.exit(1 if failed > 0 else 0)


if __name__ == "__main__":
    main()
