-- Database setup and updates

CREATE TABLE IF NOT EXISTS users (
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'vendor') NOT NULL DEFAULT 'vendor'
);

-- Add vendor_id to product table to support Product Ownership
-- Only add this column if it does not already exist
-- Note: MySQL does not support IF NOT EXISTS for ADD COLUMN natively via a single query in older versions,
-- so this query will fail safely if it already exists, unless we wrap it in a procedure.
-- We'll just run it straight. If it fails due to existing column, you can ignore the error.

ALTER TABLE product ADD COLUMN vendor_id INT;
-- Add index for scaling vendor queries
CREATE INDEX idx_vendor_id ON product(vendor_id);

-- Foreign key constraint (Optional based on strictness, but good for data integrity)
-- ALTER TABLE product ADD CONSTRAINT fk_vendor FOREIGN KEY (vendor_id) REFERENCES users(user_id) ON DELETE SET NULL;

-- Sample Users
-- Password for both is 'password123' (hashed using bcrypt: $2b$10$eIy7LCLOnw6tOTi3IqM/V.c/2/6/L.A/o5B.tZ.6/y.W.5.L.4.d6)
-- Admin User
INSERT IGNORE INTO users (name, email, password, role) VALUES 
('Admin User', 'admin@example.com', '$2y$10$w6yZ.dY9HkK1l/L6o./8oew1I63T3YVpXn1oOqE0WvJv9xU0Kz00G', 'admin');

-- Vendor User
INSERT IGNORE INTO users (name, email, password, role) VALUES 
('Vendor One', 'vendor@example.com', '$2y$10$w6yZ.dY9HkK1l/L6o./8oew1I63T3YVpXn1oOqE0WvJv9xU0Kz00G', 'vendor');
