// src/tests/integration/admin.metrics.integration.test.ts
import request from "supertest";
import app from "../../app";
import { generateToken } from "../../core/auth.utils";
import { Metrics } from "../../modules/admin/admin.types"; // if you exported the type
import { v4 as uuidv4 } from "uuid";

describe("📊 Admin Metrics Integration Test", () => {
  let token: string;

  beforeAll(() => {
    const adminId = uuidv4();
    token = generateToken({
      id: adminId,
      email: "admin@example.com",
      role: "admin",
    });
  });

  it("should return metrics object with numeric or undefined fields", async () => {
    const res = await request(app)
      .get("/api/admin/metrics")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    const metrics: Metrics = res.body;

    // ✅ Only check structure/type
    expect(metrics).toHaveProperty("totalUsers");
    expect(metrics).toHaveProperty("totalTailors");
    expect(metrics).toHaveProperty("totalOrders");
    expect(metrics).toHaveProperty("totalRevenue");

    // ✅ All values should be either undefined or number
    for (const key in metrics) {
      const value = metrics[key as keyof Metrics];
      expect(
        typeof value === "number" || typeof value === "undefined"
      ).toBeTruthy();
    }
  });
});
