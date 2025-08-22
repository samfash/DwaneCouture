import { z } from "zod";
export const createPaymentSchema = z.object({
    order_id: z.string().uuid(),
    payment_method: z.enum(["stripe", "paystack", "flutterwave"]),
    amount: z.number().positive(),
    currency: z.string().optional().default("usd"),
});
// ✅ Update Payment Status Validation (NEW)
export const updatePaymentStatusSchema = z.object({
    payment_status: z.enum(["pending", "paid", "failed"]),
});
