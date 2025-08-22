import { createPaymentSchema, updatePaymentStatusSchema } from "../../../modules/payments/payment.validation";
describe("Payment Validation", () => {
    it("should validate a valid create payment input", () => {
        const data = {
            order_id: '123e4567-e89b-12d3-a456-426614174000',
            amount: 150,
            payment_method: "stripe",
            currency: "usd",
        };
        const result = createPaymentSchema.safeParse(data);
        expect(result.success).toBe(true);
    });
    it("should fail if required fields are missing in create payment", () => {
        const data = {
            amount: 150,
        };
        const result = createPaymentSchema.safeParse(data);
        expect(result.success).toBe(false);
    });
    it("should validate a valid update payment status input", () => {
        const data = {
            payment_status: "paid",
            verified: true,
        };
        const result = updatePaymentStatusSchema.safeParse(data);
        expect(result.success).toBe(true);
    });
    it("should fail invalid payment status", () => {
        const data = {
            payment_status: "unknown",
            verified: true,
        };
        const result = updatePaymentStatusSchema.safeParse(data);
        expect(result.success).toBe(false);
    });
});
