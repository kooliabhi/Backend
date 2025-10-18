import express from "express";
import itemsRoutes from "./routes/items.routes";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

app.get("/health", (_, res) => res.json({ ok: true }));
app.use("/api/items", itemsRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

export default app;
