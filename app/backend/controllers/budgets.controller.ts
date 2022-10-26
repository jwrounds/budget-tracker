import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import budgetModel from "../models/budget.model";

// @desc    Get budgets
// @route   GET api/v1/budgets
// @access  Public
const getBudgets = asyncHandler( async (_req: Request, res: Response) => {
  const budgets = await budgetModel.find();
  res.status(200).json(budgets);
});

// @desc    Get budget by its ID
// @route   GET api/v1/budgets/:id
// @access  Public
const getBudgetById = asyncHandler( async (req: Request, res: Response) => {
  const budget = await budgetModel.findById(req.params.id);
  if (!budget) {
    res.status(400);
    throw new Error("Budget not found!");
  }
  res.status(200).json(budget);
});

// @desc    Post budget
// @route   POST api/v1/budgets
// @access  Private
const postBudget = asyncHandler( async (req: Request, res: Response) => {
  const budget = await budgetModel.create(req.body);
  res.status(200).json(budget);
});

// @desc    Update budget by its ID
// @route   PUT api/v1/budgets/:id
// @access  Private
const updateBudgetById = asyncHandler( async (req: Request, res: Response) => {
  const budget = await budgetModel.findById(req.params.id);
  if (!budget) {
    res.status(400);
    throw new Error("Budget not found!");
  }
  const updatedBudget = await budgetModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).json(updatedBudget);
});

// @desc    Delete budget by its ID
// @route   DELETE api/v1/budgets/:id
// @access  Private
const deleteBudgetById = asyncHandler( async (req: Request, res: Response) => {
  const budget = await budgetModel.findById(req.params.id);
  if (!budget) {
    res.status(400);
    throw new Error("Budget not found!");
  }
  await budget.remove();
  res.status(200).json({ message: `Deleted budget: ${req.params.id}`});
});

export {
  getBudgets,
  postBudget,
  getBudgetById,
  updateBudgetById,
  deleteBudgetById
}