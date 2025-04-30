import { useEffect, useState } from 'react';
import '../styles/Home.css';
import ProductCard from '../components/ProductCard';
import bannerImage from '../static/bg.jpg';
import axios from 'axios';
import { BASE_URL, API_HEADERS } from '../config';

function Home({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/products/`, {
        headers: API_HEADERS,
      })
      .then((response) => {
        setProducts(response.data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);
  console.log(products);
  return (
    <div className="home-container">
      <img src={bannerImage} alt="Banner" className="home-banner" />

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard product={product} addToCart={addToCart} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
