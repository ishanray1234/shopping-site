import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import '../styles/ProductCard.css';
import placeholderImage from '../static/laptop.jpg'; // Fallback image

function ProductCard({ product, addToCart }) {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
    useEffect(() => {
      const userCookie = getCookie('user');
      if (userCookie) {
        setIsLoggedIn(true);
      }
    }, []);
  
    const getCookie = (name) => {
      return document.cookie.split('; ').reduce((r, v) => {
        const parts = v.split('=');
        return parts[0] === name ? decodeURIComponent(parts[1]) : r;
      }, '');
    };
  
  const handleBuyNow = () => {
    if (isLoggedIn) {
      navigate('/payment', { state: { product } });
    } else {
      alert('Please log in to proceed with the purchase.');
      navigate('/login');
    }
  };

  const handleProductClick = () => {
    navigate(`/product/${product.uniq_id}`, { state: { product } });
  };

  const getImageSrc = () => {
    // Use image from product metadata or fallback
    return product?.image && product.image.trim() !== '' 
      ? product.image 
      : placeholderImage;
  };

  return (
    <div className="product-card">
      <img
        src={getImageSrc()}
        alt={product.product_name || 'Product Image'}
        onClick={handleProductClick}
        onError={(e) => (e.target.src = placeholderImage)}
        style={{ cursor: 'pointer' }}
      />
      <h3 
      onClick={handleProductClick} 
      style={{ cursor: 'pointer' }}>
        {product.product_name || 'Unnamed Product'}
      </h3>
      <p>${product.selling_price != null ? product.selling_price : 'N/A'}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
      <button onClick={handleBuyNow}>Buy Now</button>
    </div>
  );
}

export default ProductCard;
