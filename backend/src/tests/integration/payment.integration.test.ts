import request from "supertest";
import app from "../../app";
import pool from "../../core/database";
import { v4 as uuidv4 } from "uuid";
import { generateToken } from "../../core/auth.utils";

describe("💳 Payment Integration Tests", () => {
  let token: string;
  let userId: string;
  let paymentId: string;
  let orderId: string;
  let productId: string;

  let payment_test_data: any;


  beforeAll(async () => {
    userId = uuidv4();
    token = generateToken({ id: userId, email: "paytest@example.com", role: "user" });

    await pool.query(`
      INSERT INTO users (id, email, password, role)
      VALUES ($1, $2, $3, $4)
    `, [userId, "testuser@example.com", "hashed-password", "user"]);

    const productRes = await pool.query(`
        INSERT INTO products (id, name, price, category, description, image_url)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING id
      `, [uuidv4(), "Payment Test Product", 100.00, "male", "Test description", "https://example.com/test.jpg"]);
      productId = productRes.rows[0].id;

     // 2️⃣ Create a mock order first
    const orderRes = await pool.query(`
        INSERT INTO orders (id, user_id, product_id, quantity, total_price, order_status, delivery_address)
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id
      `, [uuidv4(), userId, productId, 1, 100.00, "processing", "123 Test St, Test City"]);
      orderId = orderRes.rows[0].id;

    payment_test_data = {
        user_id: userId,
        payment_method: "paystack",
        amount: 5000,
        currency: "usd",
        order_id: orderId, // Mock order ID for testing
        payment_reference: "random-payment-ref-123",
        payment_status: "pending",
      };
  });

  afterAll(async () => {
    await pool.query("DELETE FROM payments");
  });
  
  it("should create a payment", async () => {
    const res = await request(app)
      .post("/api/payments")
      .set("Authorization", `Bearer ${token}`)
      .send(payment_test_data);

    expect(res.status).toBe(201);
    expect(res.body.payment).toHaveProperty("id");
    paymentId = res.body.payment.id;
  
  });

  it("should retrieve payment by ID", async () => {

    const res = await request(app)
      .get(`/api/payments/${orderId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(paymentId);
  });

  it("should update payment status", async () => {

    const res = await request(app)
      .patch(`/api/payments/${orderId}`)
      .query({method: "paystack"})
      .send({ payment_status: "paid" })
      .set("Authorization", `Bearer ${token}`)

    expect(res.status).toBe(200);
    expect(res.body.payment_status).toBe("paid");
  });
});
