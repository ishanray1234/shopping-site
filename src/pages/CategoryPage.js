// File: src/pages/CategoryPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FilterSidebar from '../components/FilterSidebar';
import ProductCard from '../components/ProductCard';
import '../styles/CategoryPage.css';
import '../styles/FilterSidebar.css';
import { BASE_URL, API_HEADERS } from '../config';

const CategoryPage = ({ addToCart }) => {
  const { category } = useParams();

  const [filters, setFilters] = useState({
    price: 1000,
    brands: [],
    rating: 0,
  });

  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoryBrands, setCategoryBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${BASE_URL}/categories/${category}`,{
            headers: API_HEADERS,
          }
        );
        const data = await response.json();
        setAllProducts(data);
        const uniqueBrands = [...new Set(data.map((p) => p.brand_name).filter(Boolean))];
        setCategoryBrands(uniqueBrands);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching category products:', error);
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [category]);

  console.log(allProducts);
  useEffect(() => {
    const filtered = allProducts.filter((product) => {
      const withinPrice = parseFloat(product.selling_price || 0) <= filters.price;
      const matchesBrand =
        filters.brands.length === 0 || filters.brands.includes(product.brand_name);
      const matchesRating = parseFloat(product.rating || 0) >= filters.rating;
      return withinPrice && matchesBrand && matchesRating;
    });

    setFilteredProducts(filtered);
  }, [allProducts, filters]);

  return (
    <div className="category-page">
      <FilterSidebar
        filters={filters}
        setFilters={setFilters}
        brands={categoryBrands}
      />

      <div className="products-grid">
        <h2>{category.charAt(0).toUpperCase() + category.slice(1)} Products</h2>
        {loading ? (
          <p>Loading products...</p>
        ) : (
          <div className="products-list">
            {filteredProducts.length ? (
              filteredProducts.map((product) => (
                <ProductCard key={product.uniq_id} product={product} addToCart={addToCart} />
              ))
            ) : (
              <p>No products match the selected filters.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
