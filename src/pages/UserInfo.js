import React from 'react';
import { useLocation } from 'react-router-dom';

const UserInfo = () => {
  const location = useLocation();
  const { username, cartItems } = location.state || {}; // Get the state passed from Navbar

  return (
    <div className="user-info-page">
      <h1>User Info</h1>
      <div className="user-details">
        <h2>Username: {username}</h2>
        <h3>Products Bought:</h3>
        {cartItems && cartItems.length > 0 ? (
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>{item.name}</li>
            ))}
          </ul>
        ) : (
          <p>No products bought yet.</p>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
