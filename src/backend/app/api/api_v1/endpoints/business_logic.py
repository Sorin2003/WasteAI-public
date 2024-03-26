from typing import Any, List

from fastapi import APIRouter, Body, Depends, HTTPException
from fastapi.encoders import jsonable_encoder
from pydantic.networks import EmailStr
from sqlalchemy.orm import Session
from sqlalchemy.orm import joinedload

from app import crud, models, schemas
from app.api import deps
from app.core.config import settings
from app.models.items_products import items_products
from datetime import date
import os
import openai
import random
#from app.utils import send_new_account_email

router = APIRouter()

@router.post('/create_product', response_model=schemas.Product)
def create_product(
    *,
    db: Session = Depends(deps.get_db),
    product_in: schemas.ProductCreate,
) -> Any:
    """
    Create new product.
    """
    product = crud.product.create(db, obj_in=product_in)
    return product

@router.get('/get_all_products', response_model=List[schemas.Product])
def get_all_products(
    db: Session = Depends(deps.get_db),
) -> Any:
    """
    Get all products.
    """
    products = crud.product.get_all(db)
    return products

@router.post('/find_product', response_model=schemas.Product)
def find_product(
    *,
    db: Session = Depends(deps.get_db),
    product_ean: str,
) -> Any:
    """
    Find product by id.
    """
    product = crud.product.get_by_ean(db, ean=product_ean)

    # Check if the product exists in the database
    # if it doesn't exist, search for it in the external API (TODO)
    if not product:
        # Search for the product in the external API
        
        # If it exists, add it to the database
        
        # If it doesn't exist, return an error
        raise HTTPException(
            status_code=404,
            detail="The product doesn't exist in the database"
        ) 

    # If it exists, return it
    return product

# Get all the products of the current user
@router.get('/get_items', response_model=List[schemas.ItemWithProduct])
def get_items(
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Get all items.
    """
    items = crud.item.get_all_by_user(db, user_id=current_user.id)
    # Get then names of the products of the items from the products table
    return_items = []
    for item in items:
        # Items and products have a many to many relationship
        # Join the items and products tables
        products = db.query(models.Product) \
                    .join(items_products) \
                    .filter(items_products.c.item_id == item.id) \
                    .first()

        return_items.append({
            "owner_id": item.owner_id,
            "item_id": item.id,
            "date_of_expiry": item.date_of_expiry,
            "notes": item.notes,
            "products": products,
        })
        

    return return_items

@router.post('/add_item', response_model=schemas.Item)
def add_item(
    *,
    db: Session = Depends(deps.get_db),
    item_in: schemas.ItemCreate,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Add new item.
    """

    # Validate the date of expiry
    date_of_expiry = item_in.date_of_expiry
    # Parse the date of expiry
    date_of_expiry = date_of_expiry.split('-')
    try:
        date_of_expiry = date(int(date_of_expiry[0]), int(date_of_expiry[1]), int(date_of_expiry[2]))
        # Check if the date of expiry is in the future
        if date_of_expiry < date.today():
            raise ValueError
    except ValueError:
        raise HTTPException(
            status_code=400,
            detail="Invalid date of expiry"
        )
    # Check if the product exists in the database
    product = crud.product.get_by_ean(db, ean=item_in.product_ean)
    if not product:
        raise HTTPException(
            status_code=404,
            detail="The product doesn't exist in the database"
        )

    # Create the item
    item = crud.item.create(db=db, obj_in=item_in, owner_id=current_user.id)
    
    # Create the relationship between the item and the product
    product_id = crud.product.get_by_ean(db, ean=item_in.product_ean).id

    # Add the item product relationship to the database
    db.execute(items_products.insert().values(item_id=item.id, product_id=product_id))
    db.commit()

    return item

@router.post('/delete_item/{item_id}', response_model=schemas.Item)
def delete_item(
    *,
    db: Session = Depends(deps.get_db),
    item_id: int,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Delete item.
    """
    item = crud.item.get(db, id=item_id)
    if not item:
        raise HTTPException(
            status_code=404,
            detail="The item doesn't exist in the database"
        )
    if item.owner_id != current_user.id or current_user.role != "admin":
        raise HTTPException(
            status_code=400,
            detail="The user doesn't have enough privileges"
        )
    
    item = crud.item.remove(db=db, id=item_id)
    return item

# Enpoint to post requests to the ChatGPT API (can be adapted to use other LLMs)
@router.post('/chat', response_model=schemas.Msg)
def chat(
    *,
    db: Session = Depends(deps.get_db),
    msg_in: schemas.Msg,
    #current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Chat with the ChatGPT API.
    """
    openai.api_key = os.environ.get("OPENAI_API_KEY")

    # Get all the items of the current user from the database
    #items = crud.item.get_all_by_user(db, user_id=current_user.id)
    items = crud.item.get_all_by_user(db, user_id=11)
    # Get then names of the products of the items from the products table
    product_names = []
    for item in items:
        # Items and products have a many to many relationship
        # Join the items and products tables
        products = db.query(models.Product) \
                    .join(items_products) \
                    .filter(items_products.c.item_id == item.id) \
                    .first()
        product_names.append(products.name)
    product_names = " ".join(product_names)
    
    # Create the prompt
    prompt = [
        {
            "role": "system",
            "content": "You are a master chef that is creating custom recipes for people. You are using their ingredients, but only the ones that work together. You don't need to use all of them!"
        }
    ]

    # Add the user's ingredients to the prompt
    msg_in.msg += f" using  some of these ingredients list:'{product_names}' you don't need to use all of them (just use the ones that work together, you are a master chef after all)" 
    prompt.append({
        "role": "user",
        "content": msg_in.msg
    })

    # Create the prompt
    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=prompt,
    )

    # Get the response
    response = completion.choices[0].message["content"]
    return {"msg": response}

    