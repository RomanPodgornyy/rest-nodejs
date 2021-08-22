const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'roman',
  password: 'rootroot',
  database: 'test-db',
});

module.exports = db;
