import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import logger from "./logger"; // Winston logger
import config from "./config";

dotenv.config();

const JWT_SECRET = config.auth.jwtSecret as string;
const TOKEN_EXPIRY = "5h";

export const generateToken = (payload: object): string => {
  try {
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
    return token;
  } catch (error) {
    logger.error(`Token Generation Error: ${(error as Error).message}`);
    throw new Error("Failed to generate token");
  }
};

export const verifyToken = (token: string): object | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (typeof decoded === "string") {
      return null;
    }
    return decoded;
  } catch (error) {
    logger.warn(`Invalid token detected: ${(error as Error).message}`);
    return null;
  }
};
