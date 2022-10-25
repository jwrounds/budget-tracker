import express from "express";
import {
  registerUser,
  loginUser,
  getCurrentUser
} from "../controllers/user.controller";
const router = express.Router();

router.route("/").post(registerUser);
router.route("/login").post(loginUser);
router.route("/me").get(getCurrentUser);

export default router;