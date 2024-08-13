const mysql = require("mysql2");

const db = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "lyl1019lyl",
  database: "my-app",
});

module.exports = db;
