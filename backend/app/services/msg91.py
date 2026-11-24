
import logging

import httpx

from app.core.config import settings


logger = logging.getLogger(__name__)

MSG91_VERIFY_ACCESS_TOKEN_URL = (
    "https://control.msg91.com/api/v5/widget/verifyAccessToken"
)


class MSG91VerificationError(Exception):
    """Raised when MSG91 cannot verify an access token."""


async def verify_access_token(access_token: str) -> dict:
    """Verify an MSG91 OTP Widget access token without logging secrets."""

    if not settings.MSG91_AUTH_KEY:
        raise RuntimeError("MSG91_AUTH_KEY is not configured.")

    if not access_token or not access_token.strip():
        raise MSG91VerificationError("Missing MSG91 access token.")

    payload = {
        "authkey": settings.MSG91_AUTH_KEY,
        "access-token": access_token.strip(),
    }

    try:
        async with httpx.AsyncClient(timeout=15.0) as client:
            response = await client.post(
                MSG91_VERIFY_ACCESS_TOKEN_URL,
                json=payload,
                headers={
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
            )

        response.raise_for_status()

        try:
            result = response.json()
        except ValueError as exc:
            raise MSG91VerificationError(
                "MSG91 returned an invalid JSON response."
            ) from exc

    except httpx.TimeoutException as exc:
        raise MSG91VerificationError(
            "MSG91 verification timed out. Please try again."
        ) from exc

    except httpx.HTTPStatusError as exc:
        raise MSG91VerificationError(
            f"MSG91 verification failed with HTTP "
            f"{exc.response.status_code}."
        ) from exc

    except httpx.RequestError as exc:
        raise MSG91VerificationError(
            "Unable to connect to MSG91."
        ) from exc

    if not isinstance(result, dict):
        raise MSG91VerificationError(
            "MSG91 returned an unexpected response format."
        )

    # Log only field names and value types, never actual response values.
    response_structure = {
        str(key): type(value).__name__
        for key, value in result.items()
    }
    logger.info(
        "MSG91 verification response structure: %s",
        response_structure,
    )

    # Reject explicit error indicators without assuming undocumented
    # success fields or error-code meanings.
    if (
        str(result.get("type", "")).lower() == "error"
        or str(result.get("status", "")).lower() == "error"
    ):
        raise MSG91VerificationError(
            "MSG91 rejected the access token."
        )

    return result
