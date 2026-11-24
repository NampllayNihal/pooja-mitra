
from pydantic import BaseModel, Field


class MSG91TokenVerifyRequest(BaseModel):
    access_token: str = Field(min_length=1, max_length=5000)


class MSG91TokenVerifyResponse(BaseModel):
    success: bool
    message: str
    verified: bool
