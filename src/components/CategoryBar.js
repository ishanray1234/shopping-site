// src/components/CategoryBar.js
import { useNavigate } from 'react-router-dom';
import '../styles/CategoryBar.css';

const categories = ['Games', 'Toys', 'Accessories', 'Play', 'Sports',
  'Hobbies','Kids','Supplies','Vehicles','Kitchen','Baby','Home','Crafts','Costumes','Arts'];

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
