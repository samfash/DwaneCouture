import * as orderService from "../../../modules/order/order.service";
import * as orderModel from "../../../modules/order/order.model";
import { findUserById } from "../../../modules/auth/auth.model";
import { createNotificationService } from "../../../modules/notification/notifications.service";
jest.mock("../../../modules/order/order.model");
jest.mock("../../../modules/auth/auth.model", () => ({
    findUserById: jest.fn(),
}));
jest.mock("../../../core/email.service", () => ({
    sendEmail: jest.fn(),
}));
jest.mock("../../../modules/notification/notifications.service", () => ({
    createNotificationService: jest.fn(),
}));
const mockOrder = {
    id: "order-uuid",
    user_id: "user-uuid",
    product_id: "product-uuid",
    quantity: 2,
    total_price: 150,
    order_status: "pending",
};
const mockUser = {
    id: "user-uuid",
    email: "fasanya36@gmail.com"
};
const mockNotification = {
    id: "notification-uuid",
    user_id: "user-uuid",
    title: "Order Status Updated",
    message: "Your order status has been updated to: DELIVERED",
};
describe("Order Service", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it("should create an order", async () => {
        orderModel.createOrder.mockResolvedValue(mockOrder);
        findUserById.mockResolvedValue(mockUser);
        const data = {
            product_id: "product-uuid",
            quantity: 2,
            delivery_address: "123 Main St",
            notes: "Please deliver after 5 PM"
        };
        const result = await orderService.createOrderService("user-uuid", data);
        expect(result).toEqual(mockOrder);
        expect(orderModel.createOrder).toHaveBeenCalledWith("user-uuid", data);
    });
    it("should get an order by id", async () => {
        orderModel.getOrderById.mockResolvedValue(mockOrder);
        const result = await orderService.getOrderService("order-uuid");
        expect(result).toEqual(mockOrder);
        expect(orderModel.getOrderById).toHaveBeenCalledWith("order-uuid");
    });
    it("should throw error if order not found", async () => {
        orderModel.getOrderById.mockResolvedValue(null);
        await expect(orderService.getOrderService("nonexistent-id")).rejects.toThrow("Order not found");
    });
    it("should update order status", async () => {
        orderModel.updateOrderStatus.mockResolvedValue(mockOrder);
        createNotificationService.mockResolvedValue(mockNotification);
        findUserById.mockResolvedValue(mockUser);
        const result = await orderService.updateOrderStatusService("order-uuid", "delivered");
        expect(result).toEqual(mockOrder);
        expect(orderModel.updateOrderStatus).toHaveBeenCalledWith("order-uuid", "delivered");
    });
    it("should delete an order", async () => {
        orderModel.deleteOrder.mockResolvedValue(undefined);
        await expect(orderService.deleteOrderService("order-uuid")).resolves.not.toThrow();
        expect(orderModel.deleteOrder).toHaveBeenCalledWith("order-uuid");
    });
});
