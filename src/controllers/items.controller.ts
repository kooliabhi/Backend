import { Request, Response } from "express";
import * as repo from "../repositories/items.repo";
import { Item } from "../types/item";

export async function createItemHandler(req: Request, res: Response) {
  try {
    const body = req.body as Partial<Item>;
    if (!body.name) return res.status(400).json({ error: "name is required" });
    const item = await repo.createItem({ name: body.name, description: body.description });
    res.status(201).json(item);
  } catch (err) {
    console.error("createItem error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function deleteItemHandler(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id) || id <= 0) return res.status(400).json({ error: "Invalid id" });
    const deleted = await repo.deleteItemById(id);
    if (!deleted) return res.status(404).json({ error: "Item not found" });
    res.status(204).send();
  } catch (err) {
    console.error("deleteItem error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getItemHandler(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const item = await repo.getItemById(id);
    if (!item) return res.status(404).json({ error: "Item not found" });
    res.json(item);
  } catch (err) {
    console.error("getItem error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function listItemsHandler(req: Request, res: Response) {
  try {
    const items = await repo.listItems();
    res.json(items);
  } catch (err) {
    console.error("listItems error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}
