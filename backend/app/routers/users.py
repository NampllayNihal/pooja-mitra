from fastapi import APIRouter

router = APIRouter(
    prefix="/api/users",
    tags=["Users"],
)


@router.get("/test")
def test_users():
    return {
        "success": True,
        "message": "Users router is working",
    }