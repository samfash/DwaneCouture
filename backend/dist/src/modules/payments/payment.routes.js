import { Router } from "express";
import { createPaymentController, getPaymentByIdController, updatePaymentStatusController, } from "./payment.controller";
import { authenticateJWT } from "../../core/auth.middleware";
const router = Router();
/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Payment management
 */
/**
 * @swagger
 * /api/payments:
 *   post:
 *     summary: Create a new payment
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePayment'
 *     responses:
 *       201:
 *         description: Payment created
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post("/", authenticateJWT, createPaymentController);
/**
 * @swagger
 * /api/payments/{id}:
 *   get:
 *     summary: Get payment by ID
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Payment ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment details
 *       404:
 *         description: Payment not found
 */
router.get("/:id", authenticateJWT, getPaymentByIdController);
/**
 * @swagger
 * /api/payments/{id}:
 *   patch:
 *     summary: Update payment status
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Payment ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdatePaymentStatus'
 *     responses:
 *       200:
 *         description: Payment updated
 *       404:
 *         description: Payment not found
 */
router.patch("/:id", authenticateJWT, updatePaymentStatusController);
export default router;
