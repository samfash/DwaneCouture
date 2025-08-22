import { z } from "zod";
export const createOrderSchema = z.object({
    product_id: z.string().uuid(),
    quantity: z.number().int().positive(),
    delivery_address: z.string().min(1),
    notes: z.string().optional(),
});
// ✅ Update Order Status Validation (NEW)
export const updateOrderStatusSchema = z.object({
    order_status: z.enum(['processing', 'shipped', 'delivered', 'cancelled']),
});
