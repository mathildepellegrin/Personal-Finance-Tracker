//mysql connection

const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",        // your MySQL username
  password: "",        // your MySQL password
  database: "finance_tracker"
});

db.connect(err => {
  if (err) {
    console.error("MySQL connection failed:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

module.exports = db;