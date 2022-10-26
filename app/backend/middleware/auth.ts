import { Request, Response, NextFunction } from "express";
import jsonwebtoken from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/user.model";

interface JwtPayload {
  id: string
}

const protect = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  let token: string;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Extract token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET) as JwtPayload;

      // Get user from token
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch {
      res.status(401);
      throw new Error("Not authorized!");
    }
  } 

  if (!token) {
    res.status(401);
    throw new Error("Not authorized! No Token!");
  }
});

export default protect;