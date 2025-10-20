// src/db/index.ts
import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

function getPoolConfig() {
  const databaseUrl = process.env.DATABASE_URL;
  if (databaseUrl) {
    // If provider requires SSL (Render/Postgres cloud), the URL often works,
    // but explicit ssl with rejectUnauthorized false helps in many PaaS setups.
    return {
      connectionString: databaseUrl,
      ssl: { rejectUnauthorized: false as boolean } // keep false for PaaS convenience
    } as any;
  }

  return {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT || 5432),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  };
}

export const pool = new Pool(getPoolConfig());

pool.on("error", (err) => {
  console.error("Unexpected PG client error", err);
  process.exit(-1);
});

export default pool;
