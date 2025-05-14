import request from "supertest";
import app from "../../app";
import pool from "../../core/database";
import { v4 as uuidv4 } from "uuid";
import { generateToken } from "../../core/auth.utils";

describe("🔁 Order Integration Tests", () => {
  let token: string;
  let userId: string;
  let orderId: string;
  let productId: string;

  beforeAll(async () => {
    userId = uuidv4();
    token = generateToken({ id: userId, email: "testuser@example.com", role: "user" });

    await pool.query(`
      INSERT INTO users (id, email, password, role)
      VALUES ($1, $2, $3, $4)
    `, [userId, "testuser@example.com", "hashed-password", "user"]);  

    // Insert mock product for order
    const result = await pool.query(`
      INSERT INTO products (id, name, price, category, description, image_url)
      VALUES ($1::uuid, $2, $3, $4, $5, $6) RETURNING id
    `, [uuidv4(), "Sample Product", 49.99, "male", "Sample description", "https://example.com/sample.jpg"]);
    productId = result.rows[0].id;
    
  });

  afterAll(async () => {
    await pool.query("DELETE FROM orders");
    await pool.query("DELETE FROM products");
    await pool.query("DELETE FROM users");
  });

  it("should create an order", async () => {
    const res = await request(app)
      .post("/api/orders")
      .set("Authorization", `Bearer ${token}`)
      .send({
        product_id: productId,
        quantity: 2,
        delivery_address: "123 Test St, Test City",
        notes: "Please deliver after 5 PM",
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    orderId = res.body.id;
  });

  it("should get all user orders", async () => {
    const res = await request(app)
      .get("/api/orders")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should get specific order by ID", async () => {
    const res = await request(app)
      .get(`/api/orders/${orderId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(orderId);
  });

  it("should update order status", async () => {
    const res = await request(app)
      .patch(`/api/orders/${orderId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ order_status: "processing" });

    expect(res.status).toBe(200);
    expect(res.body.order_status).toBe("processing");
  });

  it("should delete the order", async () => {
    const res = await request(app)
      .delete(`/api/orders/${orderId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(204);
  });
});
