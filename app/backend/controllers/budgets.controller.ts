import express from "express";
import asyncHandler from "express-async-handler";

// @desc    Get budgets
// @route   GET api/v1/budgets
// @access  Private
const getBudgets = asyncHandler( async (_req: express.Request, res: express.Response) => {
  res.status(200).json({ message: "Get budgets!"});
});

// @desc    Post budget
// @route   POST api/v1/budgets
// @access  Private
const postBudget = asyncHandler( async (req: express.Request, res: express.Response) => {
  if (Object.keys(req.body).length === 0) {
    res.status(400);
    throw new Error("POST sent without valid request body!");
  }
  res.status(200).json({ message: "Post budget", json: req.body});
});

// @desc    Get budget by its ID
// @route   GET api/v1/budgets/:id
// @access  Private
const getBudgetById = asyncHandler( async (req: express.Request, res: express.Response) => {
  res.status(200).json({ message: `Get budget, id: ${req.params.id}`});
});

// @desc    Update budget by its ID
// @route   PUT api/v1/budgets/:id
// @access  Private
const updateBudgetById = asyncHandler( async (req: express.Request, res: express.Response) => {
  if (Object.keys(req.body).length === 0) {
    res.status(400);
    throw new Error("PUT sent without valid request body!");
  }
  res.status(200).json({ message: `Update budget, id: ${req.params.id}`, json: req.body});
});

// @desc    Delete budget by its ID
// @route   DELETE api/v1/budgets/:id
// @access  Private
const deleteBudgetById = asyncHandler( async (req: express.Request, res: express.Response) => {
  res.status(200).json({ message: `Delete budget, id: ${req.params.id}`});
});

export {
  getBudgets,
  postBudget,
  getBudgetById,
  updateBudgetById,
  deleteBudgetById
}