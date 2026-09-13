require('dotenv').config({ path: '../.env' });
const pool = require('../config/db');
const { faker } = require('@faker-js/faker');
const fs = require('fs');
const path = require('path');

const BATCH_SIZE = 5000;
const TOTAL_RECORDS = 250000;

async function seedData() {
  console.log('Starting Amazon data seeding...');
  
  let amazonData = null;
  const amazonDataPath = path.join(__dirname, '../../amazon_titles.json');
  if (fs.existsSync(amazonDataPath)) {
    console.log('Loading Amazon dataset...');
    amazonData = JSON.parse(fs.readFileSync(amazonDataPath, 'utf8'));
    console.log(`Loaded ${amazonData.titles.length} products from Amazon dataset.`);
  } else {
    console.error('Amazon dataset JSON not found. Please run the extraction script first.');
    process.exit(1);
  }

  try {
    // 1. Clear existing data
    console.log('Cleaning up old data...');
    await pool.query('SET FOREIGN_KEY_CHECKS = 0');
    await pool.query('TRUNCATE TABLE product');
    await pool.query('TRUNCATE TABLE category');
    await pool.query('SET FOREIGN_KEY_CHECKS = 1');
    console.log('Old data cleared.');

    // 2. Prepare Categories
    console.log('Extracting categories from Amazon data...');
    const categories = new Set();
    Object.values(amazonData.title_to_data).forEach(d => {
      if (d.category) categories.add(d.category);
    });
    
    for (const cat of categories) {
      await pool.query('INSERT INTO category (name) VALUES (?)', [cat.substring(0, 255)]);
    }
    
    const [catRows] = await pool.query('SELECT category_id, name FROM category');
    const categoryMap = {};
    catRows.forEach(row => {
      categoryMap[row.name] = row.category_id;
    });

    // 3. Get Vendors
    const [users] = await pool.query('SELECT user_id, role FROM users');
    const vendorIds = users.filter(u => u.role === 'vendor').map(u => u.user_id);
    
    if (vendorIds.length === 0) {
      console.error('No vendors found. Run database.sql first.');
      process.exit(1);
    }

    // 4. Generate Products
    let totalInserted = 0;
    const titleKeys = amazonData.titles;

    for (let i = 0; i < TOTAL_RECORDS; i += BATCH_SIZE) {
      const batch = [];
      for (let j = 0; j < BATCH_SIZE && (i + j) < TOTAL_RECORDS; j++) {
        const randomIndex = Math.floor(Math.random() * titleKeys.length);
        const originalTitle = titleKeys[randomIndex];
        const productData = amazonData.title_to_data[originalTitle];
        
        const name = originalTitle.substring(0, 255);
        const catName = (productData.category || "General").substring(0, 255);
        const catId = categoryMap[catName];
        
        // Use real price, fallback to random if 0
        let unit_price = productData.price;
        if (!unit_price || unit_price <= 0) {
          unit_price = faker.number.float({ min: 10, max: 2000, fractionDigits: 2 });
        }
        
        const vendorId = vendorIds[Math.floor(Math.random() * vendorIds.length)];
        const sku = `AMZN-${faker.string.alphanumeric({ length: 8, casing: 'upper' })}`;
        const description = `Authentic product from Amazon's ${catName} category. Original title: ${name}`;
        const quantity = faker.number.int({ min: 1, max: 1000 });

        batch.push([name, sku, description, unit_price, 'active', catId, quantity, vendorId]);
      }

      await pool.query(
        `INSERT INTO product (name, sku, description, unit_price, status, category_id, quantity, vendor_id) VALUES ?`,
        [batch]
      );
      totalInserted += batch.length;
      console.log(`Inserted ${totalInserted} / ${TOTAL_RECORDS} products...`);
    }

    console.log('Seeding completed successfully with 2.5 Lakh Amazon records including real prices!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err.message);
    process.exit(1);
  }
}

seedData();
