// server/src/routes/experience.routes.ts
import express from "express";
import { getExperience } from "../controllers/experience.controller";

const router = express.Router();

router.get("/:experienceId", getExperience);

export default router;
