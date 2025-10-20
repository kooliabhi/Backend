"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.createItemHandler = createItemHandler;
exports.deleteItemHandler = deleteItemHandler;
exports.getItemHandler = getItemHandler;
exports.listItemsHandler = listItemsHandler;
const repo = __importStar(require("../repositories/items.repo"));
async function createItemHandler(req, res) {
    try {
        const body = req.body;
        if (!body.name)
            return res.status(400).json({ error: "name is required" });
        const item = await repo.createItem({ name: body.name, description: body.description });
        res.status(201).json(item);
    }
    catch (err) {
        console.error("createItem error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
}
async function deleteItemHandler(req, res) {
    try {
        const id = Number(req.params.id);
        if (Number.isNaN(id) || id <= 0)
            return res.status(400).json({ error: "Invalid id" });
        const deleted = await repo.deleteItemById(id);
        if (!deleted)
            return res.status(404).json({ error: "Item not found" });
        res.status(204).send();
    }
    catch (err) {
        console.error("deleteItem error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
}
async function getItemHandler(req, res) {
    try {
        const id = Number(req.params.id);
        const item = await repo.getItemById(id);
        if (!item)
            return res.status(404).json({ error: "Item not found" });
        res.json(item);
    }
    catch (err) {
        console.error("getItem error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
}
async function listItemsHandler(req, res) {
    try {
        const items = await repo.listItems();
        res.json(items);
    }
    catch (err) {
        console.error("listItems error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
}
