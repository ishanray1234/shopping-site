from pydantic import BaseModel, HttpUrl
from typing import Optional
from decimal import Decimal


class ProductBase(BaseModel):
    uniq_id: str
    product_name: str
    brand_name: Optional[str] = None
    asin: Optional[str] = None
    category: Optional[str] = None
    upc_ean_code: Optional[str] = None
    list_price: Optional[Decimal] = None
    selling_price: Optional[Decimal] = None
    quantity: Optional[int] = None
    model_number: Optional[str] = None
    about_product: Optional[str] = None
    product_specification: Optional[str] = None
    technical_details: Optional[str] = None
    shipping_weight: Optional[str] = None
    product_dimensions: Optional[str] = None
    image: Optional[HttpUrl] = None
    variants: Optional[str] = None
    sku: Optional[str] = None
    product_url: Optional[HttpUrl] = None
    stock: Optional[int] = None
    product_details: Optional[str] = None
    dimensions: Optional[str] = None
    color: Optional[str] = None
    ingredients: Optional[str] = None
    direction_to_use: Optional[str] = None
    is_amazon_seller: Optional[bool] = None
    size_quantity_variant: Optional[str] = None
    product_description: Optional[str] = None


class ProductCreate(ProductBase):
    pass


class ProductUpdate(ProductBase):
    pass


class ProductOut(ProductBase):
    uniq_id: str

    model_config = {
        "from_attributes": True
    }
