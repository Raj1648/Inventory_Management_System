const authService = require("./services/authService");

async function run() {
  try {
    const user = await authService.findUserByEmail("admin@example.com");
    console.log("Found:", user);
  } catch (err) {
    console.error("Error:", err);
  }
}
run();
