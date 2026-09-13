const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { authenticate, requireAdmin } = require("../middleware/authMiddleware");

// Apply authentication middleware to all product routes
router.use(authenticate);

// GET /api/products
router.get("/", productController.getProducts);

// GET /api/products/suggestions
router.get("/suggestions", productController.getSuggestions);

// POST /api/products
router.post("/", productController.createProduct);

// PUT /api/products/:id
router.put("/:id", productController.updateProduct);

// DELETE /api/products/:id (Admin only)
router.delete("/:id", requireAdmin, productController.deleteProduct);

module.exports = router;