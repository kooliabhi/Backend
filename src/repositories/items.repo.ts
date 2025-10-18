import pool from "../db";
import { Item } from "../types/item";

export async function createItem(item: Item): Promise<Item> {
  const { name, description } = item;
  const query = `INSERT INTO items (name, description) VALUES ($1, $2) RETURNING *`;
  const values = [name, description ?? null];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

export async function deleteItemById(id: number): Promise<boolean> {
  const { rowCount } = await pool.query(`DELETE FROM items WHERE id=$1`, [id]);
  return rowCount > 0;
}

export async function getItemById(id: number): Promise<Item | null> {
  const { rows } = await pool.query(`SELECT * FROM items WHERE id=$1`, [id]);
  return rows[0] ?? null;
}

export async function listItems(): Promise<Item[]> {
  const { rows } = await pool.query(`SELECT * FROM items ORDER BY id DESC LIMIT 100`);
  return rows;
}
