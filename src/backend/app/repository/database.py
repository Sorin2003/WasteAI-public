from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.core.config import settings

"""
    File to connect to the database and create a session to it.
"""


# Database connection
SQLALCHEMY_DATABASE_URL = settings.SQLALCHEMY_DATABASE_URI

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
