
const db = require('../config/db'); 

class Product {
  static getAll(page, limit, callback) {
    const offset = (page - 1) * limit;
    db.query('SELECT SQL_CALC_FOUND_ROWS * FROM products LIMIT ? OFFSET ?', [limit, offset], (err, results) => {
      if (err) return callback(err);
      
      db.query('SELECT FOUND_ROWS() AS total', (err, totalResult) => {
        if (err) return callback(err);
        const total = totalResult[0].total;
        callback(null, { products: results, total });
      });
    });
  }

  static create(name, categoryId, callback) {
    db.query('INSERT INTO products (name, categoryId) VALUES (?, ?)', [name, categoryId], (err, result) => {
      callback(err, result);
    });
  }

  static update(id, name, categoryId, callback) {
    db.query('UPDATE products SET name = ?, categoryId = ? WHERE id = ?', [name, categoryId, id], (err) => {
      callback(err);
    });
  }

  static delete(id, callback) {
    db.query('DELETE FROM products WHERE id = ?', [id], (err) => {
      callback(err);
    });
  }
}

module.exports = Product;
