const mysql = require("mysql2/promise");

async function test(password) {
  try {
    const pool = mysql.createPool({
      host: "localhost",
      user: "root",
      password: password,
      database: "inventory_system",
    });
    const connection = await pool.getConnection();
    console.log("Success with password:", password === "" ? "(empty)" : password);
    connection.release();
    process.exit(0);
  } catch (e) {
    console.log("Failed with password:", password === "" ? "(empty)" : password, e.message);
  }
}

async function run() {
  await test("");
  await test("root");
  await test("toor");
  await test("password");
  process.exit(1);
}

run();
