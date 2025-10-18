import dotenv from "dotenv";
import app from "./app";
import { pool } from "./db"; // make sure you have db/index.ts file for PostgreSQL connection

dotenv.config();

const PORT = process.env.PORT || 4000;

// Test PostgreSQL connection first
(async () => {
  try {
    await pool.connect();
    console.log("✅ Connected to PostgreSQL successfully");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to PostgreSQL:", error);
    process.exit(1); // exit if DB connection fails
  }
})();
