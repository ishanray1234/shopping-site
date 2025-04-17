// File: src/components/FilterSidebar.js
import React from 'react';
import '../styles/FilterSidebar.css';

const FilterSidebar = ({ filters, setFilters, brands }) => {
  const handlePriceChange = (e) => {
    setFilters({ ...filters, price: Number(e.target.value) });
  };

  const handleBrandChange = (e) => {
    const brand = e.target.value;
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter((b) => b !== brand)
      : [...filters.brands, brand];
    setFilters({ ...filters, brands: newBrands });
  };

  const handleRatingChange = (e) => {
    setFilters({ ...filters, rating: Number(e.target.value) });
  };

  const clearFilters = () => {
    setFilters({ price: 1000, brands: [], rating: 0 });
  };

  return (
    <div className="filter-sidebar">
      <h3>Filters</h3>

      <div className="filter-section">
        <h4>Price (Max)</h4>
        <input
          type="range"
          min="0"
          max="1000"
          step="10"
          value={filters.price}
          onChange={handlePriceChange}
        />
        <div>Up to ₹{filters.price}</div>
      </div>

      <div className="filter-section">
        <h4>Brand</h4>
        {brands.length === 0 ? (
          <p>No brands found</p>
        ) : (
          brands.map((brand) => (
            <div key={brand}>
              <label>
                <input
                  type="checkbox"
                  value={brand}
                  checked={filters.brands.includes(brand)}
                  onChange={handleBrandChange}
                />
                {brand}
              </label>
            </div>
          ))
        )}
      </div>

      <div className="filter-section">
        <h4>Minimum Rating</h4>
        {[5, 4, 3, 2, 1].map((r) => (
          <label key={r} style={{ display: 'block' }}>
            <input
              type="radio"
              name="rating"
              value={r}
              checked={filters.rating === r}
              onChange={handleRatingChange}
            />
            {r} ★ & up
          </label>
        ))}
      </div>

      <button className="clear-btn" onClick={clearFilters}>
        Clear Filters
      </button>
    </div>
  );
};

export default FilterSidebar;
