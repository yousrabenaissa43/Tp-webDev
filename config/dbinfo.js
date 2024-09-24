// Database configuration
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'quotesdb'
});

db.connect((error) => {
  if (error) {
    console.error('Database connection error:', error);
  } else {
    console.log('Connected to the database');
  }
});

module.exports = db;