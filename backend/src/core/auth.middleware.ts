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

  const authHeader = req.headers.authorization;

  const tokenFromHeader = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
  const tokenFromCookie = req.cookies?.access_token;

  const token = tokenFromHeader || tokenFromCookie;
  if (!token) {
    logger.warn(`Unauthorized access attempt from IP: ${req.ip}`);
    res.status(401).json({ error: "Unauthorized: Missing or invalid token"  });
    return;
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as User;
    req.user = payload;
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
        res.status(401).json({ error: "Unauthorized: No user found" });
        return;
      }

      if (!allowedRoles.includes(req.user.role)) {
        logger.warn(`Access denied for user ${req.user.email} with role: ${req.user.role}`);
        res.status(403).json({ error: "Forbidden: Insufficient permissions" });
        return;
      }

      next();
    } catch (error) {
      if (error instanceof Error) {
        logger.error(`Authorization Error: ${error.message}`);
      } else {
        logger.error(`Authorization Error: ${String(error)}`);
      }
      res.status(500).json({ error: "Internal Server Error" });
      return;
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

