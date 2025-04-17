from sqlalchemy import Column, Integer, String, Text, Numeric, Boolean
from database import Base


class Product(Base):
    __tablename__ = "products"
    uniq_id = Column(String(500), primary_key=True, index=True)
    product_name = Column(Text)
    brand_name = Column(String(1000), nullable=True)
    asin = Column(String(20), nullable=True)
    category = Column(String(1000), nullable=True)
    upc_ean_code = Column(String(500), nullable=True)
    list_price = Column(Numeric(10, 2), nullable=True)
    selling_price = Column(Numeric(10, 2), nullable=True)
    quantity = Column(Integer, nullable=True)
    model_number = Column(String(500), nullable=True)
    about_product = Column(Text, nullable=True)
    product_specification = Column(Text, nullable=True)
    technical_details = Column(Text, nullable=True)
    shipping_weight = Column(String(500), nullable=True)
    product_dimensions = Column(String(1000), nullable=True)
    image = Column(Text)
    variants = Column(Text, nullable=True)
    sku = Column(String(30), nullable=True)
    product_url = Column(Text)
    stock = Column(Integer, nullable=True)
    product_details = Column(Text, nullable=True)
    dimensions = Column(String(1000), nullable=True)
    color = Column(String(30), nullable=True)
    ingredients = Column(Text, nullable=True)
    direction_to_use = Column(Text, nullable=True)
    is_amazon_seller = Column(Boolean)
    size_quantity_variant = Column(String(500), nullable=True)
    product_description = Column(Text, nullable=True)
