from pydantic import BaseModel


class UserBase(BaseModel):
    phone_number: str
    email: str | None = None
    role: str = "CUSTOMER"


class UserResponse(UserBase):
    id: int
    is_phone_verified: bool
    is_active: bool

    model_config = {
        "from_attributes": True
    }