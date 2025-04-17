import { Link } from 'react-router-dom';
import '../styles/Home.css';
import ProductCard from '../components/ProductCard';
import products from '../data/Products';
import bannerImage from '../static/bg.jpg';

// export default function Home({ searchTerm, setSearchTerm }) {
//   const filteredProducts = mockProducts.filter((product) =>
//     product.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

function Home({ addToCart }) {
    return (
      <div className="home-container">
        <img src={bannerImage} alt="Banner" className="home-banner" />

        <div className="product-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} addToCart={addToCart}/>
          ))}
        </div>
      </div>
    );
  }
  
  export default Home;