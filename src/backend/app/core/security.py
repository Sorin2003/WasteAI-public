from datetime import datetime, timedelta
from typing import Any, Union

from jose import jwt
from passlib.context import CryptContext

from app.core.config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


ALGORITHM = "HS256"


def create_access_token(
    subject: Union[str, Any], 
    expires_delta: timedelta = None
    ) -> str:
    """
    Create a JWT token that expires in [expires_delta] minutes.

    :param subject: The subject of the token. (Usually the user's email)
    :param expires_delta: The timedelta object that determines how long the token will be valid for.
    :return: The encoded JWT token.
    """
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(
            minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
        )
    to_encode = {"exp": expire, "sub": str(subject)}
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verify that the plain password matches the hashed password.

    :param plain_password: The plain password.
    :param hashed_password: The hashed password.
    :return: True if the passwords match, False otherwise.
    """
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    """
    Return the hashed version of the password.

    :param password: The plain password.
    :return: The hashed password.
    """
    return pwd_context.hash(password)