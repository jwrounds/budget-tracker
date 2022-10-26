import express from "express";
import protect from "../middleware/auth";
import {
  registerUser,
  loginUser,
  getCurrentUser
} from "../controllers/user.controller";

const router = express.Router();

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getCurrentUser);

export default router;