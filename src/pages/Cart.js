// src/pages/Cart.js
import React from 'react';
import '../styles/Cart.css';

function Cart({ cartItems = [], removeFromCart = () => {} }) {
  return (
    <div className="cart-container">
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="empty-message">🛒 Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.uniq_id} className="cart-item">
              <img
                src={item.image || 'https://via.placeholder.com/100'}
                alt={item.product_name || 'Product'}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <h3>{item.product_name}</h3>
                {item.product_description && (
                  <p className="cart-description">{item.product_description}</p>
                )}

                <div className="cart-item-meta">
                  <span className="price">
                    ₹{parseFloat(item.selling_price || item.list_price || 0).toFixed(2)}
                  </span>

                  <button
                    onClick={() => removeFromCart(item.uniq_id)}
                    className="remove-button"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Cart;
