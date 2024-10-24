// frontend/src/components/ProductMaster.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductMaster() {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [editId, setEditId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 10; // Define page size

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [currentPage]); // Fetch products when currentPage changes

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products', {
        params: { page: currentPage, limit: pageSize },
      });
      setProducts(response.data.products);
      const total = response.data.total || 0; // Adjust based on your response structure
      setTotalPages(Math.ceil(total / pageSize));
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const addProduct = async () => {
    if (productName.trim() === '' || !categoryId) {
      alert('Product name and category are required');
      return;
    }

    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/products/${editId}`, { name: productName, categoryId });
        setEditId(null);
      } else {
        await axios.post('http://localhost:5000/api/products', { name: productName, categoryId });
      }
      setProductName('');
      setCategoryId('');
      fetchProducts(); // Refresh products after adding/updating
    } catch (error) {
      console.error('Error adding/updating product:', error);
    }
  };

  const editProduct = (product) => {
    setProductName(product.productName);
    setCategoryId(product.categoryId);
    setEditId(product.id);
  };

  const deleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        fetchProducts(); // Refresh products after delete
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div>
      <h2>Product Master</h2>
      <input
        type="text"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        placeholder="Enter product name"
      />
      <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
        <option value="">Select category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <button onClick={addProduct}>{editId ? 'Update' : 'Add'}</button>
      
      {/* Product List in Table Format */}
      <table>
        <thead>
          <tr>
            <th>ProductId</th>
            <th>ProductName</th>
            <th>CategoryName</th>
            <th>CategoryId</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            const category = categories.find(cat => cat.id === product.categoryId) || {};
            return (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{category.name || 'N/A'}</td>
                <td>{product.categoryId}</td>
                <td>
                  <button onClick={() => editProduct(product)}>Edit</button>
                  <button onClick={() => deleteProduct(product.id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span> Page {currentPage} of {totalPages} </span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default ProductMaster;
