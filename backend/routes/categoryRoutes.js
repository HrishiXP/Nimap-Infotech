// backend/routes/categoryRoutes.js

const express = require('express');
const router = express.Router();
const Category = require('../models/category');

// Get all categories
router.get('/', (req, res) => {
  Category.getAll((err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Create a new category
router.post('/', (req, res) => {
  const { name } = req.body;
  Category.create(name, (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(201).json({ id: result.insertId, name });
  });
});

// Update a category
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  Category.update(id, name, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ id, name });
  });
});

// Delete a category
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  Category.delete(id, (err) => {
    if (err) return res.status(500).json(err);
    res.status(204).end();
  });
});

module.exports = router;
