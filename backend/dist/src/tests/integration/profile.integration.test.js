import request from "supertest";
import app from "../../app";
import pool from "../../core/database";
import { generateToken } from "../../core/auth.utils";
import { v4 as uuidv4 } from "uuid";
let userId = uuidv4();
const token = generateToken({ id: userId, email: "test@example.com", role: "user" });
const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
};
const profile = {
    user_id: userId,
    full_name: "John Doe",
    gender: "male",
    delivery_address: "123 Main St",
};
const measurements = {
    neck: 15.5,
    chest: 40.0,
    waist: 32.0,
    hips: 38.0,
};
describe("🔁 Profile Integration Tests", () => {
    beforeEach(async () => {
        // Create a test user
        await pool.query("INSERT INTO users (id, email, password, role) VALUES ($1, $2, $3, $4)", [
            userId,
            "test@exampl.com",
            "hashedpassword",
            "user",
        ]);
    });
    afterEach(async () => {
        await pool.query("DELETE FROM profiles;");
        await pool.query("DELETE FROM users;");
    });
    it("should create a male profile with required measurements", async () => {
        const res = await request(app).post("/api/profiles").set(headers).send({
            profile, measurements
        });
        expect(res.status).toBe(201);
        expect(res.body.profile.id).toBeDefined();
    });
    it("should fetch the profile and measurements", async () => {
        await request(app).post("/api/profiles").set(headers).send({
            profile, measurements
        });
        const res = await request(app).get("/api/profiles").set(headers).send({ users: { id: userId } });
        expect(res.status).toBe(200);
        expect(res.body.profile.full_name).toBe("John Doe");
        expect(parseFloat(res.body.measurements.neck)).toBeCloseTo(15.5);
    });
    it("should update only the profile fields", async () => {
        const res1 = await request(app).post("/api/profiles").set(headers).send({
            profile, measurements
        });
        let profileId = res1.body.profile.id;
        const res = await request(app).patch(`/api/profiles/${profileId}`).set(headers).send({
            profile: {
                full_name: "Updated Name",
            },
        });
        expect(res.status).toBe(200);
        expect(res.body.profile.full_name).toBe("Updated Name");
    });
    it("should update only the male measurements", async () => {
        const res1 = await request(app).post("/api/profiles").set(headers).send({
            profile, measurements
        });
        let profileId = res1.body.profile.id;
        const res = await request(app).patch(`/api/profiles/${profileId}`).set(headers).send({
            measurements: {
                chest: 41.5,
                waist: 33.2,
            },
        });
        expect(res.status).toBe(200);
        expect(parseFloat(res.body.measurements.chest)).toBeCloseTo(41.5);
        expect(parseFloat(res.body.measurements.waist)).toBeCloseTo(33.2);
    });
    it("should reject profile creation without required fields", async () => {
        const res = await request(app).post("/api/profiles").set(headers).send({
            profile: {
                full_name: "No Gender",
                delivery_address: "Nowhere",
            },
            measurements: {},
        });
        expect(res.status).toBe(400);
        expect(res.body.error).toBeDefined();
    });
    it("should reject update if profile ID is invalid", async () => {
        const res1 = await request(app).post("/api/profiles").set(headers).send({
            profile, measurements
        });
        const res = await request(app).patch(`/api/profiles/invalid-id`).set(headers).send({
            profile: { full_name: "Fail Update" },
        });
        expect(res.status).toBe(500); // handled in controller as server error
    });
    it("should handle update with missing measurements gracefully", async () => {
        const res1 = await request(app).post("/api/profiles").set(headers).send({
            profile, measurements
        });
        let profileId = res1.body.profile.id;
        const res = await request(app).patch(`/api/profiles/${profileId}`).set(headers).send({});
        expect(res.status).toBe(200);
        expect(res.body.profile.id).toBe(profileId);
    });
});
