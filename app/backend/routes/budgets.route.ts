import express from "express";
import protect from "../middleware/auth";
import {
  getBudgets,
  postBudget,
  getBudgetById,
  updateBudgetById,
  deleteBudgetById
} from "../controllers/budgets.controller";

const router = express.Router();

router.route("/").get(getBudgets).post(protect, postBudget);
router.route("/:id").get(getBudgetById).put(protect, updateBudgetById).delete(protect, deleteBudgetById);

export default router;