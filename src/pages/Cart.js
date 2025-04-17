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
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <div className="cart-item-meta">
                  <span className="price">${item.price.toFixed(2)}</span>
                  <button
                    onClick={() => removeFromCart(item.id)}
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
