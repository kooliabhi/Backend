"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/scripts/run-init.ts
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const db_1 = require("../db");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
async function run() {
    try {
        const sqlPath = path_1.default.join(__dirname, "..", "..", "sql", "init.sql");
        const sql = fs_1.default.readFileSync(sqlPath, "utf8");
        console.log("Running SQL from:", sqlPath);
        await db_1.pool.query(sql);
        console.log("✅ init.sql executed successfully");
        await db_1.pool.end();
        process.exit(0);
    }
    catch (err) {
        console.error("Failed to run init.sql:", err);
        process.exit(1);
    }
}
run();
