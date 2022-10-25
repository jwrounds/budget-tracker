import express from "express";
import asyncHandler from "express-async-handler";
import userModel from "../models/user.model";


// @desc    Register new user
// @route   POST api/v1/users
// @access  Public
const registerUser = (_req: express.Request, res: express.Response) => {
  res.json({ message: "User registered!"});
}

// @desc    Login in user
// @route   POST api/v1/users/login
// @access  Public
const loginUser = (_req: express.Request, res: express.Response) => {
  res.json({ message: "User logged in!"});
}


// @desc    Get user data
// @route   GET api/v1/users/me
// @access  Private
const getCurrentUser = (_req: express.Request, res: express.Response) => {
  res.json({ message: "User data retrieved!"});
}

export {
  registerUser,
  loginUser,
  getCurrentUser
}