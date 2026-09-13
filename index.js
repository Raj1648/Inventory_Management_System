require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const authRoutes = require('./inventory-backend/routes/authRoutes');
const productRoutes = require('./inventory-backend/routes/productRoutes');
const db = require('./inventory-backend/config/db');

// Verify DB connection immediately upon startup
db.getConnection()
  .then(connection => {
    console.log("Connected to MySQL database successfully!");
    connection.release();
  })
  .catch(err => {
    console.error("Database connection failed during startup:", err.message);
  });

app.use(cors());
app.use(express.json());
app.use((req, res, next) => { console.log("REQ:", req.method, req.url); next(); });
// Main API routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Fallback for old /products route to /api/products
app.use('/products', productRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
