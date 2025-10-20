"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const items_routes_1 = __importDefault(require("./routes/items.routes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/health", (_, res) => res.json({ ok: true }));
app.use("/api/items", items_routes_1.default);
app.use((req, res) => {
    res.status(404).json({ error: "Not found" });
});
exports.default = app;
