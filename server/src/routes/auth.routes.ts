import express from "express";
import {
  register,
  login,
  getSecurityQuestions,
  resetWithSecurityAnswers,
  checkEmailExists,
  me, // <-- add
} from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth"; // <-- ensure this exists

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// current user
router.get("/me", authMiddleware, me);

// security questions flow
router.get("/security-questions", getSecurityQuestions); // ?email=
router.post("/reset-with-security-answers", resetWithSecurityAnswers);
router.get("/check-email", checkEmailExists);

export default router;