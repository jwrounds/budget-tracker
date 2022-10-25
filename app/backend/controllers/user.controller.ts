import express from "express";
import jsonwebtoken, { JsonWebTokenError } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import User from "../models/user.model";


// @desc    Register new user
// @route   POST api/v1/users
// @access  Public
const registerUser = asyncHandler(async (req: express.Request, res: express.Response) => {
  const { username, password, email } = req.body;

  // Check if required fields present
  if (!username || !password || !email) {
    res.status(400);
    throw new Error("Required field(s) missing! Please fill in all fields and try again.");
  } 

  // Check if user exists
  const userExists = await User.findOne({username, email})

  if (userExists) {
    res.status(400);
    throw new Error("Account already exists!");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({ 
    username: req.body.username,
    password: hashedPassword,
    email: req.body.email
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      username: user.username,
      email: user.email
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data!")
  }
});

// @desc    Login in user
// @route   POST api/v1/users/login
// @access  Public
const loginUser = asyncHandler(async (req: express.Request, res: express.Response) => {
  const { username, password } = req.body;

  // Check if required fields present
  if (!username || !password) {
    res.status(400);
    throw new Error("Required field(s) missing! Please fill in all fields and try again.");
  } 

  // Check if user exists && can authenticate
  const user = await User.findOne({ username });
  const hashedPassword = String(user.password);

  if (user && (await bcrypt.compare(password, hashedPassword))) {
    res.status(201).json({
      _id: user.id,
      username: user.username,
      email: user.email
    });
  } else {
    res.status(400);
    throw new Error("Invalid login credentials!");
  }
});


// @desc    Get user data
// @route   GET api/v1/users/me
// @access  Private
const getCurrentUser = asyncHandler(async (req: express.Request, res: express.Response) => {
  res.json({ message: "User data retrieved!"});
});

export {
  registerUser,
  loginUser,
  getCurrentUser
}