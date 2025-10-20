"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
// src/db/index.ts
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function getPoolConfig() {
    const databaseUrl = process.env.DATABASE_URL;
    if (databaseUrl) {
        // If provider requires SSL (Render/Postgres cloud), the URL often works,
        // but explicit ssl with rejectUnauthorized false helps in many PaaS setups.
        return {
            connectionString: databaseUrl,
            ssl: { rejectUnauthorized: false } // keep false for PaaS convenience
        };
    }
    return {
        host: process.env.DB_HOST || "localhost",
        port: Number(process.env.DB_PORT || 5432),
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    };
}
exports.pool = new pg_1.Pool(getPoolConfig());
exports.pool.on("error", (err) => {
    console.error("Unexpected PG client error", err);
    process.exit(-1);
});
exports.default = exports.pool;
