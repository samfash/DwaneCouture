import { createOrderSchema, updateOrderStatusSchema } from "../../../modules/order/order.validation";
describe("Order Validation", () => {
    it("should validate a valid create order input", () => {
        const data = {
            product_id: '123e4567-e89b-12d3-a456-426614174000',
            quantity: 2,
            delivery_address: "123 Main St",
            notes: "Please deliver after 5 PM"
        };
        const result = createOrderSchema.safeParse(data);
        expect(result.success).toBe(true);
    });
    it("should fail if required fields are missing in create order", () => {
        const data = {
            quantity: 2,
        };
        const result = createOrderSchema.safeParse(data);
        expect(result.success).toBe(false);
    });
    it("should validate a valid update order status input", () => {
        const data = {
            order_status: "delivered",
        };
        const result = updateOrderStatusSchema.safeParse(data);
        expect(result.success).toBe(true);
    });
    it("should fail invalid order status", () => {
        const data = {
            order_status: "invalid_status",
        };
        const result = updateOrderStatusSchema.safeParse(data);
        expect(result.success).toBe(false);
    });
});
