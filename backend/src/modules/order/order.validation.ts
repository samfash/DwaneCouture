import { z } from "zod";

export const OrderItemSchema = z.object({
  product_id: z.string().uuid(),
  quantity: z.number().int().positive(),
  price: z.number().nonnegative(),
});

export const CreateOrderSchema = z.object({
  delivery_address: z.string().min(1),
  notes: z.string().optional(),
  items: z.array(OrderItemSchema).min(1),
});

export type CreateOrderDTO = z.infer<typeof CreateOrderSchema>;

// ✅ Update Order Status Validation (NEW)
export const updateOrderStatusSchema = z.object({
  order_status: z.enum(['processing', 'shipped', 'delivered', 'cancelled']),
});