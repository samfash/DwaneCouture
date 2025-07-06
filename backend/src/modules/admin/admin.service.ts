// src/modules/admin/admin.service.ts
import pool from "../../core/database";
import { Metrics } from "./admin.types";

export const getAdminMetrics = async (): Promise<Metrics> => {
  const [usersRes, ordersRes, revenueRes] = await Promise.all([
    pool.query("SELECT COUNT(*) FILTER (WHERE role = 'user') AS total_users, COUNT(*) FILTER (WHERE role = 'tailor') AS total_tailors FROM users"),
    pool.query("SELECT COUNT(*) AS total_orders FROM orders"),
    pool.query("SELECT COALESCE(SUM(total_price), 0) AS total_revenue FROM orders WHERE order_status = 'completed'")
  ]);

  return {
    totalUsers: Number(usersRes.rows[0].total_users),
    totalTailors: Number(usersRes.rows[0].total_tailors),
    totalOrders: Number(ordersRes.rows[0].total_orders),
    totalRevenue: Number(revenueRes.rows[0].total_revenue),
  };
};
