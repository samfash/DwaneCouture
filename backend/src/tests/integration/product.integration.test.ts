// src/tests/integration/product.integration.test.ts
import request from "supertest";
import app from "../../app";
import pool from "../../core/database";
import { v4 as uuidv4 } from "uuid";
import { generateToken } from "../../core/auth.utils";
import path from "path";

describe("🧪 Product Integration Tests", () => {
  let productId: string;
  const userId = uuidv4();
  const token = generateToken({ id: userId, role: "admin", email: "admin@example.com" });

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const productData = {
    name: "Classic Male Suit",
    description: "A premium two-piece suit",
    category: "male",
    price: 150.75,
    // image_url: "https://example.com/suit.jpg",
  };

  afterAll(async () => {
    await pool.query("DELETE FROM products");
  });

  it("should create a new product", async () => {
    const res = await request(app).post("/api/products").set(headers)
    .field("name", productData.name)
    .field("description", productData.description)
    .field("category", productData.category)
    .field("price", productData.price.toString())
    .attach("image", path.resolve(__dirname, "files/sample.jpg")); // Adjust the path to your test image


    expect(res.status).toBe(201);
    expect(res.body.name).toBe(productData.name);
    productId = res.body.id;
  });

  it("should get all products", async () => {
    const res = await request(app).get("/api/products").set(headers);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });

  it("should get a product by ID", async () => {
    const res = await request(app).get(`/api/products/${productId}`).set(headers);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(productId);
  });

  it("should update a product", async () => {
    const res = await request(app)
      .patch(`/api/products/${productId}`)
      .set(headers)
      .send({ price: 180.25 });

    expect(res.status).toBe(200);
    expect(res.body.price).toBe("180.25"); // Note: pg returns NUMERIC as string
  });

  it("should delete a product", async () => {
    const res = await request(app).delete(`/api/products/${productId}`).set(headers);
    expect(res.status).toBe(204);
  });

  it("should return 404 for deleted product", async () => {
    const res = await request(app).get(`/api/products/${productId}`).set(headers);
    expect(res.status).toBe(404);
  });
});
