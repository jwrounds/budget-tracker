import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Budget from "../models/budget.model";
import User from "../models/user.model";
import{ Document }from "mongoose";

// @desc    Get budgets
// @route   GET api/v1/budgets
// @access  Public
const getBudgets = asyncHandler( async (_req: Request, res: Response) => {
  const budgets = await Budget.find();
  res.status(200).json(budgets);
});

// @desc    Get budget by its ID
// @route   GET api/v1/budgets/:id
// @access  Public
const getBudgetById = asyncHandler( async (req: Request, res: Response) => {
  const budget = await Budget.findById(req.params.id);
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
  const user = await User.findById(req.user.id);
  const budget = await Budget.create({
    user: user.id,
    budgetInterval: req.body.budgetInterval,
    persons: req.body.persons,
    totalBudget: req.body.totalBudget,
    expenses: req.body.expenses
  });

  res.status(200).json(budget);
  user.budgets.push(budget.id);
  user.save();
});

// @desc    Update budget by its ID
// @route   PUT api/v1/budgets/:id
// @access  Private
const updateBudgetById = asyncHandler( async (req: Request, res: Response) => {
  const user = await User.findById(req.user._id);
  const budget = await Budget.findById(req.params.id);
  if (!budget) {
    res.status(400);
    throw new Error("Budget not found!");
  }

  // Check if user owns budget before updating
  if (userOwnsBudget(user.budgets, budget)) {

    const updatedBudget = await Budget.findByIdAndUpdate(req.params.id, {
      user: req.user.id,
      budget_interval: req.body.budget_interval,
      persons: req.body.persons,
      totalBudget: req.body.totalBudget,
      expenses: req.body.expenses
    }, { new: true });
    res.status(200).json(updatedBudget);

  } else {
    throw new Error("You do not own this budget! Cannot modify.");
  }
});

// @desc    Delete budget by its ID
// @route   DELETE api/v1/budgets/:id
// @access  Private
const deleteBudgetById = asyncHandler( async (req: Request, res: Response) => {
  const user = await User.findById(req.user._id);
  const budget = await Budget.findById(req.params.id);
  if (!budget) {
    res.status(400);
    throw new Error("Budget not found!");
  }

  // Check if user owns budget before deleting
  if (userOwnsBudget(user.budgets, budget)) {

    await budget.remove();
    res.status(200).json({ message: `Deleted budget: ${req.params.id}`});

    // Remove budget from user's "User.budgets" array
    const userBudgetId = findBudgetObjectId(user.budgets, budget);
    const budgetIndex = user.budgets.indexOf(userBudgetId);
    user.budgets.splice(budgetIndex, 1);
    user.save();

  } else {
    throw new Error("You do not own this budget! Cannot delete.");
  }
});

const userOwnsBudget = (userBudgets: any[], budget: Document): boolean => {
  let usersBudgetId = findBudgetObjectId(userBudgets, budget).valueOf();
  return usersBudgetId === budget.id ? true : false;
}

const findBudgetObjectId = (userBudgets: any[], budget: Document): Document => {
  return userBudgets.find(b => b.valueOf() === budget.id);
}

export {
  getBudgets,
  postBudget,
  getBudgetById,
  updateBudgetById,
  deleteBudgetById
}