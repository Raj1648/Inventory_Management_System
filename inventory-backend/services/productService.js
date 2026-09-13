const db = require("../config/db");

const getAllProducts = async (user, page = 1, limit = 25) => {
  const numericPage = Math.max(Number(page) || 1, 1);
  const numericLimit = Math.max(Number(limit) || 25, 1);
  const offset = (numericPage - 1) * numericLimit;
  let countQuery, countParams, dataQuery, dataParams;
  
  if (user.role === 'admin') {
    countQuery = "SELECT COUNT(*) as count FROM product";
    countParams = [];
    dataQuery = `SELECT * FROM product ORDER BY product_id DESC LIMIT ${numericLimit} OFFSET ${offset}`;
    dataParams = [];
  } else {
    countQuery = "SELECT COUNT(*) as count FROM product WHERE vendor_id = ?";
    countParams = [Number(user.id)];
    dataQuery = `SELECT * FROM product WHERE vendor_id = ? ORDER BY product_id DESC LIMIT ${numericLimit} OFFSET ${offset}`;
    dataParams = [Number(user.id)];
  }

  try {
    const [[{ count }]] = await db.execute(countQuery, countParams);
    const [rows] = await db.execute(dataQuery, dataParams);
    return {
      data: rows,
      metadata: {
        totalItems: count,
        totalPages: Math.ceil(count / numericLimit),
        currentPage: numericPage,
        limit: numericLimit
      }
    };
  } catch (err) {
    if (err.code === 'ER_BAD_FIELD_ERROR') {
       return { data: [], metadata: { totalItems: 0, totalPages: 0, currentPage: numericPage, limit: numericLimit } };
    }
    throw err;
  }
};

const createProduct = async (productData, userId) => {
  const { name, sku, description, unit_price, status, category_id, quantity } = productData;
  console.log('createProduct params:', { name, sku, description, unit_price, status, category_id, quantity, userId });
  const [result] = await db.execute(
    `INSERT INTO product 
     (name, sku, description, unit_price, status, category_id, quantity, vendor_id) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [name, sku, description || '', unit_price, status || 'active', category_id || null, quantity || 0, userId]
  );
  return result.insertId;
};

const updateProduct = async (id, productData, user) => {
  const { name, sku, description, unit_price, status, category_id, quantity } = productData;
  
  if (user.role === 'vendor') {
    // Vendor can only update their own
    const [result] = await db.execute(
      `UPDATE product SET 
       name = ?, sku = ?, description = ?, unit_price = ?, status = ?, category_id = ?, quantity = ?
       WHERE product_id = ? AND vendor_id = ?`,
      [name, sku, description || '', unit_price, status || 'active', category_id || null, quantity || 0, id, user.id]
    );
    return result.affectedRows > 0;
  } else {
    // Admin can update any
    console.log('updateProduct admin params:', [name, sku, description || '', unit_price, status || 'active', category_id || null, quantity || 0, id]);
    const [result] = await db.execute(
      `UPDATE product SET 
       name = ?, sku = ?, description = ?, unit_price = ?, status = ?, category_id = ?, quantity = ?
       WHERE product_id = ?`,
      [name, sku, description || '', unit_price, status || 'active', category_id || null, quantity || 0, id]
    );
    return result.affectedRows > 0;
  }
};

const deleteProduct = async (id) => {
  const [result] = await db.execute("DELETE FROM product WHERE product_id = ?", [id]);
  return result.affectedRows > 0;
};

const getSuggestions = async (user) => {
  let query = `
    SELECT * FROM product 
    WHERE created_at < DATE_SUB(NOW(), INTERVAL 6 MONTH)
    AND (
      (unit_price > 100000 AND quantity < 25) OR
      (unit_price >= 50000 AND unit_price <= 100000 AND quantity < 50) OR
      (unit_price < 50000 AND quantity < 75)
    )
  `;
  const params = [];

  if (user.role === 'vendor') {
    query += " AND vendor_id = ?";
    params.push(Number(user.id));
  }

  query += " ORDER BY created_at ASC LIMIT 50";

  try {
    const [rows] = await db.execute(query, params);
    return rows;
  } catch (err) {
    if (err.code === 'ER_BAD_FIELD_ERROR') {
       return [];
    }
    throw err;
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getSuggestions,
};
