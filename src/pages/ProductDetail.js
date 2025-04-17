// src/pages/ProductDetail.js
import { useParams, useNavigate } from 'react-router-dom';
import products from '../data/Products';
import '../styles/ProductDetail.css';

import mobileImage from '../static/mobile.jpg';
import laptopImage from '../static/laptop.jpg';
import headphoneImage from '../static/headphone.jpg';
import watchImage from '../static/watch.jpg';

function ProductDetail({ addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = !user;

  const product = products.find(p => p.id === parseInt(id));
  if (!product) return <div>Product not found</div>;

  const getImageForCategory = (category) => {
    switch (category) {
      case 'Mobiles':
        return mobileImage;
      case 'Laptops':
        return laptopImage;
      case 'Headphones':
        return headphoneImage;
      case 'Watches':
        return watchImage;
      default:
        return '';
    }
  };

  const handleBuyNow = () => {
    if (isLoggedIn) {
      navigate('/payment', { state: { product } });
    } else {
      alert('Please log in to proceed with the purchase.');
      navigate('/login');
    }
  };

  return (
    <div className="product-detail">
      <img
        src={getImageForCategory(product.category)}
        alt={product.name}
        className="product-image"
      />
      <div className="detail-info">
        <h2>{product.name}</h2>
        <p><strong>Price:</strong> ₹{product.price}</p>
        <p><strong>Rating:</strong> ⭐ {product.rating}</p>
        <p><strong>Description:</strong> {product.description}</p>
        <button onClick={() => addToCart(product)}>Add to Cart</button>
        <button onClick={handleBuyNow} style={{ marginLeft: '10px' }}>
          Buy Now
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;
