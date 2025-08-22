import { createNotificationService, getUserNotificationsService, markNotificationReadService, deleteNotificationService } from "../../../modules/notification/notifications.service";
import * as notificationModel from "../../../modules/notification/notifications.model";
jest.mock("../../../modules/notification/notifications.model");
describe("🔁 Notification Service Tests", () => {
    const userId = "user-123";
    const notificationId = "notif-123";
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it("should create a notification", async () => {
        notificationModel.createNotification.mockResolvedValue({ id: "notif-1", user_id: userId, title: "Hello", message: "World", is_read: false, created_at: new Date() });
        const result = await createNotificationService(userId, { title: "Hello", message: "World" });
        expect(notificationModel.createNotification).toHaveBeenCalledWith(userId, { title: "Hello", message: "World" });
        expect(result.title).toBe("Hello");
    });
    it("should get user notifications", async () => {
        notificationModel.getUserNotifications.mockResolvedValue([
            { id: "notif-1", user_id: userId, title: "Hello", message: "World", is_read: false, created_at: new Date() },
        ]);
        const result = await getUserNotificationsService(userId);
        expect(notificationModel.getUserNotifications).toHaveBeenCalledWith(userId);
        expect(result.length).toBe(1);
    });
    it("should mark a notification as read", async () => {
        notificationModel.markNotificationAsRead.mockResolvedValue(undefined);
        await markNotificationReadService(userId, notificationId);
        expect(notificationModel.markNotificationAsRead).toHaveBeenCalledWith(notificationId, userId);
    });
    it("should delete a notification", async () => {
        notificationModel.deleteNotification.mockResolvedValue(undefined);
        await deleteNotificationService(userId, notificationId);
        expect(notificationModel.deleteNotification).toHaveBeenCalledWith(notificationId, userId);
    });
});
