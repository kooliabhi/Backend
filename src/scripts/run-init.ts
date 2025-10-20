// src/scripts/run-init.ts
import fs from "fs";
import path from "path";
import { pool } from "../db";
import dotenv from "dotenv";
dotenv.config();

async function run() {
  try {
    const sqlPath = path.join(__dirname, "..", "..", "sql", "init.sql");
    const sql = fs.readFileSync(sqlPath, "utf8");
    console.log("Running SQL from:", sqlPath);
    await pool.query(sql);
    console.log("✅ init.sql executed successfully");
    await pool.end();
    process.exit(0);
  } catch (err) {
    console.error("Failed to run init.sql:", err);
    process.exit(1);
  }
}

run();
