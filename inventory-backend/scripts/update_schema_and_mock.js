const db = require('../config/db');

async function run() {
  try {
    console.log("Checking if created_at column exists...");
    const [columns] = await db.execute("SHOW COLUMNS FROM product LIKE 'created_at'");
    
    if (columns.length === 0) {
      console.log("Adding created_at column...");
      await db.execute("ALTER TABLE product ADD COLUMN created_at DATETIME DEFAULT CURRENT_TIMESTAMP");
      console.log("Column added successfully.");
    } else {
      console.log("Column already exists.");
    }

    console.log("Mocking dates for some products to be older than 6 months...");
    
    // Condition 1: unit_price > 100000, qty < 25
    await db.execute(`
      UPDATE product 
      SET created_at = DATE_SUB(NOW(), INTERVAL 7 MONTH) 
      WHERE unit_price > 100000 AND quantity < 25 
      LIMIT 10
    `);
    
    // Condition 2: unit_price >= 50000 AND unit_price <= 100000, qty < 50
    await db.execute(`
      UPDATE product 
      SET created_at = DATE_SUB(NOW(), INTERVAL 8 MONTH) 
      WHERE unit_price >= 50000 AND unit_price <= 100000 AND quantity < 50 
      LIMIT 10
    `);

    // Condition 3: unit_price < 50000, qty < 75
    await db.execute(`
      UPDATE product 
      SET created_at = DATE_SUB(NOW(), INTERVAL 9 MONTH) 
      WHERE unit_price < 50000 AND quantity < 75 
      LIMIT 10
    `);
    
    console.log("Mock data updated successfully.");
    
  } catch (error) {
    console.error("Error updating database:", error);
  } finally {
    process.exit();
  }
}

run();
