import { createNotification, getUserNotifications, markNotificationAsRead, deleteNotification } from "./notifications.model";
import { sendEmail } from "../../core/email.service";
import logger from "../../core/logger";
import { findUserById } from "../auth/auth.model";
export const createNotificationService = async (data) => {
    const notification = await createNotification(data);
    const email = await findUserById(data.user_id);
    if (!email) {
        logger.error("❌ User not found for notification email", { userId: data.user_id });
        return notification;
    }
    // ✅ Send email after creating notification
    try {
        await sendEmail(email.email, `🔔 ${data.title}`, `${data.message}`);
    }
    catch (error) {
        logger.error("❌ Failed to send notification email", { message: error.message });
    }
    return notification;
};
export const getUserNotificationsService = async (userId) => {
    return await getUserNotifications(userId);
};
export const markNotificationReadService = async (userId, notificationId) => {
    await markNotificationAsRead(notificationId, userId);
};
export const deleteNotificationService = async (userId, notificationId) => {
    await deleteNotification(notificationId, userId);
};
