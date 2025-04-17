import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = ({ cartItems = [], isLoggedIn, setIsLoggedIn, username }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from remote API
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "https://e619-2409-40e1-10c6-c147-b636-7148-b26b-de61.ngrok-free.app/products/",{
            headers: {
              "ngrok-skip-browser-warning": "true",
            },
          }

        );
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setFiltered([]);
    } else {
      const results = products.filter((product) =>
        product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFiltered(results);
    }
  }, [searchTerm, products]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // const handleProductClick = (product) => {
  //   navigate(`/product/${product.uniq_id}`, { state: { product } });
  // };

  return (
    <div className="navbar">
      <div className="navbar-logo">
        <Link to="/" className="navbar-logo">
          ShopEasy
        </Link>
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
                  // onClick={handleProductClick(item)}
                  className="search-result-item"
                >
                  <div className="result-name">{item.product_name}</div>
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
        {isLoggedIn && (
          <Link
          className="navbar-cart"
          to="/userinfo"
          state={{ username, cartItems }}
        >
          Hello, <strong>{username}</strong>
        </Link>
        )}
        {isLoggedIn ? (
          <Link className="navbar-cart" onClick={handleLogout}>
            Logout
          </Link>
        ) : (
          <Link to="/login" className="navbar-cart">
            Login
          </Link>
        )}
        <Link to="/cart" className="navbar-cart">
          Cart ({cartItems.length})
        </Link>
        <Link to="/admin" className="navbar-cart">
          Admin
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
