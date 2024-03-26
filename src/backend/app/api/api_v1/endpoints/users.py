from typing import Any, List

from fastapi import APIRouter, Body, Depends, HTTPException
from fastapi.encoders import jsonable_encoder
from pydantic.networks import EmailStr
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.api import deps
from app.core.config import settings
#from app.utils import send_new_account_email

router = APIRouter()

@router.get("/", response_model=List[schemas.User])
def read_users(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Retrieve users.
    """
    users = crud.user.get_multi(db, skip=skip, limit=limit)
    return users

@router.post('/', response_model=schemas.User)
def create_user(
    *,
    db: Session = Depends(deps.get_db),
    user_in: schemas.UserCreate,
) -> Any:
    """
    Create new user.
    """
    email = crud.user.get_by_email(db, email=user_in.email)
    user = crud.user.get_by_username(db, username=user_in.username)
    if user or email:
        raise HTTPException(
            status_code=400,
            detail="The user with this username or email already exists in the system."
        )
    # Check if the logged in user is a superuser and only superusers can create other superusers
    if user_in.role == "admin":
        raise HTTPException(
            status_code=400,
            detail="The user doesn't have enough privileges"
        )
    
    if user_in.role not in ["admin", "user"]:
        raise HTTPException(
            status_code=400,
            detail="The user role can only be admin or user"
        )

    user = crud.user.create(db, obj_in=user_in)
    #if settings.EMAILS_ENABLED and user_in.email:
    #    send_new_account_email(
    #        email_to=user_in.email, username=user_in.username, password=user_in.password
    #    )
    print(user)
    return user
