import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Access denied. Token not provided" });
    return;
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    res.status(500).json({ message: "Server error. JWT secret not found" });
    return;
  }

  try {
    const check = jwt.verify(token, secret) as { userId: string };
    req.user = check;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token." });
    return;
  }
}
