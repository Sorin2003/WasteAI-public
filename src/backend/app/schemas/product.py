from typing import Any, Dict, Optional, Union
from pydantic import BaseModel

class ProductBase(BaseModel):
    EAN: Optional[str] = None
    name: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None

class ProductCreate(ProductBase):
    EAN: str
    name: str
    description: str
    category: str

class ProductUpdate(ProductBase):
    pass

class ProductInDBBase(ProductBase):
    product_id: Optional[int] = None

    class Config:
        orm_mode = True

class ProductInDB(ProductInDBBase):
    pass

class Product(ProductInDBBase):
    pass


