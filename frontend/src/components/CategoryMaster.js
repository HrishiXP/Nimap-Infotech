
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CategoryMaster() {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const addCategory = async () => {
    if (categoryName.trim() === '') {
      alert('Category name is required');
      return;
    }
    
    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/categories/${editId}`, { name: categoryName });
        setEditId(null);
      } else {
        await axios.post('http://localhost:5000/api/categories', { name: categoryName });
      }
      setCategoryName('');
      fetchCategories();
    } catch (error) {
      console.error('Error adding/updating category:', error);
    }
  };

  const editCategory = (category) => {
    setCategoryName(category.name);
    setEditId(category.id);
  };

  const deleteCategory = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await axios.delete(`http://localhost:5000/api/categories/${id}`);
        fetchCategories();
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    }
  };

  return (
    <div>
      <h2>Category Master</h2>
      <input
        type="text"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        placeholder="Enter category name"
      />
      <button onClick={addCategory}>{editId ? 'Update' : 'Add'}</button>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            {category.name}
            <button onClick={() => editCategory(category)}>Edit</button>
            <button onClick={() => deleteCategory(category.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryMaster;
