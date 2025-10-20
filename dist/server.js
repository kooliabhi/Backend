"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
const db_1 = require("./db"); // make sure you have db/index.ts file for PostgreSQL connection
dotenv_1.default.config();
const PORT = process.env.PORT || 4000;
// Test PostgreSQL connection first
(async () => {
    try {
        await db_1.pool.connect();
        console.log("✅ Connected to PostgreSQL successfully");
        app_1.default.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error("❌ Failed to connect to PostgreSQL:", error);
        process.exit(1); // exit if DB connection fails
    }
})();
