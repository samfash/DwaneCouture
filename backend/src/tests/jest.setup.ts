process.env.NODE_ENV = "test"; // ✅ Ensure test mode is enabled
import dotenv from "dotenv";
import pool from "../core/database";


// Load test environment variables
dotenv.config({ path: ".env.test" });

// // Mock bcrypt for faster password hashing in tests
jest.mock("bcryptjs", () => ({
  hash: jest.fn((password) => Promise.resolve(`hashed-${password}`)),
  compare: jest.fn((password, hashedPassword) => Promise.resolve(hashedPassword === `hashed-${password}`)),
  genSalt: jest.fn(() => Promise.resolve("mocked-salt")),
}));



beforeAll(async () => {
  await pool.query("DELETE FROM users;");
});

// afterEach(async () => {
//   // console.log("🔄 Resetting tables after each test...");
//   try {
//     await pool.query("TRUNCATE TABLE users RESTART IDENTITY CASCADE;");
//   } catch (error) {
//     console.error("❌ Error truncating table:", error);
//   }
// });

// Close DB connection after tests
afterAll(async () => {
  // console.log("🛑 Closing PostgreSQL Connection...");

  try {
    await pool.end();
    console.log("✅ PostgreSQL Connection Closed.");
  } catch (error) {
    console.error("❌ Error closing database:", error);
  }

}, 10000);
