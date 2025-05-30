// src/modules/auth/auth.routes.ts
import express from "express";
import { register, login,
    refreshTokenController,
    logoutController,
    forgotPasswordController, 
    resetPasswordController, 
    googleOAuthCallback, 
    assignRoleController} from "./auth.controller";
import passport from "passport";
import { authenticateJWT, authorizeAdmin } from "../../core/auth.middleware";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API endpoints for user authentication
 */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "Secure@123"
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error or user already exists
 */

router.post("/signup", register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in a user and return a JWT token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "Secure@123"
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid credentials
 */
router.post("/login", login);

router.get("/refresh", refreshTokenController);

router.post("/logout", logoutController); // ✅ New logout route


/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Request a password reset link
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *     responses:
 *       200:
 *         description: Password reset link sent
 *       400:
 *         description: User not found
 */
router.post("/forgot-password", forgotPasswordController);

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Reset the user's password using a valid reset token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - resetToken
 *               - newPassword
 *             properties:
 *               resetToken:
 *                 type: string
 *               newPassword:
 *                 type: string
 *                 example: "NewSecure@123"
 *     responses:
 *       200:
 *         description: Password reset successful
 *       400:
 *         description: Invalid or expired token
 */
router.post("/reset-password", resetPasswordController);


/**
 * @swagger
 * /auth/google:
 *   get:
 *     summary: Authenticate user via Google OAuth
 *     tags: [Authentication]
 */
router.get("/google", passport.authenticate("google", { scope: ["email", "profile"] }));

/**
 * @swagger
 * /auth/google/tailoringApp:
 *   get:
 *     summary: Google OAuth callback
 *     tags: [Authentication]
 */
router.get("/google/tailoringApp", passport.authenticate("google", { session: false }), googleOAuthCallback);

router.patch("/users/:id/role", authenticateJWT, authorizeAdmin, assignRoleController);

router.get('/me', authenticateJWT, (req, res) => {
  const { id, email, role } = req.user!;
  res.status(200).json({ id, email, role });
});



export default router;
