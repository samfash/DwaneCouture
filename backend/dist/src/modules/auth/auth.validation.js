import { z } from "zod";
export const registerValidation = z.object({
    email: z.string().email("Invalid email format"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[@$!%*?&]/, "Password must contain at least one special character"),
});
export const loginValidation = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(1, "Password is required"),
});
export const forgotPasswordValidation = z.object({
    email: z.string().email("Invalid email format"),
});
export const resetPasswordValidation = z.object({
    resetToken: z.string().min(1, "Reset token is required"),
    newPassword: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number"),
});
export const oauthValidation = z.object({
    id: z.string().min(1, "Invalid user ID format"),
    email: z.string().email("Invalid email format"),
});
