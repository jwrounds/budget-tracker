import { Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import User from "../models/user.model";


// @desc    Register new user
// @route   POST api/v1/users
// @access  Public
const registerUser = asyncHandler(async (req: Request, res: Response) => {
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

  // If user is valid, send response and save JWT
  if (user) {

    // Generate token and set token to expire in one week
    const token: string = generateToken(user.id);
    const expirationDate: Date = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7);
    
    // Send response with token as httpOnly cookie
    res.status(201).cookie("access_token", token, {
      expires: expirationDate,
      httpOnly: true,
    }).json({
      _id: user.id,
      username: user.username,
      email: user.email,
      token: token
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data!");
  }
});

// @desc    Login in user
// @route   POST api/v1/users/login
// @access  Public
const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Check if required fields present
  if (!username || !password) {
    res.status(400);
    throw new Error("Required field(s) missing! Please fill in all fields and try again.");
  } 

  // Check if user exists && can authenticate
  const user = await User.findOne({ username });
  const hashedPassword = String(user.password);

  // If user credentials valid, save JWT
  if (user && (await bcrypt.compare(password, hashedPassword))) {

      // Generate token and set token to expire in one week
      const token: string = generateToken(user.id);
      const expirationDate: Date = new Date();
      expirationDate.setDate(expirationDate.getDate() + 7);

      // Send response with token as httpOnly cookie
      res.status(201).cookie("access_token", token, {
        expires: expirationDate,
        httpOnly: true,
      }).json({
        _id: user.id,
        username: user.username,
        email: user.email,
        token: token
      });
  } else {
    res.status(400);
    throw new Error("Invalid login credentials!");
  }
});


// @desc    Get user data
// @route   GET api/v1/users/me
// @access  Private
const getCurrentUser = asyncHandler(async (req: Request, res: Response) => {
  const {_id, username, email, budgets, favorites } = await User.findById(req.user.id);

  res.status(200).json({ 
    _id: _id,
    username: username,
    email: email,
    budgets: budgets,
    favorites: favorites
  });
});

// Generate JWT

const generateToken = (id: string): string => {
  return jsonwebtoken.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
}

export {
  registerUser,
  loginUser,
  getCurrentUser
}