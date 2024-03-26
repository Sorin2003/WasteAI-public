from sqlalchemy import ForeignKey, Column, Table, Integer
from sqlalchemy.orm import relationship
from sqlalchemy.sql.expression import null

# Import the base model
from app.repository.base_class import Base

items_products = Table(
    "items_products",
    Base.metadata,
    Column("item_id", Integer, ForeignKey("items.item_id")),
    Column("product_id", Integer, ForeignKey("products.product_id")),
)

