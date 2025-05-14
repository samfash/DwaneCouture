import request from "supertest";
import express from "express";
import { authenticateJWT } from "../../core/auth.middleware";
import { generateToken } from "../../core/auth.utils";
import dotenv from "dotenv";

dotenv.config({ path: ".env.test" });

const app = express();
app.use(express.json());

// Protected route for testing
app.get("/protected", authenticateJWT, (req, res) => {
  res.json({ message: "Access granted", user: req.user });
});

describe("Auth Middleware - JWT Authentication", () => {
  let validToken: string;

  beforeAll(() => {
    validToken = generateToken({ id: "user123", email: "test@example.com", role: "user" });
  });

  it("should deny access without a token", async () => {
    const response = await request(app).get("/protected");
    expect(response.status).toBe(401);
    expect(response.body).toEqual({ error: "Unauthorized: Missing or invalid token" });
  });

  it("should deny access with an invalid token", async () => {
    const response = await request(app).get("/protected").set("Authorization", "Bearer invalid.token");
    expect(response.status).toBe(403);
    expect(response.body).toEqual({ error: "Forbidden: Invalid token" });
  });

  it("should grant access with a valid token", async () => {
    const response = await request(app).get("/protected").set("Authorization", `Bearer ${validToken}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Access granted");
  });
});
