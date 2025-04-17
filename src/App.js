import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import CategoryPage from './pages/CategoryPage'; // Make sure this file exists
import CategoryBar from './components/CategoryBar';
import Admin from './pages/Admin';
import PaymentPage from './pages/PaymentPage';
import AdminAnalytics from './pages/AdminAnalytics';
import UserInfo from './pages/UserInfo';

import './styles/App.css';
import './styles/Navbar.css';
import './styles/Home.css';
import './styles/ProductDetail.css';
import './styles/Cart.css';
import './styles/Login.css';
import './styles/AdminLogin.css';
// import './styles/'

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
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

  // Function to add product to cart
  const addToCart = (product) => {
    if (isLoggedIn) {
      setCartItems((prevItems) => [...prevItems, product]);
    }
    else {  
      alert("Please login to add items to the cart.");
    }
  };

  // Function to remove product from cart
  const handleRemove = (productId) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== productId));
  };

  return (
    <Router>
      <Navbar
        cartItems={cartItems}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        isLoggedIn={isLoggedIn} 
        setIsLoggedIn={setIsLoggedIn}
        username={JSON.parse(getCookie('user'))?.username || ''}
      />
      <CategoryBar />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              addToCart={addToCart}
              showFilter={false} // Prevent filters from appearing on home
            />
          }
        />
        <Route
          path="/category/:category"
          element={<CategoryPage addToCart={addToCart} />}
        />
        <Route
          path="/product/:id"
          element={<ProductDetail addToCart={addToCart} />}
        />
        <Route path="/cart" element={<Cart cartItems={cartItems} removeFromCart={handleRemove} />} />
        <Route path="/userinfo" element={<UserInfo cartItems={cartItems}/>} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/admin/analytics" element={<AdminAnalytics />} />
        
      </Routes>
      
    </Router>
  );
}

export default App;
