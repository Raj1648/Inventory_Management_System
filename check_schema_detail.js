const pool = require('./inventory-backend/config/db');

async function checkSchema() {
  try {
    const [rows] = await pool.query('SHOW CREATE TABLE product');
    console.log('Product Table Schema:', rows[0]['Create Table']);
    const [catRows] = await pool.query('SHOW CREATE TABLE category');
    console.log('Category Table Schema:', catRows[0]['Create Table']);
  } catch (err) {
    console.error('Error checking schema:', err.message);
  } finally {
    process.exit();
  }
}

checkSchema();
