import express from "express";
import {
  getBudgets,
  postBudget,
  getBudgetById,
  updateBudgetById,
  deleteBudgetById
} from "../controllers/budgets.controller";

const router = express.Router();

router.route("/").get(getBudgets).post(postBudget);
router.route("/:id").get(getBudgetById).put(updateBudgetById).delete(deleteBudgetById);

export default router;