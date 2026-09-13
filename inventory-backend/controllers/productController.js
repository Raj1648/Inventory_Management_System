const productService = require("../services/productService");

const getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 25;
    console.log("getProducts user:", req.user);
    const paginated = await productService.getAllProducts(req.user, page, limit);
    console.log("paginated length:", paginated.data.length);
    
    // Map product_id back to id for frontend compatibility
    const mappedProducts = paginated.data.map(p => ({
      ...p,
      id: p.product_id, // Map product_id to id
      price: p.unit_price, // Map unit_price to price
      stock: p.quantity // Map quantity to stock
    }));
    
    res.json({
      data: mappedProducts,
      metadata: paginated.metadata
    });
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: "Error fetching products", error: err.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const productData = {
      ...req.body,
      unit_price: req.body.unit_price ?? req.body.price ?? 0,
      quantity: req.body.quantity ?? req.body.stock ?? 0,
      name: req.body.name ?? '',
      sku: req.body.sku ?? '',
      description: req.body.description ?? '',
      status: req.body.status ?? 'active',
      category_id: req.body.category_id ?? null
    };
    const productId = await productService.createProduct(productData, req.user.id);
    res.status(201).json({ message: "Product created successfully", productId });
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json({ message: "Error creating product", error: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productData = {
      ...req.body,
      unit_price: req.body.unit_price ?? req.body.price ?? 0,
      quantity: req.body.quantity ?? req.body.stock ?? 0,
      name: req.body.name ?? '',
      sku: req.body.sku ?? '',
      description: req.body.description ?? '',
      status: req.body.status ?? 'active',
      category_id: req.body.category_id ?? null
    };
    const updated = await productService.updateProduct(req.params.id, productData, req.user);
    if (updated) {
      res.json({ message: "Product updated successfully" });
    } else {
      res.status(404).json({ message: "Product not found or unauthorized to update" });
    }
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ message: "Error updating product", error: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    // Only admins can delete, checked by middleware but good practice to ensure
    if (req.user.role !== 'admin') {
       return res.status(403).json({ message: "Forbidden: Admins only" });
    }
    const deleted = await productService.deleteProduct(req.params.id);
    if (deleted) {
      res.json({ message: "Product deleted successfully" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ message: "Error deleting product", error: err.message });
  }
};

const getSuggestions = async (req, res) => {
  try {
    const suggestions = await productService.getSuggestions(req.user);
    
    // Map product_id back to id for frontend compatibility
    const mappedSuggestions = suggestions.map(p => ({
      ...p,
      id: p.product_id, // Map product_id to id
      price: p.unit_price, // Map unit_price to price
      stock: p.quantity // Map quantity to stock
    }));
    
    res.json({
      data: mappedSuggestions
    });
  } catch (err) {
    console.error("Error fetching suggestions:", err);
    res.status(500).json({ message: "Error fetching suggestions", error: err.message });
  }
};

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getSuggestions,
};