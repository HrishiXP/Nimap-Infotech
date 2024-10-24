import logo from './logo.svg';
import './App.css';
import React from 'react';
import CategoryMaster from './components/CategoryMaster';
import ProductMaster from './components/ProductMaster';

function App() {
  return (
    <div className="App">
    <h1>Nimap Infotech</h1>
    <CategoryMaster />
    <ProductMaster />
  </div>
  );
}

export default App;
