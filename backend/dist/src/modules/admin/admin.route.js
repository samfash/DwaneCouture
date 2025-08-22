// src/modules/admin/admin.route.ts
import { Router } from "express";
import { getAdminMetricsController } from "./admin.controller";
import { authenticateJWT, authorizeRole } from "../../core/auth.middleware";
const router = Router();
/**
 * @swagger
 * /api/admin/metrics:
 *   get:
 *     summary: Get admin dashboard metrics
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Metrics summary
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalUsers:
 *                   type: number
 *                 totalTailors:
 *                   type: number
 *                 totalOrders:
 *                   type: number
 *                 totalRevenue:
 *                   type: number
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/metrics", authenticateJWT, authorizeRole("admin", "root-admin"), // 🔐 Secure with RBAC
getAdminMetricsController);
export default router;
