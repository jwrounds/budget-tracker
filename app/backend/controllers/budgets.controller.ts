import express from "express";

const getBudgets = (_req: express.Request, res: express.Response): void => {
  res.status(200).json({ message: "Get budgets!"});
};

const postBudget = (req: express.Request, res: express.Response): void => {
  if (Object.keys(req.body).length === 0) {
    res.status(400);
    throw new Error("POST sent without valid request body!");
  }
  res.status(200).json({ message: "Post budget", json: req.body});
};

const getBudgetById = (req: express.Request, res: express.Response): void => {
  res.status(200).json({ message: `Get budget, id: ${req.params.id}`});
};

const updateBudgetById = (req: express.Request, res: express.Response): void => {
  if (Object.keys(req.body).length === 0) {
    res.status(400);
    throw new Error("PUT sent without valid request body!");
  }
  res.status(200).json({ message: `Update budget, id: ${req.params.id}`, json: req.body});
};

const deleteBudgetById = (req: express.Request, res: express.Response): void => {
  res.status(200).json({ message: `Delete budget, id: ${req.params.id}`});
};

export {
  getBudgets,
  postBudget,
  getBudgetById,
  updateBudgetById,
  deleteBudgetById
}