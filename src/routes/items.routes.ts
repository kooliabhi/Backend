import { Router } from "express";
import { createItemHandler, deleteItemHandler, getItemHandler, listItemsHandler } from "../controllers/items.controller";

const router = Router();
router.post("/", createItemHandler);
router.get("/", listItemsHandler);
router.get("/:id", getItemHandler);
router.delete("/:id", deleteItemHandler);
export default router;
