// backend/routes/productRoutes.js

const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Get all products with pagination
router.get('/', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  Product.getAll(page, limit, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Create a new product
router.post('/', (req, res) => {
  const { name, categoryId } = req.body;
  Product.create(name, categoryId, (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(201).json({ id: result.insertId, name, categoryId });
  });
});

// Update a product
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, categoryId } = req.body;
  Product.update(id, name, categoryId, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ id, name, categoryId });
  });
});

// Delete a product
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  Product.delete(id, (err) => {
    if (err) return res.status(500).json(err);
    res.status(204).end();
  });
});

module.exports = router;
