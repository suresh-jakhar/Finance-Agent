"""
src/idempotency.py

Idempotency guard: prevents duplicate emails when the scheduler fires
twice within the same run window (e.g. on process restart or misfire).

Scans persisted audit-log report files (run_report_*.json) for a recent
successful send matching the given invoice_id.
"""

import json
import logging
from datetime import datetime, timedelta, timezone
from pathlib import Path

logger = logging.getLogger("IDEMPOTENCY")


def is_recently_sent(
    invoice_id: str,
    audit_log_path: str,
    window_hours: int = 20,
) -> bool:
    """
    Check whether *invoice_id* was successfully emailed within the
    last *window_hours* hours by scanning all ``run_report_*.json``
    files found under *audit_log_path*.

    A "successful send" is defined as an audit-log entry with:
        action == "email_sent"  AND  result in ("sent", "dry_run")

    Args:
        invoice_id:     Invoice number to look up, e.g. ``"INV-1033"``.
        audit_log_path: Directory containing ``run_report_*.json`` files.
        window_hours:   How far back (in hours) to look.  Default 20 h.

    Returns:
        ``True`` if a matching successful send is found within the window,
        ``False`` otherwise.
    """
    cutoff = datetime.now(tz=timezone.utc) - timedelta(hours=window_hours)
    report_dir = Path(audit_log_path)

    if not report_dir.is_dir():
        return False

    for report_file in sorted(report_dir.glob("run_report_*.json"), reverse=True):
        try:
            data = json.loads(report_file.read_text(encoding="utf-8"))
        except (json.JSONDecodeError, OSError):
            logger.warning("Skipping unreadable report: %s", report_file)
            continue

        log_entries = data.get("log", [])
        for entry in log_entries:
            if (
                entry.get("invoice_no") == invoice_id
                and entry.get("action") == "email_sent"
                and entry.get("result") in ("sent", "dry_run")
            ):
                try:
                    entry_time = datetime.fromisoformat(entry["timestamp"])
                except (KeyError, ValueError):
                    continue

                if entry_time >= cutoff:
                    return True

        # Optimisation: if the entire report predates the cutoff window
        # we can stop scanning older files.
        # Use the first entry's timestamp as a proxy for the report time.
        if log_entries:
            try:
                first_ts = datetime.fromisoformat(log_entries[0]["timestamp"])
                if first_ts < cutoff:
                    break
            except (KeyError, ValueError):
                pass

    return False


def get_last_send_time(
    invoice_id: str,
    audit_log_path: str,
    window_hours: int = 20,
) -> str | None:
    """
    Return the ISO-formatted timestamp of the most recent successful send
    for *invoice_id* within *window_hours*, or ``None`` if none exists.

    This is a companion to :func:`is_recently_sent` used for logging the
    ``last_send_time`` when an invoice is skipped.
    """
    cutoff = datetime.now(tz=timezone.utc) - timedelta(hours=window_hours)
    report_dir = Path(audit_log_path)

    if not report_dir.is_dir():
        return None

    for report_file in sorted(report_dir.glob("run_report_*.json"), reverse=True):
        try:
            data = json.loads(report_file.read_text(encoding="utf-8"))
        except (json.JSONDecodeError, OSError):
            continue

        for entry in data.get("log", []):
            if (
                entry.get("invoice_no") == invoice_id
                and entry.get("action") == "email_sent"
                and entry.get("result") in ("sent", "dry_run")
            ):
                try:
                    entry_time = datetime.fromisoformat(entry["timestamp"])
                except (KeyError, ValueError):
                    continue

                if entry_time >= cutoff:
                    return entry["timestamp"]

    return None
