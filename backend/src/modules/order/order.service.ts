import { CreateOrderInput, OrderBase } from "./order.types";
import * as orderModel from "./order.model";
import  logger  from "../../core/logger";
import { findUserById } from "../auth/auth.model";
import { sendEmail } from "../../core/email.service";
import { createNotificationService } from "../notification/notifications.service";

// ✅ Create Order
export const createOrderService = async (userId: string, data: CreateOrderInput) => {
  try {
    const order = await orderModel.createOrder(userId, data);

    const user = await findUserById(userId);
    if (!user || !user.email) {
      logger.warn("⚠️ Could not send order confirmation: User email not found");
    } else {
      const message = `✅ Order Received!\n\nThank you for your order. Details:\n\nProduct ID: ${data.product_id}\nQuantity: ${data.quantity}\nAddress: ${data.delivery_address}`;
      await sendEmail(user.email, "🧵 Tailor Order Confirmation", message);
    }
    return order;
  } catch (err) {
    logger.error("❌ Failed to create order:", err);
    throw new Error("Order creation failed");
  }
};

// ✅ Get a single order
export const getOrderService = async (orderId: string) => {
  const order = await orderModel.getOrderById(orderId);
  if (!order) {
    throw new Error("Order not found");
  }
  return order;
};

// ✅ Get all orders for a user
export const getUserOrdersService = async (userId: string) => {
  return await orderModel.getUserOrders(userId);
};

// ✅ Update an order status
export const updateOrderStatusService = async (orderId: string, status: OrderBase["order_status"]) => {
  const updated = await orderModel.updateOrderStatus(orderId, status);
  if (!updated) {
    throw new Error("Order not found or update failed");
  }

  const message = `Your order status has been updated to: ${status.toUpperCase()}`;

    // ✅ Create notification
  await createNotificationService(
    updated.user_id, {
    title: "Order Status Updated",
    message,
  });

  return updated;
};

// ✅ Delete an order
export const deleteOrderService = async (orderId: string) => {
  await orderModel.deleteOrder(orderId);
};
