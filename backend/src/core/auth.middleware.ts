import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import logger from "./logger"; // Winston logger
import config from "./config";

interface User {
  id: string;
  email: string;
  role: string;
}

declare module "express-serve-static-core" {
  interface Request {
    user?: User;
  }
}

dotenv.config();

const JWT_SECRET = config.auth.jwtSecret as string;

if (!JWT_SECRET) {
  throw new Error("Missing JWT_SECRET in environment variables");
}

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      logger.warn(`Unauthorized access attempt from IP: ${req.ip}`);
      res.status(401).json({ error: "Unauthorized: Missing or invalid token" });
      return;
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; email: string; role: string };

    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`JWT Authentication Error: ${error.message}`);
    }
    res.status(403).json({ error: "Forbidden: Invalid token" });
    return;
  }
};

export const authorizeRole = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "Unauthorized: No user found" });
      }

      if (!allowedRoles.includes(req.user.role)) {
        logger.warn(`Access denied for user ${req.user.email} with role: ${req.user.role}`);
        return res.status(403).json({ error: "Forbidden: Insufficient permissions" });
      }

      next();
    } catch (error) {
      if (error instanceof Error) {
        logger.error(`Authorization Error: ${error.message}`);
      } else {
        logger.error(`Authorization Error: ${String(error)}`);
      }
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
};

export const authorizeAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role !== "admin") {
    res.status(403).json({ error: "Forbidden. Admins only." });
    return;
  }
  next();
};

