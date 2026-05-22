from __future__ import annotations

import time
from typing import Any, Callable

from ai_harness.models import RetryRecord


def retry_with_backoff(
    fn: Callable[[], Any],
    max_attempts: int = 3,
    base_delay: float = 1.0,
    factor: float = 2.0,
    jitter: bool = False,
) -> tuple[Any, list[RetryRecord]]:
    """
    Execute `fn` up to `max_attempts` times with exponential backoff.

    Returns:
        (result, list[RetryRecord]) — result is the return value of `fn` on
        success, or the last exception instance on total failure.
    """
    import random

    records: list[RetryRecord] = []
    delay = base_delay

    for attempt in range(1, max_attempts + 1):
        started = time.monotonic()
        try:
            result = fn()
            elapsed = (time.monotonic() - started) * 1000
            records.append(
                RetryRecord(
                    attempt=attempt,
                    delay_seconds=0.0 if attempt == 1 else delay / factor,
                    outcome="success",
                )
            )
            return result, records
        except Exception as exc:
            elapsed = (time.monotonic() - started) * 1000
            actual_delay = delay + (random.uniform(0, 0.5) if jitter else 0)
            records.append(
                RetryRecord(
                    attempt=attempt,
                    delay_seconds=actual_delay,
                    outcome="failure",
                    exception=f"{type(exc).__name__}: {exc}",
                )
            )
            if attempt < max_attempts:
                time.sleep(actual_delay)
                delay *= factor

    last_exc = records[-1].exception if records else "unknown"
    return Exception(f"All {max_attempts} attempts failed. Last: {last_exc}"), records


class RetrySimulator:
    """
    Simulates retry behaviour without sleeping, for unit-level harness tests.
    Records exact attempt counts, outcomes, and delay schedules.
    """

    def __init__(
        self,
        fail_on_attempts: list[int],
        max_attempts: int = 3,
        base_delay: float = 1.0,
        factor: float = 2.0,
    ) -> None:
        self.fail_on_attempts = set(fail_on_attempts)
        self.max_attempts = max_attempts
        self.base_delay = base_delay
        self.factor = factor

    def run(self, fn: Callable[[], Any]) -> tuple[Any, list[RetryRecord]]:
        records: list[RetryRecord] = []
        delay = self.base_delay

        for attempt in range(1, self.max_attempts + 1):
            should_fail = attempt in self.fail_on_attempts
            actual_delay = 0.0 if attempt == 1 else delay / self.factor

            if should_fail:
                exc_msg = f"SimulatedFailure on attempt {attempt}"
                records.append(
                    RetryRecord(
                        attempt=attempt,
                        delay_seconds=actual_delay,
                        outcome="failure",
                        exception=exc_msg,
                    )
                )
                delay *= self.factor
            else:
                result = fn()
                records.append(
                    RetryRecord(
                        attempt=attempt,
                        delay_seconds=actual_delay,
                        outcome="success",
                    )
                )
                return result, records

        return (
            Exception(f"All {self.max_attempts} simulated attempts failed"),
            records,
        )

    def get_delay_schedule(self) -> list[float]:
        delays: list[float] = []
        delay = self.base_delay
        for i in range(1, self.max_attempts):
            delays.append(delay)
            delay *= self.factor
        return delays
