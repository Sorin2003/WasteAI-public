from sqlalchemy import Column, ForeignKey, Integer, String, Text, Date
from sqlalchemy.orm import relationship
from sqlalchemy.sql.expression import null
from app.models.items_products import items_products
from sqlalchemy.ext.hybrid import hybrid_property

# Import the base model
from app.repository.base_class import Base

class Item(Base):
    """
    Item model

    # item_id - PK of the item
    # owner_id - FK of the user that owns the item
    # date_of_expiry - The date of expiry of the item
    # notes - Any notes about the item

    """

    __tablename__ = "items"

    item_id = Column(Integer, primary_key=True, index=True)
    owner_id = Column(Integer, ForeignKey("users.user_id"))
    date_of_expiry = Column(Date, nullable=False)
    notes = Column(Text, nullable=True)

    # Relationships
    # The relationship between the item and the user that owns it
    owner = relationship("User", back_populates="item")

    # The relationship between the item and the products it uses
    product = relationship('Product', secondary=items_products, back_populates="item")

    @hybrid_property
    def id(self):
        return self.item_id

