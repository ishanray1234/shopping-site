import { useEffect, useState } from 'react';
import '../styles/Home.css';
import ProductCard from '../components/ProductCard';
import bannerImage from '../static/bg.jpg';
import axios from 'axios';

function Home({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('https://e619-2409-40e1-10c6-c147-b636-7148-b26b-de61.ngrok-free.app/products/', {
        headers: {
          'ngrok-skip-browser-warning': 'true',
        },
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
