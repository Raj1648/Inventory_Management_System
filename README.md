# 📦 Inventory Management System

### Full-Stack Inventory Management Platform

A modern **full-stack Inventory Management System** designed to help businesses manage products, vendors, users, inventory information, and product ownership through a centralized web application.

The system follows a separate **frontend + backend + database architecture**, using REST APIs to connect the user interface with a MySQL database.

---

## 🚀 Project Overview

Managing inventory manually can lead to problems such as:

- Incorrect stock records
- Difficult product management
- Poor vendor organization
- Unauthorized access
- Data duplication
- Difficult inventory tracking

This project provides a centralized platform where administrators and vendors can securely manage inventory-related information.

### Architecture

```text
┌─────────────────────────┐
│      Frontend UI        │
│   inventory-frontend    │
└────────────┬────────────┘
             │
             │ HTTP / REST API
             ▼
┌─────────────────────────┐
│      Node.js Server     │
│       Express.js        │
│   inventory-backend     │
└────────────┬────────────┘
             │
             │ MySQL Queries
             ▼
┌─────────────────────────┐
│      MySQL Database     │
│       Inventory DB      │
└─────────────────────────┘
```

---

# ✨ Key Features

## 🔐 Authentication & Authorization

The system supports user authentication with different roles.

### Available Roles

- **Admin**
- **Vendor**

The database schema defines these roles directly:

```text
admin
vendor
```

This allows the application to provide role-specific access to inventory functionality.

---

## 👨‍💼 Admin Management

Administrators can manage inventory-related information and users.

Typical administrative capabilities include:

- User management
- Product management
- Vendor management
- Inventory oversight
- Access control
- Product ownership management

---

## 🏪 Vendor Management

Vendors can manage their inventory-related information and products associated with them.

The database includes a `vendor_id` field for products, allowing products to be associated with specific vendors.

---

# 📦 Product Management

The backend provides dedicated product API routes.

The main product API is:

```text
/api/products
```

There is also a compatibility route:

```text
/products
```

Both are connected to the product route handler in the Express server.

Product management can be used for operations such as:

- Adding products
- Viewing products
- Updating products
- Deleting products
- Managing product ownership
- Searching/filtering inventory

---

# 🔑 Authentication API

Authentication routes are exposed through:

```text
/api/auth
```

The Express server connects these routes to the authentication controller/router.

The authentication layer is designed to separate authorized users based on their role.

---

# 🗄️ Database

The application uses **MySQL** as its primary database.

The repository includes:

```text
database.sql
```

which contains database-related setup and updates.

### User Table

The database contains a `users` table with fields including:

| Column | Description |
|---|---|
| `user_id` | Primary key |
| `name` | User name |
| `email` | Unique email |
| `password` | Hashed password |
| `role` | Admin or Vendor |

The `email` field is unique and the role defaults to `vendor`.

---

# 🔗 Product Ownership

The system supports product ownership by vendors.

A `vendor_id` column is added to the product table:

```sql
ALTER TABLE product ADD COLUMN vendor_id INT;
```

An index is also created for vendor-based queries:

```sql
CREATE INDEX idx_vendor_id ON product(vendor_id);
```

This structure makes it possible to associate products with individual vendors and improve vendor-specific queries.

---

# 🛠️ Technology Stack

## Frontend

The project contains a dedicated:

```text
inventory-frontend/
```

directory for the user interface.

The frontend communicates with the backend through HTTP/REST APIs.

---

## Backend

The project contains:

```text
inventory-backend/
```

The backend is built around:

- Node.js
- Express.js
- REST APIs
- CORS
- MySQL
- Environment variables

The main server uses Express and configures CORS and JSON request handling.

---

## Database

```text
MySQL
```

The application establishes a MySQL connection when the backend starts.

---

# 📁 Project Structure

```text
Inventory_Management_System/
│
├── inventory-backend/
│   ├── config/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── other backend modules
│
├── inventory-frontend/
│   └── Frontend application
│
├── database.sql
│
├── index.js
│
├── check_schema_detail.js
├── fix_td.js
├── test-curl.js
├── test-db.js
├── test-port.js
├── update_col.js
├── wrapper.js
├── wrapper-start.js
│
├── backend-3.txt
├── backend-start-error.txt
├── response.html
│
├── Project_Report_Inventory_Management_System.docx
├── Inventory_Management_System_Project_Report.docx
├── Project_Report_NexusInventory.txt
│
└── .gitignore
```

The repository currently has separate `inventory-backend` and `inventory-frontend` directories and includes SQL/database and development utility files.

---

# 🔄 Application Flow

```text
User
  │
  ▼
Frontend
  │
  │ HTTP Request
  ▼
Express Server
  │
  ├── /api/auth
  │
  └── /api/products
  │
  ▼
Backend Logic
  │
  ▼
MySQL Database
  │
  ▼
Response
  │
  ▼
Frontend UI
```

The main `index.js` server configures the API routes and starts the application on the environment-defined port or port `5000` by default.

---

# ⚙️ Backend Configuration

The backend uses environment variables through:

```javascript
require('dotenv').config();
```

This allows sensitive configuration such as database credentials and runtime settings to remain outside the source code.

Create a `.env` file for your local environment.

Example:

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=inventory_management
DB_PORT=3306
```

> Do not commit your real database password or other secrets to GitHub.

---

# 💻 Installation

## 1. Clone the Repository

```bash
git clone https://github.com/Raj1648/Inventory_Management_System.git
```

Navigate into the project:

```bash
cd Inventory_Management_System
```

---

# 🗄️ 2. Configure MySQL

Install and start MySQL.

Create the database:

```sql
CREATE DATABASE inventory_management;
```

Then import the provided SQL file:

```bash
mysql -u root -p inventory_management < database.sql
```

Alternatively, open `database.sql` in MySQL Workbench and execute it.

---

# 🔧 3. Configure Backend

Navigate to the backend:

```bash
cd inventory-backend
```

Install dependencies:

```bash
npm install
```

Create your `.env` configuration.

Example:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=inventory_management
DB_PORT=3306
```

---

# ▶️ 4. Start Backend

From the project/backend directory, run the backend using the project's configured Node.js start command.

If using the root server entry point:

```bash
node index.js
```

The application defaults to:

```text
http://localhost:5000
```

when `PORT` is not provided through the environment.

When the database connection succeeds, the server reports:

```text
Connected to MySQL database successfully!
```

The server also logs incoming requests for development/debugging purposes.

---

# 🎨 5. Start Frontend

Navigate to the frontend:

```bash
cd inventory-frontend
```

Install dependencies:

```bash
npm install
```

Start the frontend using the project's configured development command.

For a typical frontend setup:

```bash
npm run dev
```

or:

```bash
npm start
```

Use the command defined in the frontend's package configuration.

---

# 🔌 API Structure

## Authentication

```text
/api/auth
```

Used for authentication-related operations.

---

## Products

```text
/api/products
```

Used for product/inventory operations.

---

## Legacy Product Route

```text
/products
```

The backend also maps this route to the product router for compatibility.

---

# 🧪 Testing & Development Utilities

The repository contains several JavaScript utilities for development and troubleshooting.

### Database Testing

```text
test-db.js
```

Used for database-related testing.

### Port Testing

```text
test-port.js
```

Used for checking server/port availability.

### API Testing

```text
test-curl.js
```

Used for testing API requests.

### Schema Inspection

```text
check_schema_detail.js
```

Used to inspect database/schema information.

### Column Update Utility

```text
update_col.js
```

Used during database/schema modifications.

These files are useful during development and debugging.

---

# 🔐 Security Considerations

The project uses hashed passwords in its database setup rather than storing plain-text passwords. The SQL file contains sample users with bcrypt-style password hashes.

For production deployment:

- Use strong passwords.
- Store credentials in environment variables.
- Never commit `.env`.
- Use HTTPS.
- Validate all user input.
- Use proper authentication middleware.
- Restrict admin-only operations.
- Use database constraints and foreign keys.
- Remove development/debug logging.
- Replace sample credentials before deployment.

---

# 📊 Database Design

The current database design supports:

```text
Users
  │
  ├── Admin
  │
  └── Vendor
        │
        ▼
      Products
```

Conceptually:

```text
┌──────────────┐
│    USERS     │
├──────────────┤
│ user_id PK   │
│ name         │
│ email        │
│ password     │
│ role         │
└──────┬───────┘
       │
       │ vendor_id
       ▼
┌──────────────┐
│   PRODUCT    │
├──────────────┤
│ product_id   │
│ ...          │
│ vendor_id FK │
└──────────────┘
```

The repository's SQL setup specifically introduces the vendor-product relationship through `vendor_id`.

---

# 🌟 Core Benefits

### For Administrators

- Centralized inventory control
- User/vendor management
- Product oversight
- Database-backed inventory information
- Role-based access structure

### For Vendors

- Product ownership
- Inventory management
- Product information management
- Vendor-specific inventory queries

---

# 📈 Future Enhancements

The system can be extended with:

- [ ] Real-time stock tracking
- [ ] Low-stock alerts
- [ ] Purchase order management
- [ ] Sales management
- [ ] Supplier management
- [ ] Customer management
- [ ] Invoice generation
- [ ] Barcode/QR-code scanning
- [ ] Inventory analytics dashboard
- [ ] Sales forecasting
- [ ] AI-powered demand forecasting
- [ ] Product recommendations
- [ ] Email/SMS notifications
- [ ] Multi-warehouse support
- [ ] Audit logs
- [ ] Advanced role-based permissions
- [ ] Cloud deployment
- [ ] Docker support
- [ ] CI/CD pipeline

---

# 🤖 Future AI Integration

The system can be upgraded into an **AI-powered inventory platform**.

### AI Demand Forecasting

```text
Historical Sales
      ↓
Data Preprocessing
      ↓
Time-Series Model
      ↓
Demand Forecast
      ↓
Recommended Stock Level
```

### Intelligent Stock Alerts

```text
Current Inventory
       +
Historical Demand
       +
Predicted Demand
       ↓
AI Risk Analysis
       ↓
Stock Alert
```

### Example

```text
Product: Wireless Mouse

Current Stock: 15
Average Weekly Sales: 25
Predicted Demand: 32

AI Recommendation:
Restock approximately 20 units.
```

---

# 🧠 Possible GenAI Extension

A future version could include an AI inventory assistant.

Example user query:

> "Which products are likely to run out of stock next week?"

The system could combine:

```text
User Question
      ↓
LLM
      ↓
Inventory Database
      ↓
SQL / Analytics
      ↓
Demand Forecasting
      ↓
LLM Explanation
      ↓
Business Recommendation
```

Another example:

> "Show me the products with decreasing sales and high inventory."

The AI assistant could query the database and return an understandable business report.

---

# 📊 Example Use Cases

This system can be adapted for:

- Retail stores
- Small businesses
- Warehouses
- Electronic stores
- Grocery businesses
- Clothing stores
- College inventory
- Office inventory
- Supplier management
- E-commerce inventory

---

# 🎓 Academic Concepts Demonstrated

This project demonstrates concepts from:

### Database Management Systems

- MySQL
- Relational databases
- SQL
- Primary keys
- Foreign keys
- Indexing
- Database relationships

### Web Development

- Frontend development
- Backend development
- REST APIs
- HTTP communication
- JSON
- CORS

### Software Engineering

- Client-server architecture
- Modular backend
- Authentication
- Role-based access
- Environment configuration
- Testing/debugging

---

# 📌 Project Highlights

```text
Full-Stack Application
        +
REST API
        +
MySQL Database
        +
Authentication
        +
Admin/Vendor Roles
        +
Product Management
        +
Vendor Product Ownership
```

---

# 📸 Screenshots

Add your application screenshots here:

```markdown
## Dashboard

![Dashboard](screenshots/dashboard.png)

## Login

![Login](screenshots/login.png)

## Product Management

![Products](screenshots/products.png)
```

Create a `screenshots/` folder and place your screenshots inside it.

---

# 🚀 Roadmap

### Phase 1 — Core System

- Authentication
- Admin/Vendor roles
- Product management
- MySQL integration

### Phase 2 — Inventory Intelligence

- Stock monitoring
- Low-stock alerts
- Inventory analytics
- Sales reports

### Phase 3 — AI

- Demand forecasting
- Stock optimization
- AI inventory assistant
- Anomaly detection

### Phase 4 — Production

- Docker
- Cloud deployment
- CI/CD
- Monitoring
- Automated testing

---

# 👨‍💻 Author

**Raj1648**

GitHub:

https://github.com/Raj1648

Repository:

https://github.com/Raj1648/Inventory_Management_System

---

# 📜 Project Status

**Status:** Active Development

The repository currently contains the full-stack project structure with separate backend and frontend applications, MySQL database setup, API routes, development/testing utilities, and project documentation.

---

# ⭐ Conclusion

The **Inventory Management System** provides a full-stack foundation for managing products and vendors through a centralized web application.

Its architecture separates:

```text
Frontend
    ↓
REST API
    ↓
Backend
    ↓
MySQL
```

This structure makes the application easier to maintain and provides a foundation for adding advanced capabilities such as **real-time inventory analytics, demand forecasting, automated stock alerts, and Generative AI**.

---

## 🔗 Repository

[Inventory Management System](https://github.com/Raj1648/Inventory_Management_System)
