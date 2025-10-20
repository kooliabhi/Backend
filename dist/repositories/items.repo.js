"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createItem = createItem;
exports.deleteItemById = deleteItemById;
exports.getItemById = getItemById;
exports.listItems = listItems;
const db_1 = __importDefault(require("../db"));
async function createItem(item) {
    const { name, description } = item;
    const query = `INSERT INTO items (name, description) VALUES ($1, $2) RETURNING *`;
    const values = [name, description ?? null];
    const { rows } = await db_1.default.query(query, values);
    return rows[0];
}
async function deleteItemById(id) {
    const { rowCount } = await db_1.default.query(`DELETE FROM items WHERE id=$1`, [id]);
    return rowCount > 0;
}
async function getItemById(id) {
    const { rows } = await db_1.default.query(`SELECT * FROM items WHERE id=$1`, [id]);
    return rows[0] ?? null;
}
async function listItems() {
    const { rows } = await db_1.default.query(`SELECT * FROM items ORDER BY id DESC LIMIT 100`);
    return rows;
}
