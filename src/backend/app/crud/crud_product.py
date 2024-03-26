from typing import Any, Dict, Optional, Union

from sqlalchemy.orm import Session

from app.core.security import get_password_hash, verify_password
from app.crud.base import CRUDBase
from app.models.product import Product
from app.schemas.product import ProductCreate, ProductUpdate

class CRUDProduct(CRUDBase[Product, ProductCreate, ProductUpdate]):

    def get_all(self, db: Session) -> Optional[Product]:
        """
        Get all products.
        
        Parameters:
        :param db: The database session.
        :return: The products.
        
        """
        return db.query(Product).all()
    
    def get_by_ean(self, db: Session, *, ean: str) -> Optional[Product]:
        """
        Get a product by ean.
        
        Parameters:
        :param db: The database session.
        :param ean: The product ean.
        :return: The product.
        
        """
        return db.query(Product).filter(Product.EAN == ean).first()

product = CRUDProduct(Product)