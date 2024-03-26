from sqlalchemy import Text, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy.sql.expression import null
from sqlalchemy.ext.hybrid import hybrid_property

# Import the base model
from app.repository.base_class import Base

# Import the items_products table
from app.models.items_products import items_products

CATEGORIES = [ 
    "Fruit",
    "Vegetable",
    "Meat",
    "Fish",
    "Dairy",
    "Bakery",
    "Frozen",
    "Canned",
    "Pantry",
    "Snacks",
    "Drinks",
    "Other"
]

class Product(Base):
    """ 
    Product model

    # product_id - PK of the product
    # name - The name of the product
    # description - The description of the product
    # caregory - The category of the product
    # EAN - The EAN of the product (unique)

    """

    __tablename__ = "products"

    product_id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    description = Column(Text, nullable=True)
    category = Column(String, nullable=True)
    EAN = Column(String, unique=True, nullable=False)

    # Relationships
    # The relationship between the product and the items that use it
    item = relationship('Item', secondary=items_products, back_populates="product")

    @hybrid_property
    def id(self):
        return self.product_id


