import pool from "../../core/database";
import { NotificationBase } from "./notifications.types";

export const createNotification = async (userId: string, data: { title: string; message: string }): Promise<NotificationBase> => {
  const result = await pool.query(
    `INSERT INTO notifications (user_id, title, message) VALUES ($1, $2, $3) RETURNING *`,
    [userId, data.title, data.message]
  );
  return result.rows[0];
};

export const getUserNotifications = async (userId: string): Promise<NotificationBase[]> => {
  const result = await pool.query(`SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC`, [userId]);
  return result.rows;
};

export const markNotificationAsRead = async (notificationId: string, userId: string): Promise<void> => {
  await pool.query(`UPDATE notifications SET is_read = true WHERE id = $1 AND user_id = $2`, [notificationId, userId]);
};

export const deleteNotification = async (notificationId: string, userId: string): Promise<void> => {
  await pool.query(`DELETE FROM notifications WHERE id = $1 AND user_id = $2`, [notificationId, userId]);
};
