// src/core/middleware.ts
import cors from "cors";
import helmet from "helmet";
import express, { Request, Response, NextFunction } from "express";
import rateLimit from "express-rate-limit";
import logger from "./logger";

export const securityMiddleware = [
  helmet(),
  cors({ origin: process.env.CLIENT_URL }),
  express.json(),
];

// Rate Limiting Middleware (Prevents brute force attacks)
export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: { error: "Too many requests, please try again later." },
  handler: (req: Request, res: Response, next: NextFunction) => {
    logger.warn(`Rate limit exceeded for IP: ${req.ip}`);
    res.status(429).json({ error: "Too many requests, please try again later." });
  },
});

// Global Error Handler
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error(`Unhandled Error: ${err.message}`);
  res.status(500).json({ error: "Internal Server Error" });
};

