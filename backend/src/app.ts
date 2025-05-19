// src/app.ts
import express from "express";
import passport from "./core/auth.strategy";
import { authenticateJWT } from "./core/auth.middleware";
import { securityMiddleware, rateLimiter, errorHandler } from "./core/middleware";
import dotenv from "dotenv";
import cors from "cors";
import { setupSwagger } from "./core/swagger";
import authRoutes from "./modules/auth/auth.routes";
import profileRoutes from "./modules/profile/profile.routes";
import productRoutes from "./modules/product/product.routes";
import orderRoutes from "./modules/order/order.routes";
import paymentRoutes from "./modules/payments/payment.routes";
import notificationRoutes from "./modules/notification/notifications.routes";
import pool from "./core/database";


dotenv.config();

const app = express();
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));
app.use(express.json());

app.use(securityMiddleware);
app.use(rateLimiter);
app.use(passport.initialize());

setupSwagger(app);

app.use("/auth", authRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/notifications", notificationRoutes);


app.get("/", (req, res) =>{ 
    res.json({ message: "Tailoring App API is running" })
});

app.get("/protected", authenticateJWT, (req, res) => {
  res.json({ message: "Access granted", user: req.user });
});

app.get("/db-check", async (req, res) => {
    try {
      const result = await pool.query("SELECT NOW();");
      res.json({ message: "✅ Database connected!", time: result.rows[0] });
    } catch (err) {
      res.status(500).json({ error: "❌ Database connection failed!", details: err });
    }
  });

app.use(errorHandler);

export default app;