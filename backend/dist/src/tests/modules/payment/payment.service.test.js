import * as paymentService from "../../../modules/payments/payment.service";
import * as paymentModel from "../../../modules/payments/payment.model";
jest.mock("../../../modules/payments/payment.model");
const mockPayment = {
    id: "payment-uuid",
    user_id: "user-uuid",
    order_id: "order-uuid",
    amount: 150,
    payment_method: "stripe",
    payment_status: "paid",
};
describe("Payment Service", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it("should create a payment", async () => {
        paymentModel.createPayment.mockResolvedValue(mockPayment);
        const data = {
            order_id: "order-uuid",
            amount: 150,
            payment_method: "stripe",
        };
        const result = await paymentService.createPaymentService("user-uuid", data, "txn-ref-123");
        expect(result).toEqual(mockPayment);
        expect(paymentModel.createPayment).toHaveBeenCalledWith("user-uuid", data, "txn-ref-123");
    });
    it("should get a payment by order id", async () => {
        paymentModel.getPaymentByOrderId.mockResolvedValue(mockPayment);
        const result = await paymentService.getPaymentByOrderService("order-uuid");
        expect(result).toEqual(mockPayment);
        expect(paymentModel.getPaymentByOrderId).toHaveBeenCalledWith("order-uuid");
    });
    it("should throw error if payment not found", async () => {
        paymentModel.getPaymentByOrderId.mockResolvedValue(null);
        await expect(paymentService.getPaymentByOrderService("nonexistent-order")).rejects.toThrow("Payment not found");
    });
    it("should update payment status", async () => {
        paymentModel.updatePaymentStatus.mockResolvedValue(mockPayment);
        const result = await paymentService.updatePaymentStatusService("payment-uuid", "paid", true);
        expect(result).toEqual(mockPayment);
        expect(paymentModel.updatePaymentStatus).toHaveBeenCalledWith("payment-uuid", "paid", true);
    });
});
