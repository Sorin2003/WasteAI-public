"""
    This is the main program entry point.
    Documentation on how to contribute to this project can be found in the README.md file. (todo)

"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.api.api_v1.api import api_router

app = FastAPI(
    title=settings.PROJECT_NAME, openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Allow all origins for now (this is a security risk, but we are in development mode)
origins = ["*"] 

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], # Allow all methods
    allow_headers=["*"], # Allow all headers
)


app.include_router(api_router, prefix=settings.API_V1_STR)