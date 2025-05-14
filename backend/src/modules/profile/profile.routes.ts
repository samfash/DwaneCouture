// src/modules/profiles/profile.route.ts
import { Router } from "express";
import { createProfileController, getProfileController, updateProfileController } from "./profile.controller";
import { authenticateJWT } from "../../core/auth.middleware";

const router = Router();

/**
 * @swagger
 * /api/profiles:
 *   post:
 *     tags: [Profiles]
 *     summary: Create a user profile and store measurements
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               profile:
 *                 $ref: '#/components/schemas/Profile'
 *               measurements:
 *                 oneOf:
 *                   - $ref: '#/components/schemas/MaleMeasurements'
 *                   - $ref: '#/components/schemas/FemaleMeasurements'
 *     responses:
 *       201:
 *         description: Profile created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
router.post("/", authenticateJWT, createProfileController);

/**
 * @swagger
 * /api/profiles:
 *   get:
 *     tags: [Profiles]
 *     summary: Get current user's profile and measurements
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile data
 *       404:
 *         description: Profile not found
 *       500:
 *         description: Server error
 */
router.get("/", authenticateJWT, getProfileController);

/**
 * @swagger
 * /api/profiles/{id}:
 *   patch:
 *     tags: [Profiles]
 *     summary: Update user profile info
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Profile ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Profile'
 *     responses:
 *       200:
 *         description: Updated profile
 *       500:
 *         description: Server error
 */
router.patch("/:id", authenticateJWT, updateProfileController);

export default router;
