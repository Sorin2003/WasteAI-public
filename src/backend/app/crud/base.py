from typing import Any, Dict, Generic, List, Optional, Type, TypeVar, Union

from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.repository.base_class import Base

ModelType = TypeVar("ModelType", bound=Base)
CreateSchemaType = TypeVar("CreateSchemaType", bound=BaseModel)
UpdateSchemaType = TypeVar("UpdateSchemaType", bound=BaseModel)


class CRUDBase(Generic[ModelType, CreateSchemaType, UpdateSchemaType]):
    def __init__(self, model: Type[ModelType]):
        """
        CRUD object with default methods to Create, Read, Update, Delete (CRUD).

        Parameters:
        :param model: A SQLAlchemy model class
        :param schema: A Pydantic model (schema) class
        
        Methods:
        :get(db, id): Get a record by ID.
        :get_multi(db, skip=0, limit=100): Get a list of records, with pagination.
        :create(db, obj_in): Create a new record.
        :update(db, db_obj, obj_in): Update a record.
        :remove(db, id): Remove a record.
        
        """
        self.model = model

    def get(self, db: Session, id: Any) -> Optional[ModelType]:
        """
        Get a record by ID.

        Parameters:
        :param db: The database session.
        :param id: The record ID.
        :return: The record.
        
        """
        return db.query(self.model).filter(self.model.id == id).first()

    def get_multi(
        self, db: Session, *, skip: int = 0, limit: int = 100
    ) -> List[ModelType]:
        """
        Get a list of records, with pagination.

        Parameters:
        :param db: The database session.
        :param skip: The number of records to skip.
        :param limit: The number of records to return.
        :return: The list of records.

        """
        return db.query(self.model).offset(skip).limit(limit).all()

    def create(self, db: Session, *, obj_in: CreateSchemaType) -> ModelType:
        """
        Create a new record.

        Parameters:
        :param db: The database session.
        :param obj_in: The record to create.
        :return: The created record.

        """
        obj_in_data = jsonable_encoder(obj_in)
        db_obj = self.model(**obj_in_data)  # type: ignore
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update(
        self,
        db: Session,
        *,
        db_obj: ModelType,
        obj_in: Union[UpdateSchemaType, Dict[str, Any]]
    ) -> ModelType:
        """
        Update a record.

        Parameters:
        :param db: The database session.
        :param db_obj: The record to update.
        :param obj_in: The record data to update.
        :return: The updated record.

        """
        obj_data = jsonable_encoder(db_obj)
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.dict(exclude_unset=True)
        for field in obj_data:
            if field in update_data:
                setattr(db_obj, field, update_data[field])
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def remove(self, db: Session, *, id: int) -> ModelType:
        """
        Remove a record.

        Parameters:
        :param db: The database session.
        :param id: The record ID.
        :return: The removed record.

        """
        obj = db.query(self.model).get(id)
        db.delete(obj)
        db.commit()
        return obj
