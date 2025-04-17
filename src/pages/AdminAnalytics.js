// src/pages/AdminAnalytics.js
import React, { useEffect, useState } from 'react';

function AdminAnalytics() {
  const [userCount, setUserCount] = useState(0);
  const [purchases, setPurchases] = useState([]);
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const purchaseData = JSON.parse(localStorage.getItem('purchases')) || [];

    setUserCount(users.length);
    setPurchases(purchaseData);

    // Count product frequency
    const productFrequency = {};
    purchaseData.forEach(p => {
      productFrequency[p.productName] = (productFrequency[p.productName] || 0) + 1;
    });

    const sortedProducts = Object.entries(productFrequency)
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, count }));

    setTopProducts(sortedProducts);
  }, []);

  return (
    <div className="admin-analytics">
      <h2>Admin Analytics</h2>
      <p><strong>Total Registered Users:</strong> {userCount}</p>
      <p><strong>Total Purchases:</strong> {purchases.length}</p>

      <h3>Top Purchased Products:</h3>
      <ul>
        {topProducts.length === 0 ? (
          <li>No purchases yet</li>
        ) : (
          topProducts.map((prod, index) => (
            <li key={index}>{prod.name} — {prod.count} bought</li>
          ))
        )}
      </ul>
    </div>
  );
}

export default AdminAnalytics;
