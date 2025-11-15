import { Router } from "express";
import {
  createItem,
  listItems,
  updateItem,
  deleteItem,
} from "../controllers/items.controller";
import { authMiddleware as requireAuth } from "../middleware/auth";

const r = Router();

r.get("/", requireAuth, listItems);
r.post("/", requireAuth, createItem);
r.put("/:id", requireAuth, updateItem);
r.delete("/:id", requireAuth, deleteItem);

export default r;
