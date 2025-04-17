import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/PaymentPage.css'; // Optional for styling

function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [paid, setPaid] = useState(false);
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

  const handlePayment = (e) => {
    e.preventDefault();

    if (!cardNumber || !expiry || !cvv) {
      alert("Please fill in all payment details.");
      return;
    }

    // Simulate saving purchase
    const purchase = {
      userId: JSON.parse(getCookie('user'))?.username || '',
      productId: product.uniq_id,
      productName: product.product_name,
      price: product.selling_price,
      timestamp: new Date().toISOString(),
    };

    const purchases = JSON.parse(localStorage.getItem("purchases")) || [];
    purchases.push(purchase);
    localStorage.setItem("purchases", JSON.stringify(purchases));

    setPaid(true);
  };

  if (!product) return <p>No product selected.</p>;

  return (
    <div className="payment-container">
      {!paid ? (
        <>
          <h2>Enter Payment Details</h2>
          <p><strong>Item:</strong> {product.product_name}</p>
          <p><strong>Price:</strong> ₹{product.selling_price}</p>

          <form onSubmit={handlePayment} className="payment-form">
            <input
              type="text"
              placeholder="Card Number"
              maxLength="16"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Expiry Date (MM/YY)"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="CVV"
              maxLength="3"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              required
            />
            <button type="submit">Pay Now</button>
          </form>
        </>
      ) : (
        <>
          <h2>Payment Successful 🎉</h2>
          <p>Thank you for purchasing <strong>{product.name}</strong>!</p>
          <button onClick={() => navigate('/')}>Return Home</button>
        </>
      )}
    </div>
  );
}

export default PaymentPage;
