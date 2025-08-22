import { Router } from "express";
import { authenticateJWT } from "../../core/auth.middleware";
import { createNotificationController, getUserNotificationsController, markNotificationAsReadController, deleteNotificationController } from "./notifications.controller";
const router = Router();
/**
 * @swagger
 * /api/notifications:
 *   post:
 *     summary: Create a new notification
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Notifications
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateNotification'
 *     responses:
 *       201:
 *         description: Notification created
 */
router.post("/", authenticateJWT, createNotificationController);
/**
 * @swagger
 * /api/notifications:
 *   get:
 *     summary: Get user notifications
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Notifications
 *     responses:
 *       200:
 *         description: List of notifications
 */
router.get("/", authenticateJWT, getUserNotificationsController);
/**
 * @swagger
 * /api/notifications/{notificationId}/read:
 *   patch:
 *     summary: Mark notification as read
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Notifications
 *     parameters:
 *       - in: path
 *         name: notificationId
 *         required: true
 *     responses:
 *       200:
 *         description: Notification marked as read
 */
router.patch("/:notificationId/read", authenticateJWT, markNotificationAsReadController);
/**
 * @swagger
 * /api/notifications/{notificationId}:
 *   delete:
 *     summary: Delete notification
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Notifications
 *     parameters:
 *       - in: path
 *         name: notificationId
 *         required: true
 *     responses:
 *       200:
 *         description: Notification deleted
 */
router.delete("/:notificationId", authenticateJWT, deleteNotificationController);
export default router;
