import React, { useState } from 'react';
import products from '../data/Products';

function AdminPanel() {
  const [newProduct, setNewProduct] = useState({
    id: '',
    name: '',
    image: '',
    price: '',
    description: '',
    category: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = () => {
    const id = Date.now();
    const product = { ...newProduct, id: id };
    products.push(product);
    alert('Product added (in memory only)');
    setNewProduct({ id: '', name: '', image: '', price: '', description: '', category: '' });
  };

  return (
    <div className="admin-panel">
      <h2>Add New Product</h2>
      <div className="product-form">
        <input name="name" placeholder="Product Name" value={newProduct.name} onChange={handleChange} />
        <input name="image" placeholder="Image URL" value={newProduct.image} onChange={handleChange} />
        <input name="price" placeholder="Price" value={newProduct.price} onChange={handleChange} />
        <input name="description" placeholder="Description" value={newProduct.description} onChange={handleChange} />
        <input name="category" placeholder="Category" value={newProduct.category} onChange={handleChange} />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>
    </div>
  );
}

export default AdminPanel;
