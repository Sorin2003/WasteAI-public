from typing import Any, Dict, Optional, Union

from sqlalchemy.orm import Session

from app.core.security import get_password_hash, verify_password
from app.crud.base import CRUDBase
from app.models.user import User
from app.schemas.user import UserCreate, UserUpdate


class CRUDUser(CRUDBase[User, UserCreate, UserUpdate]):
    """
    CRUD for User model.
    """

    def get_by_email(self, db: Session, *, email: str) -> Optional[User]:
        """
        Get a user by email.

        Parameters:
        :param db: The database session.
        :param email: The user email.
        :return: The user.

        """
        return db.query(User).filter(User.email == email).first()

    def create(self, db: Session, *, obj_in: UserCreate) -> User:
        db_obj = User(
            username=obj_in.username,
            email=obj_in.email,
            hashed_password=get_password_hash(obj_in.password),
            role=obj_in.role,
            is_active=True
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj
    
    def get_by_username(self, db: Session, *, username: str) -> Optional[User]:
        """
        Get a user by username.

        Parameters:
        :param db: The database session.
        :param username: The user username.
        :return: The user.

        """
        return db.query(User).filter(User.username == username).first()

    def update(
        self, db: Session, *, db_obj: User, obj_in: Union[UserUpdate, Dict[str, Any]]
    ) -> User:
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.dict(exclude_unset=True)
        if update_data["password"]:
            hashed_password = get_password_hash(update_data["password"])
            del update_data["password"]
            update_data["hashed_password"] = hashed_password
        return super().update(db, db_obj=db_obj, obj_in=update_data)
        
    def authenticate(self, db: Session, *, login_parameter: str, password: str) -> Optional[User]:
        user_email = self.get_by_email(db, email=login_parameter)
        user_username = self.get_by_username(db, username=login_parameter)
        if not user_email and not user_username:
            return None
        user = user_email if user_email else user_username
        if not verify_password(password, user.hashed_password):
            return None
        return user

    def is_superuser(self, user: User) -> bool:
        return user.role == "admin"


user = CRUDUser(User)
