import { Router } from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import experienceRoutes from "./experience.routes";
import itemsRoutes from "./items.routes";

export const router = Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/experience", experienceRoutes);
router.use("/items", itemsRoutes);

router.get("/health", (_req, res) => res.json({ ok: true }));
