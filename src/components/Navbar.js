import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import products from "../data/Products"; // Import the products data

const Navbar = ({ cartItems = [],isLoggedIn, setIsLoggedIn}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    if (searchTerm === "") {
      setFiltered([]);
    } else {
      const results = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFiltered(results);
    }
  }, [searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="navbar">
      <div className="navbar-logo">
      <Link to="/" className="navbar-logo">ShopEasy</Link>
      </div>

      {/* Search Bar */}
      <div className="navbar-search">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search products..."
        />
        {searchTerm && (
        <div className="search-results-dropdown">
          {filtered.length > 0 ? (
            filtered.map((item, idx) => (
              <Link
                key={idx}
                to={`/product/${item.id}`}
                className="search-result-item"
              >
                <div className="result-name">{item.name}</div>
              </Link>
            ))
          ) : (
            <div className="search-result-empty">No matches found.</div>
          )}
        </div>
      )}

      </div>

      {/* Right-side buttons */}
      <div className="navbar-right">
      {isLoggedIn ? (
          <Link className="navbar-cart"
            onClick={handleLogout}>Logout</Link>
        ) : (
          <Link to="/login" className="navbar-cart">
            Login</Link>
        )}
        <Link to="/cart" className="navbar-cart">
          Cart ({cartItems.length})
        </Link>
        <Link to="/admin" className="navbar-cart">Admin</Link>
      </div>
    </div>
  );
};

export default Navbar;
