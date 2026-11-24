
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    APP_NAME: str = "PoojaMitra API"
    APP_ENV: str = "development"
    DEBUG: bool = True

    DB_USER: str
    DB_PASSWORD: str
    DB_HOST: str
    DB_PORT: int = 5432
    DB_NAME: str = "postgres"

    FRONTEND_URL: str = "http://localhost:5173"
    SECRET_KEY: str

    MSG91_AUTH_KEY: str
    MSG91_WIDGET_ID: str
    MSG91_OTP_EXPIRY_SECONDS: int = 300

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
    )


settings = Settings()
