import React from 'react';
import { useLocation } from 'react-router-dom';

const UserInfo = () => {
  const location = useLocation();
  const { username, cartItems } = location.state || {}; // Get the state passed from Navbar
  // purchased products from local storage
    const purchases = JSON.parse(localStorage.getItem("purchases")) || [];
    const purchasedProducts = purchases.filter((purchase) => purchase.userId === username);

  return (
    <div className="user-info-page">
      <h1>User Info</h1>
      <div className="user-details">
        <h2>Username: {username}</h2>
        <h3>Products in Cart:</h3>
        {cartItems && cartItems.length > 0 ? (
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>{item.product_name}</li>
            ))}
          </ul>
        ) : (
          <p>No products in Cart.</p>
        )}
        <h3>Purchased Products:</h3>
        {purchasedProducts && purchasedProducts.length > 0 ? (
          <ul>
            {purchasedProducts.map((item, index) => (
              <li key={index}>{item.productName}- <strong>₹{parseFloat(item.price)}</strong> on {new Date(item.timestamp).toLocaleDateString()}
              </li>
              
            ))}
          </ul>
        ) : (
          <p>No purchased products.</p>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
