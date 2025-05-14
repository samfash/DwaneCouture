import pool from "../../core/database";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { User } from "./auth.types";
import crypto from "crypto";

dotenv.config();

export const createUser = async (email: string,
  hashedPassword: string, 
  role: string, 
  isOAuth: boolean = false): Promise<User> => {
  const query = `
    INSERT INTO users (email, password, role) 
    VALUES ($1, $2, $3) 
    RETURNING id, email, role;
  `;
  const { rows } = await pool.query(query, [email, hashedPassword, role]);
  return rows[0];
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
    const query = `
      SELECT id, email, password, role, isOAuth FROM users 
      WHERE email = $1 LIMIT 1;
    `;
    const { rows } = await pool.query(query, [email]);
    return rows.length ? rows[0] : null;
};

export const findUserById = async (id: string): Promise<User | null> => {
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return result.rows.length ? result.rows[0] : null;
};

export const updateUserResetToken = async (userId: string, resetToken: string, expiry: Date): Promise<void> => {
  const query = `
    UPDATE users 
    SET resetToken = $1, resettokenexpiry = $2 
    WHERE id = $3;
  `;
  await pool.query(query, [resetToken, expiry, userId]);
};

export const findUserByResetToken = async (resetToken: string): Promise<User | null> => {
  const query = `
    SELECT id, email, role, resettoken, resettokenexpiry FROM users 
    WHERE resetToken = $1 LIMIT 1;
  `;
  const { rows } = await pool.query(query, [resetToken]);
  return rows.length ? rows[0] : null;
};

export const updateUserPassword = async (userId: string, hashedPassword: string): Promise<void> => {
  const query = `
  UPDATE users 
  SET password = $1, resetToken = NULL, resetTokenExpiry = NULL 
  WHERE id = $2;
`;
await pool.query(query, [hashedPassword, userId]);
};

export const createOAuthUser = async (email: string): Promise<User> => {
  const randomPassword = crypto.randomBytes(32).toString("hex");
  const hashedPassword = await bcrypt.hash(randomPassword, 10);
  const query = `
    INSERT INTO users (email, password, role, isOAuth) 
    VALUES ($1, $2, $3, $4) 
    RETURNING id, email, role, isOAuth;
  `;
  const { rows } = await pool.query(query, [email, hashedPassword, "user", true]);
  return rows[0];
};

export const updateUserRole = async (userId: string, role: "admin" | "user" | "tailor") => {
  const query = `UPDATE users SET role = $1 WHERE id = $2 RETURNING id, email, role`;
  const values = [role, userId];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

