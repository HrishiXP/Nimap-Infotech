// backend/models/product.js

const db = require('../config/db'); // Adjust the path to your database connection

class Product {
  // Get all products with pagination
  static getAll(page, limit, callback) {
    const offset = (page - 1) * limit;
    db.query('SELECT SQL_CALC_FOUND_ROWS * FROM products LIMIT ? OFFSET ?', [limit, offset], (err, results) => {
      if (err) return callback(err);
      
      // Get total number of products for pagination
      db.query('SELECT FOUND_ROWS() AS total', (err, totalResult) => {
        if (err) return callback(err);
        const total = totalResult[0].total;
        callback(null, { products: results, total });
      });
    });
  }

  // Create a new product
  static create(name, categoryId, callback) {
    db.query('INSERT INTO products (name, categoryId) VALUES (?, ?)', [name, categoryId], (err, result) => {
      callback(err, result);
    });
  }

  // Update a product
  static update(id, name, categoryId, callback) {
    db.query('UPDATE products SET name = ?, categoryId = ? WHERE id = ?', [name, categoryId, id], (err) => {
      callback(err);
    });
  }

  // Delete a product
  static delete(id, callback) {
    db.query('DELETE FROM products WHERE id = ?', [id], (err) => {
      callback(err);
    });
  }
}

module.exports = Product;
