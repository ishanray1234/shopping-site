from sqlalchemy.orm import Session
from database import SessionLocal, engine, Base
from models import Product
import random
from faker import Faker

fake = Faker()
Base.metadata.create_all(bind=engine)
# Base products to clone with variations
base_products = [
    {
        "title": "Apple iPhone 15",
        "description": "Latest iPhone model with A17 chip.",
        "product_image": "https://example.com/iphone15.jpg",
        "price": 1199.99
    },
    {
        "title": "Sony WH-1000XM5",
        "description": "Noise-cancelling headphones with great sound.",
        "product_image": "https://example.com/sonyheadphones.jpg",
        "price": 349.99
    },
    {
        "title": "Samsung Galaxy S24",
        "description": "Flagship Android phone with powerful features.",
        "product_image": "https://example.com/galaxys24.jpg",
        "price": 1099.99
    },
    {
        "title": "Dell XPS 13 Plus",
        "description": "Ultra-thin performance laptop with Intel Evo certification.",
        "product_image": "https://example.com/dellxps13.jpg",
        "price": 1399.99
    },
    {
        "title": "Bose QuietComfort Ultra",
        "description": "Immersive noise cancellation and premium sound quality.",
        "product_image": "https://example.com/boseqc.jpg",
        "price": 299.99
    },
    {
        "title": "Apple Watch Series 9",
        "description": "Advanced fitness tracking with always-on Retina display.",
        "product_image": "https://example.com/applewatch9.jpg",
        "price": 499.00
    },
    {
        "title": "iPad Pro M2 12.9-inch",
        "description": "Tablet with M2 chip and Liquid Retina XDR display.",
        "product_image": "https://example.com/ipadpro.jpg",
        "price": 1299.00
    },
    {
        "title": "Logitech MX Master 3S",
        "description": "Precision wireless mouse with ergonomic design.",
        "product_image": "https://example.com/logitechmx.jpg",
        "price": 99.99
    },
    {
        "title": "Kindle Paperwhite 11th Gen",
        "description": "High-res e-reader with adjustable warm light.",
        "product_image": "https://example.com/kindle.jpg",
        "price": 149.99
    },
    {
        "title": "Canon EOS R50 Mirrorless Camera",
        "description": "Compact mirrorless camera with 4K video.",
        "product_image": "https://example.com/canonr50.jpg",
        "price": 899.99
    },
    {
        "title": "Google Pixel 8 Pro",
        "description": "Flagship Pixel phone with Tensor G3 chip and AI features.",
        "product_image": "https://example.com/pixel8pro.jpg",
        "price": 999.99
    },
    {
        "title": "DJI Mini 4 Pro Drone",
        "description": "Ultra-light drone with 4K HDR video and obstacle sensing.",
        "product_image": "https://example.com/dji4mini.jpg",
        "price": 759.00
    },
    {
        "title": "Samsung 49\" Odyssey OLED G9",
        "description": "Ultrawide QD-OLED gaming monitor with 240Hz refresh rate.",
        "product_image": "https://example.com/samsungg9.jpg",
        "price": 1699.99
    },
    {
        "title": "Razer Blade 16 Gaming Laptop",
        "description": "GeForce RTX 4090-powered beast for elite gamers.",
        "product_image": "https://example.com/razerblade16.jpg",
        "price": 3899.99
    },
    {
        "title": "Sony PlayStation 5 Slim",
        "description": "Next-gen gaming console with ultra-fast load times.",
        "product_image": "https://example.com/ps5slim.jpg",
        "price": 499.00
    },
    {
        "title": "Microsoft Surface Pro 9",
        "description": "Tablet and laptop in one with 2-in-1 flexibility.",
        "product_image": "https://example.com/surfacepro9.jpg",
        "price": 1299.99
    },
    {
        "title": "Beats Studio Pro",
        "description": "High-performance wireless headphones with spatial audio.",
        "product_image": "https://example.com/beatspro.jpg",
        "price": 349.95
    },
    {
        "title": "Nikon Z30 Vlogger Kit",
        "description": "Vlogging-ready mirrorless camera bundle.",
        "product_image": "https://example.com/nikonz30.jpg",
        "price": 729.95
    },
    {
        "title": "Echo Show 10 (3rd Gen)",
        "description": "Smart display with motion-tracking screen.",
        "product_image": "https://example.com/echoshow10.jpg",
        "price": 249.99
    },
    {
        "title": "ASUS ROG Ally Handheld Console",
        "description": "Portable Windows gaming handheld with AMD Ryzen Z1 Extreme.",
        "product_image": "https://example.com/rogally.jpg",
        "price": 699.99
    },
]


def generate_fake_products(n=150):
    products = []
    for i in range(n):
        base = random.choice(base_products)
        product = {
            "title": f"{base['title']} #{i+1}",
            "description": base['description'] + " " + fake.sentence(nb_words=6),
            "product_image": base['product_image'],
            "quantity": random.randint(5, 100),
            "rating": round(random.uniform(3.5, 5.0), 1),
            "price": round(base["price"] * random.uniform(0.9, 1.1), 2)
        }
        products.append(product)
    return products


def insert_products():
    db: Session = SessionLocal()
    try:
        product_list = generate_fake_products(150)
        for p in product_list:
            product = Product(**p)
            db.add(product)
        db.commit()
        print("✅ 150 products inserted successfully!")
    except Exception as e:
        db.rollback()
        print("❌ Error inserting products:", e)
    finally:
        db.close()


if __name__ == "__main__":
    insert_products()
