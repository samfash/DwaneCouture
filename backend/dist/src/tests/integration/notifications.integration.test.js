import request from "supertest";
import app from "../../app";
import pool from "../../core/database";
import { generateToken } from "../../core/auth.utils";
import { v4 as uuidv4 } from "uuid";
describe("🔁 Notification Integration Tests", () => {
    let userId;
    let token;
    let notificationId;
    beforeAll(async () => {
        userId = uuidv4();
        token = generateToken({ id: userId, email: "test@example.com", role: "user" });
        await pool.query(`
        INSERT INTO users (id, email, password, role)
        VALUES ($1, $2, $3, $4)
      `, [userId, "testuser@example.com", "hashed-password", "user"]);
    });
    afterAll(async () => {
        await pool.query(`DELETE FROM notifications WHERE user_id = $1`, [userId]);
    });
    it("should create a new notification", async () => {
        const res = await request(app)
            .post("/api/notifications")
            .set("Authorization", `Bearer ${token}`)
            .send({
            title: "Test Notification",
            message: "This is a test notification",
        });
        expect(res.status).toBe(201);
        expect(res.body.notification).toHaveProperty("id");
        notificationId = res.body.notification.id;
    });
    it("should fetch user notifications", async () => {
        const res = await request(app)
            .get("/api/notifications")
            .set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body.notifications.length).toBeGreaterThan(0);
    });
    it("should mark a notification as read", async () => {
        const res = await request(app)
            .patch(`/api/notifications/${notificationId}/read`)
            .set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Notification marked as read");
    });
    it("should delete a notification", async () => {
        const res = await request(app)
            .delete(`/api/notifications/${notificationId}`)
            .set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Notification deleted");
    });
    it("should not allow unauthorized access", async () => {
        const res = await request(app)
            .get("/api/notifications");
        expect(res.status).toBe(401);
    });
});
