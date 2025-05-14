// src/modules/auth/auth.controller.ts
import e, { Request, Response } from "express";
import { registerUser, loginUser, forgotPassword, resetPassword, registerOAuthUser, assignUserRole } from "./auth.service";
import { registerValidation, loginValidation, forgotPasswordValidation, resetPasswordValidation, oauthValidation} from "./auth.validation";
import logger from "../../core/logger";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
    res.status(400).json({ error: "Email and password are required" });
    return;
    }

    const validatedData = registerValidation.parse(req.body);

    const { token, user } = await registerUser(validatedData);
    res.status(201).json({ message: "User registered successfully", token, user });
    return;
  } catch (error) {
    logger.error(`Registration Error: ${(error as Error).message}`);
    res.status(400).json({ error: (error as Error).message });
    return;
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required" });
      return;
    }

    const validatedData = loginValidation.parse(req.body);

    const { token } = await loginUser(validatedData);
    res.status(200).json({ message: "Login successful", token });
    return;
  } catch (error) {
    logger.error(`Login Error:  ${(error as Error).message}`);
    res.status(400).json({ error: (error as Error).message });
    return;
  }
};

export const forgotPasswordController = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(400).json({ error: "Email is required" });
      return;
    }

    const validatedData = forgotPasswordValidation.parse(req.body);
    const response = await forgotPassword(validatedData, req);

    res.status(200).json(response);
    return;
  } catch (error) {
    logger.error(`Forgot Password Error: ${(error as Error).message}`);
    res.status(400).json({ error: (error as Error).message });
    return;
  }
};

export const resetPasswordController = async (req: Request, res: Response) => {
  try {
    const { resetToken, newPassword } = req.body;
    if (!resetToken || !newPassword) {
      res.status(400).json({ error: "Reset token and new password are required" });
      return;
    }
    const validatedData = resetPasswordValidation.parse(req.body);
    const response = await resetPassword(validatedData);
    res.status(200).json(response);
    return;
  } catch (error) {
    logger.error(`Reset Password Error: ${(error as Error).message}`);
    res.status(400).json({ error: (error as Error).message });
    return;
  }
};


export const googleOAuthCallback = async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401).json({ error: "Authentication failed" });
    return;
  }

  const validatedData = oauthValidation.parse(req.user);

  try {
    const { token, user } = await registerOAuthUser(validatedData);
    res.redirect(`http://localhost:3000?token=${token}&email=${user.email}`);
    return;
  } catch (error) {
    logger.error(`OAuth Error: ${(error as Error).message}`);
    res.status(500).json({ error: "OAuth processing failed" });
    return;
  }
};

// PATCH /users/:id/role
export const assignRoleController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { role } = req.body;

  if (!["admin", "user", "tailor"].includes(role)) {
    res.status(400).json({ error: "Invalid role type" });
    return;
  }

  try {
    const user = await assignUserRole(id, role);
    res.status(200).json({ message: "Role updated", user });
    return;
  } catch (err) {
    res.status(500).json({ error: "Failed to update role" });
    return;
  }
};


