from __future__ import annotations

import io
import smtplib
import socket
import time 
from contextlib import contextmanager
from typing import Any, Generator
from unittest.mock import MagicMock, patch

from ai_harness.models import FailureMode


class FailureInjector:
    """
    Injects controlled failure modes into subsystems under test.

    All injectors return context managers that patch the relevant target
    for the duration of the `with` block, then cleanly restore state.
    """

    @staticmethod
    @contextmanager
    def smtp_bad_password() -> Generator[None, None, None]:
        def _raise(*args: Any, **kwargs: Any) -> None:
            raise smtplib.SMTPAuthenticationError(535, b"Authentication failed")

        with patch("smtplib.SMTP") as mock_smtp:
            instance = MagicMock()
            instance.__enter__ = lambda s: s
            instance.__exit__ = MagicMock(return_value=False)
            instance.login.side_effect = _raise
            mock_smtp.return_value = instance
            yield

    @staticmethod
    @contextmanager
    def smtp_timeout() -> Generator[None, None, None]:
        def _raise(*args: Any, **kwargs: Any) -> None:
            raise socket.timeout("SMTP connection timed out")

        with patch("smtplib.SMTP") as mock_smtp:
            mock_smtp.side_effect = _raise
            yield

    @staticmethod
    @contextmanager
    def smtp_rejection() -> Generator[None, None, None]:
        def _raise(*args: Any, **kwargs: Any) -> None:
            raise smtplib.SMTPRecipientsRefused(
                {"recipient@example.com": (550, b"User unknown")}
            )

        with patch("smtplib.SMTP") as mock_smtp:
            instance = MagicMock()
            instance.__enter__ = lambda s: s
            instance.__exit__ = MagicMock(return_value=False)
            instance.sendmail.side_effect = _raise
            mock_smtp.return_value = instance
            yield

    @staticmethod
    @contextmanager
    def groq_timeout() -> Generator[None, None, None]:
        import httpx

        def _raise(*args: Any, **kwargs: Any) -> None:
            raise httpx.ReadTimeout("Groq API read timeout")

        with patch("langchain_groq.ChatGroq.invoke", side_effect=_raise):
            yield

    @staticmethod
    @contextmanager
    def groq_rate_limit() -> Generator[None, None, None]:
        from groq import RateLimitError

        def _raise(*args: Any, **kwargs: Any) -> None:
            raise RateLimitError(
                message="Rate limit exceeded",
                response=MagicMock(status_code=429),
                body={"error": {"message": "Rate limit exceeded"}},
            )

        with patch("langchain_groq.ChatGroq.invoke", side_effect=_raise):
            yield

    @staticmethod
    @contextmanager
    def malformed_llm_response() -> Generator[None, None, None]:
        mock_response = MagicMock()
        mock_response.content = "This is some garbage output with no subject or body."

        with patch("langchain_groq.ChatGroq.invoke", return_value=mock_response):
            yield

    @staticmethod
    @contextmanager
    def hallucinated_payment_link() -> Generator[None, None, None]:
        mock_response = MagicMock()
        mock_response.content = (
            "Subject: Payment Required\n\n"
            "Body:\nDear Client,\n\n"
            "Please pay using this secure link: https://evil-phishing-site.xyz/pay/steal-creds\n\n"
            "Regards, Finance"
        )

        with patch("langchain_groq.ChatGroq.invoke", return_value=mock_response):
            yield

    @staticmethod
    @contextmanager
    def network_disconnect() -> Generator[None, None, None]:
        def _raise(*args: Any, **kwargs: Any) -> None:
            raise ConnectionResetError("Network connection forcibly closed")

        with patch("smtplib.SMTP", side_effect=_raise):
            with patch("langchain_groq.ChatGroq.invoke", side_effect=_raise):
                yield

    @staticmethod
    def corrupt_invoice_row(row: dict[str, Any]) -> dict[str, Any]:
        corrupted = row.copy()
        corrupted["invoice_amount"] = "NOT_A_NUMBER"
        corrupted["due_date"] = "32-13-9999"
        corrupted["contact_email"] = "not-an-email"
        return corrupted

    @staticmethod
    @contextmanager
    def partial_csv_write(csv_path: str) -> Generator[None, None, None]:
        original_open = open

        def _flaky_open(path: str, *args: Any, **kwargs: Any):
            if str(path) == str(csv_path) and "w" in str(args):
                raise IOError("Simulated partial write — disk full")
            return original_open(path, *args, **kwargs)

        with patch("builtins.open", side_effect=_flaky_open):
            yield

    @staticmethod
    @contextmanager
    def scheduler_interrupt() -> Generator[None, None, None]:
        def _raise(*args: Any, **kwargs: Any) -> None:
            raise KeyboardInterrupt("Simulated scheduler SIGINT")

        with patch(
            "apscheduler.schedulers.background.BackgroundScheduler.start",
            side_effect=_raise,
        ):
            yield


def get_injector(mode: FailureMode):
    _MAP = {
        FailureMode.SMTP_BAD_PASSWORD: FailureInjector.smtp_bad_password,
        FailureMode.SMTP_TIMEOUT: FailureInjector.smtp_timeout,
        FailureMode.SMTP_REJECTION: FailureInjector.smtp_rejection,
        FailureMode.GROQ_TIMEOUT: FailureInjector.groq_timeout,
        FailureMode.GROQ_RATE_LIMIT: FailureInjector.groq_rate_limit,
        FailureMode.MALFORMED_LLM_RESPONSE: FailureInjector.malformed_llm_response,
        FailureMode.HALLUCINATED_PAYMENT_LINK: FailureInjector.hallucinated_payment_link,
        FailureMode.NETWORK_DISCONNECT: FailureInjector.network_disconnect,
        FailureMode.SCHEDULER_INTERRUPT: FailureInjector.scheduler_interrupt,
    }
    return _MAP.get(mode)
