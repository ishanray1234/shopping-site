import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../styles/ProductCard.css';
import mobileImage from '../static/mobile.jpg';
import laptopImage from '../static/laptop.jpg';
import headphoneImage from '../static/headphone.jpg';
import watchImage from '../static/watch.jpg';
import axios from 'axios';

function ProductCard({ productId, addToCart }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const isLoggedIn = !user;

  const [product, setProduct] = useState(null);
  useEffect(() => {
    axios
      .get('http://b9b7-2409-40e1-10f9-11c0-cf6b-5c1d-433b-11f4.ngrok-free.app/products/')
      .then((response) => {
        console.log(response)
        const foundProduct = response.data.find(p => p.id === productId);
        setProduct(foundProduct);
      })
      .catch((error) => {
        console.log('Error fetching product:', error);
      });
  }, [productId]);

  console.log(product)
  const handleBuyNow = () => {
    if (isLoggedIn) {
      navigate('/payment', { state: { product } });
    } else {
      alert('Please log in to proceed with the purchase.');
      navigate('/login');
    }
  };

  const handleProductClick = () => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  const getImageForCategory = (category) => {
    switch (category) {
      case 'Mobiles':
        return mobileImage;
      case 'Laptops':
        return laptopImage;
      case 'Headphones':
        return headphoneImage;
      case 'Watches':
        return watchImage;
      default:
        return '';
    }
  };

  return (
    <div></div>
    // <div className="product-card">
    //   <img
    //     src={getImageForCategory(product.category)}
    //     alt={product.name}
    //     onClick={handleProductClick}
    //     style={{ cursor: 'pointer' }}
    //   />
    //   <h3 onClick={handleProductClick} style={{ cursor: 'pointer' }}>
    //     {product.name}
    //   </h3>
    //   <p>${product.price}</p>
    //   <button onClick={() => addToCart(product)}>Add to Cart</button>
    //   <button onClick={handleBuyNow}>Buy Now</button>
    // </div>
  );
}

export default ProductCard;
