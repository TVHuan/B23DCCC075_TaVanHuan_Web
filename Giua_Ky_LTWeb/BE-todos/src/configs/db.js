//db.js
const mysql = require('mysql2');

// Cấu hình kết nối
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: 'tavanhuan19062005', 
  database: 'todo_db'
});

// Kết nối đến MySQL
db.connect((err) => {
  if (err) {
    console.error('Could not connect to database:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

module.exports = db;
