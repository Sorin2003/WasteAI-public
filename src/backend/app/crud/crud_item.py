from typing import Any, Dict, Optional, Union

from sqlalchemy.orm import Session
from datetime import date

from app.core.security import get_password_hash, verify_password
from app.crud.base import CRUDBase
from app.models.item import Item
from app.schemas.item import ItemCreate, ItemUpdate


class CRUDItem(CRUDBase[Item, ItemCreate, ItemUpdate]):

    def create(self, db: Session, *, obj_in: ItemCreate, owner_id: int) -> Item:
        date_of_expiry = obj_in.date_of_expiry
        # Parse the date of expiry
        date_of_expiry = date_of_expiry.split('-')
        date_of_expiry = date(int(date_of_expiry[0]), int(date_of_expiry[1]), int(date_of_expiry[2]))
        db_obj = Item(
            date_of_expiry=date_of_expiry,
            notes=obj_in.notes,
            owner_id=owner_id,
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj
    
    def get_all(self, db: Session) -> Optional[Item]:
        """
        Get all items.
        
        Parameters:
        :param db: The database session.
        :return: The items.
        
        """
        return db.query(Item).all()
    
    def get_all_by_user(self, db: Session, *, user_id: int) -> Optional[Item]:
        """
        Get all items by user.
        
        Parameters:
        :param db: The database session.
        :param user_id: The user id.
        :return: The items.
        
        """
        return db.query(Item).filter(Item.owner_id == user_id).all()
    
    def remove(self, db: Session, *, id: int) -> Item:
        """
        Remove an item.
        
        Parameters:
        :param db: The database session.
        :param id: The item id.
        :return: The item.
        
        """
        db_obj = db.query(Item).get(id)
        db.delete(db_obj)
        db.commit()
        return db_obj

item = CRUDItem(Item)
    