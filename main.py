from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
import models
import schemas
import crud
from database import SessionLocal, engine, Base
# from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI()

# Dependency to get DB session


# origins = [
#     "*"
# ]

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,  # Specific origins
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Create


@app.post("/products/", response_model=schemas.ProductOut)
def create_product(product: schemas.ProductCreate, db: Session = Depends(get_db)):
    product_list = crud.create_product(db=db, product=product)
    # print(product_list)
    return product_list

# Read all


@app.get("/products/", response_model=list[schemas.ProductOut])
def read_products(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_products(db=db, skip=skip, limit=limit)

# Read one


@app.get("/categories/{categories}", response_model=list[schemas.ProductOut])
def read_products(categories: str, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_top_10_products_category(db=db, category=categories)


@app.get("/products/{product_id}", response_model=schemas.ProductOut)
def read_product(product_id: int, db: Session = Depends(get_db)):
    db_product = crud.get_product(db, product_id=product_id)
    if db_product is None:
        raise HTTPException(status_code=404, detail="product not found")
    return db_product

# Update


@app.put("/products/{product_id}", response_model=schemas.ProductOut)
def update_product(product_id: int, product: schemas.ProductUpdate, db: Session = Depends(get_db)):
    db_product = crud.update_product(
        db=db, product_id=product_id, product=product)
    if db_product is None:
        raise HTTPException(status_code=404, detail="product not found")
    return db_product

# Delete


@app.delete("/products/{product_id}", response_model=schemas.ProductOut)
def delete_product(product_id: int, db: Session = Depends(get_db)):
    db_product = crud.delete_product(db=db, product_id=product_id)
    if db_product is None:
        raise HTTPException(status_code=404, detail="product not found")
    return db_product
