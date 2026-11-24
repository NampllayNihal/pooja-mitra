
import logging

from fastapi import APIRouter, HTTPException, status

from app.schemas.auth import MSG91TokenVerifyRequest
from app.services.msg91 import (
    MSG91VerificationError,
    verify_access_token,
)

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/auth", tags=["Authentication"])


@router.post("/msg91/verify-token")
async def verify_msg91_token(payload: MSG91TokenVerifyRequest):
    try:
        result = await verify_access_token(payload.access_token)

    except MSG91VerificationError as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(exc),
        ) from exc

    except RuntimeError as exc:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="MSG91 is not configured correctly.",
        ) from exc

    # Diagnostic only: never create a user or authenticate a session here.
    # The service logs response field names and types, not their values.
    logger.info(
        "MSG91 token verification call completed; response received."
    )

    raise HTTPException(
        status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
        detail=(
            "Provider response received. Account login is disabled "
            "until the MSG91 response format is validated."
        ),
    )
