// backend/config/db.js

const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Replace with your database username
  password: 'Hrishi@99', // Replace with your database password
  database: 'productdb' // Replace with your database name
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database');
});

module.exports = connection;
