from sqlalchemy import Boolean, Column, ForeignKey, Integer, String,  Interval 
from sqlalchemy.orm import relationship
from sqlalchemy.sql.expression import null
from sqlalchemy.ext.hybrid import hybrid_property

# Import the base model
from app.repository.base_class import Base

class User(Base):
    """
    User model

    # user_id - PK of the user
    # username - The username of the user (unique)
    # email - The email of the user (unique)
    # hashed_password - The hashed password of the user
    # is_active - Whether the user is active or not
    # is_superuser - Whether the user is a superuser or not

    """

    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean(), default=True)
    role = Column(String, default=False)

    # Relationships
    # The relationship between the user and the items they own
    item = relationship("Item", back_populates="owner")

    @hybrid_property
    def id(self):
        return self.user_id