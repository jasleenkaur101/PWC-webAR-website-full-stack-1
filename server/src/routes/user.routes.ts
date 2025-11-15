import express from "express";
import { authMiddleware } from "../middleware/auth";
import { getProfile, updateProfile } from "../controllers/user.controller";

const router = express.Router();

router.get("/profile", authMiddleware, getProfile);
router.patch("/profile", authMiddleware, updateProfile);

export default router;
