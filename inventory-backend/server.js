const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

app.use(cors());
app.use(express.json());

// DB connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "toor",
  database: "inventory_system",
});

// connect
db.connect((err) => {
  if (err) {
    console.error("DB connection failed:", err);
  } else {
    console.log("Connected to MySQL");
  }
});

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("API is running...");
});

// GET PRODUCTS
app.get("/products", (req, res) => {
  db.query("SELECT * FROM product", (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(result);
    }
  });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});