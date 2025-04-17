import { useNavigate, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import '../styles/ProductDetail.css';
import placeholderImage from '../static/laptop.jpg';

function ProductDetail({ addToCart }) {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product;
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

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleBuyNow = () => {
    if (isLoggedIn) {
      navigate('/payment', { state: { product } });
    } else {
      alert('Please log in to proceed with the purchase.');
      navigate('/login');
    }
  };

  const getImageSrc = () => {
    return product?.image && product.image.trim() !== ''
      ? product.image
      : placeholderImage;
  };

  return (
    <div className="amazon-detail-container">
      {/* Left: Image */}
      <div className="amazon-detail-image">
        <img
          src={getImageSrc()}
          alt={product.product_name || 'Product'}
          onError={(e) => (e.target.src = placeholderImage)}
        />
      </div>

      {/* Middle: Description */}
      <div className="amazon-detail-info">
        <h1>{product.product_name || 'Unnamed Product'}</h1>
        <p className="brand">Brand: {product.brand_name || 'N/A'}</p>
        <p className="rating">
          ⭐ {product.rating || '4.2'} | {product.total_reviews || '142'} ratings
        </p>
        <p className="description">{product.product_description || 'No description available.'}</p>
        <p className="specs"><strong>Specifications:</strong> {product.product_specification || 'No specifications available.'}</p>
        <p className="technical-details"><strong>Technical Details:</strong> {product.technical_details || 'No technical details available.'}</p>
        <p className="product-details"><strong>Product Details:</strong> {product.product_details || 'No details available.'}</p>
        <p className="shipping-weight"><strong>Shipping Weight:</strong> {product.shipping_weight || 'N/A'}</p>
        <p className="dimensions"><strong>Dimensions:</strong> {product.product_dimensions || 'N/A'}</p>
      </div>

      {/* Right: Cart Actions */}
      <div className="amazon-detail-cartbox">
        <p className="price">₹{product.selling_price || 'N/A'}</p>
        <p className="stock">Stock: {product.stock || 'Out of Stock'}</p>
        <p className="category">Category: {product.category || 'N/A'}</p>
        <button className="cart-btn" onClick={() => addToCart(product)}>Add to Cart</button>
        <button className="buy-btn" onClick={handleBuyNow}>Buy Now</button>
      </div>
    </div>
  );
}

export default ProductDetail;
