from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.exc import SQLAlchemyError
from app.routers.auth import router as auth_router
from app.core.config import settings
from app.db.database import test_database_connection


app = FastAPI(
    title=settings.APP_NAME,
    description="Backend API for PoojaMitra",
    version="1.0.0",
)
app.include_router(auth_router)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        settings.FRONTEND_URL,
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "success": True,
        "message": "PoojaMitra API is running",
        "environment": settings.APP_ENV,
    }


@app.get("/api/health")
def health_check():
    return {
        "success": True,
        "status": "healthy",
        "service": "PoojaMitra API",
    }



@app.get("/api/health/database")
def database_health_check():
    try:
        test_database_connection()

        return {
            "success": True,
            "status": "connected",
            "database": "PostgreSQL",
        }

    except SQLAlchemyError as error:
        return {
            "success": False,
            "status": "disconnected",
            "database": "PostgreSQL",
            "error": str(error),
        }