// File: src/pages/CategoryPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FilterSidebar from '../components/FilterSidebar';
import products from '../data/Products';
import ProductCard from '../components/ProductCard';
import '../styles/CategoryPage.css';
import '../styles/FilterSidebar.css';

const CategoryPage = ({addToCart}) => {
  const { category } = useParams();

  const [filters, setFilters] = useState({
    price: 100000,
    brands: [],
    rating: 0,
  });

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoryBrands, setCategoryBrands] = useState([]);

  useEffect(() => {
    const productsInCategory = products.filter(
      (product) => product.category.toLowerCase() === category.toLowerCase()
    );

    const uniqueBrands = [...new Set(productsInCategory.map(p => p.brand))];
    setCategoryBrands(uniqueBrands);

    const filtered = productsInCategory.filter((product) => {
      const withinPrice = product.price <= filters.price;
      const matchesBrand =
        filters.brands.length === 0 || filters.brands.includes(product.brand);
      const matchesRating = product.rating >= filters.rating;
      return withinPrice && matchesBrand && matchesRating;
    });

    setFilteredProducts(filtered);
  }, [category, filters]);

  return (
    <div className="category-page">
      <FilterSidebar
        filters={filters}
        setFilters={setFilters}
        brands={categoryBrands}
      />

      <div className="products-grid">
        <h2>{category.charAt(0).toUpperCase() + category.slice(1)} Products</h2>
        <div className="products-list">
          {filteredProducts.length ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} addToCart={addToCart}/>
            ))
          ) : (
            <p>No products match the selected filters.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
