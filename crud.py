from sqlalchemy.orm import Session
import models
import schemas


def get_product(db: Session, product_id: int):
    return db.query(models.Product).filter(models.Product.uniq_id == product_id).first()


def get_products(db: Session, skip: int = 0, limit: int = 10):
    # print("Fetching products from DB")
    db_products = db.query(models.Product).offset(skip).limit(limit).all()
    # print(db_products)
    return db_products


def get_top_10_products_category(db: Session, category: str):
    search_str = "%"+category+"%"
    return db.query(models.Product).filter(models.Product.category.ilike(search_str)).limit(10).all()


def create_product(db: Session, product: schemas.ProductCreate):
    db_product = models.Product(**product.dict())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product


def update_product(db: Session, product_id: int, product: schemas.ProductUpdate):
    db_product = get_product(db, product_id)
    if db_product:
        for key, value in product.dict().products():
            setattr(db_product, key, value)
        db.commit()
        db.refresh(db_product)
    return db_product


def delete_product(db: Session, product_id: int):
    db_product = get_product(db, product_id)
    if db_product:
        db.delete(db_product)
        db.commit()
    return db_product
