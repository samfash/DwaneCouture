import { createNotification, getUserNotifications, markNotificationAsRead, deleteNotification } from "./notifications.model";
import { CreateNotificationInput, UpdateNotificationInput } from "./notifications.types";
import { sendEmail } from "../../core/email.service";
import logger from "../../core/logger";
import { findUserById } from "../auth/auth.model";

export const createNotificationService = async (userId: string, data: CreateNotificationInput) => {
  const notification = await createNotification(userId, data);

  const email = await findUserById(userId);
  if (!email) {
    logger.error("❌ User not found for notification email", { userId });
    return notification;
  }
  // ✅ Send email after creating notification
  try {
    await sendEmail(
      email.email,
      `🔔 ${data.title}`,
      `${data.message}`
    );
  } catch (error) {
    logger.error("❌ Failed to send notification email", { message: (error as Error).message });
  }

  return notification;
};

export const getUserNotificationsService = async (userId: string) => {
  return await getUserNotifications(userId);
};

export const markNotificationReadService = async (userId: string, notificationId: string) => {
  await markNotificationAsRead(notificationId, userId);
};

export const deleteNotificationService = async (userId: string, notificationId: string) => {
  await deleteNotification(notificationId, userId);
};
