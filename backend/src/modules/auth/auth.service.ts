import { Request } from "express";
import jwt from "jsonwebtoken";
import { createUser,
  findUserByEmail, 
  findUserByResetToken, 
  updateUserPassword, 
  updateUserResetToken, 
  createOAuthUser,
  updateUserRole
} from "./auth.model";
import dotenv from "dotenv";
import config from "../../core/config";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { sendEmail } from "../../core/email.service";
import { generateToken } from "../../core/auth.utils";
import {
  RegisterRequest,
  RegisterResponse,
  LoginRequest,
  LoginResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  AuthResponse,
  OAuthUser,
} from './auth.types';


dotenv.config();

const JWT_SECRET = config.auth.jwtSecret as string;
if (!JWT_SECRET) throw new Error("Missing JWT_SECRET in environment variables");

export const registerUser = async (data: RegisterRequest): Promise<RegisterResponse> => {
  const { email, password } = data;
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  if (!hashedPassword) {
    throw new Error("Password hashing failed, the result is undefined or empty string");
  }

  const newUser = await createUser(email, hashedPassword, "user");
  if (!newUser || !newUser.id) {
    throw new Error(`User creation failed: id is missingReceived: ${JSON.stringify(newUser)}`);
  }

  const token = generateToken({ id: newUser.id, email: newUser.email, role: newUser.role });

  await sendEmail(
    email,
    "Welcome to Dwane Couture!",
    "Your account has been successfully created.",
   );
  return { token, user: newUser };
};

export const loginUser = async (data: LoginRequest): Promise<LoginResponse> => {
  const { email, password } = data;
  const user = await findUserByEmail(email);
  if (!user || !user.password) {
    throw new Error("Invalid credentials, user not found");
  }

  if (user?.isoauth) throw new Error("Please log in using OAuth");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials, passwords do not match");
  }

  const token = generateToken({ id:user.id, email: user.email, role: user.role });
  return { token };
};

export const refreshTokenService = async ( token: string) => {
  if (!token) {
    throw new Error("User ID and token are required");
  }

  const decoded = jwt.verify(token, config.auth.jwtSecret) as {
    id: string;
    email: string;
    role: string;
    };
  
  const user = await findUserByEmail(decoded.email);
    if (!user) {
      throw new Error( "Invalid token");
    }
  
  const newToken = generateToken({ id: user.id, email: user.email, role: user.role });
  
  return { token: newToken };
}

export const forgotPassword = async (data: ForgotPasswordRequest, req: Request): Promise<ForgotPasswordResponse> => {
  const { email } = data;
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error("User not found");
  }

  const resetToken = crypto.randomBytes(32).toString("hex");
  const resetTokenExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15-minute expiry
  const resetUrl = `${req.protocol || "http"}://${req.get("host")}/api/auth/reset-password/${resetToken}`;

  await updateUserResetToken(user.id, resetToken, resetTokenExpiry);
  await sendEmail(
    email,
    "Password Reset Request",
    `Click here to reset your password: ${resetUrl}`,
  );

  return { message: "Password reset link sent to your email" };
};

export const resetPassword = async (data: ResetPasswordRequest): Promise<ResetPasswordResponse> => {
  const { resetToken, newPassword } = data;
  const user = await findUserByResetToken(resetToken);
  if (!user || !user.resettoken || !user.resettokenexpiry) {
    throw new Error("Invalid token");
  }

  const isTokenValid = user.resettoken === resetToken && user.resettokenexpiry > new Date();
  if (!isTokenValid) {
    throw new Error("expired reset token");
  }
  
  // const salt = await bcrypt.genSalt(10);
  const hashedPassword =await bcrypt.hash(newPassword, 10);
  // const hashedPassword = await hashPassword(newPassword);
  await updateUserPassword(user.id, hashedPassword);

  return { message: "Password has been reset successfully" };
};


export const registerOAuthUser = async (data: OAuthUser ): Promise<AuthResponse> => {
  const { id, email } = data;
  let user = await findUserByEmail(email);
  if (!user) {
    user = await createOAuthUser(email);
    await sendEmail(
      email,
      "Welcome to Dwane Couture!",
      "Your account has been successfully created.",
     );
  }
  let token = generateToken({ id: user.id, email: user.email, role: user.role });
  return { token, user };
};

export const assignUserRole = async (userId: string, role: "admin" | "user" | "tailor") => {
  return updateUserRole(userId, role);
};


