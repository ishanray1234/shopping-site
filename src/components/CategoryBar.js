// src/components/CategoryBar.js
import { useNavigate } from 'react-router-dom';
import '../styles/CategoryBar.css';

const categories = ['Mobiles', 'Laptops', 'Headphones', 'Watches'];

function CategoryBar() {
  const navigate = useNavigate();
  return (
    <div className="category-bar">
      {categories.map(category => (
        <button key={category} onClick={() => navigate(`/category/${category}`)}>
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryBar;
