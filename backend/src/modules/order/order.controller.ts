import { Request, Response } from "express";
import {
  createOrderService,
  getUserOrdersService,
  getOrderService,
  updateOrderStatusService,
  deleteOrderService,
} from "./order.service";

import { createOrderSchema, updateOrderStatusSchema } from "./order.validation";
import logger from "../../core/logger";

// ✅ Create a new Order
export const createOrderController = async (req: Request, res: Response) => {
  try {
    const parsed = createOrderSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.errors });
      return ;
    }

    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return ;
    }

    const order = await createOrderService(userId, parsed.data);
    res.status(201).json(order);
    return ;
  } catch (error) {
    logger.error(`❌ CreateOrderController Error: ${(error as Error).message}`);
    res.status(500).json({ error: "Server Error" });
    return ;
  }
};

// ✅ Get All Orders
export const getAllOrdersController = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    const orders = await getUserOrdersService(userId as string);
    res.status(200).json(orders);
    return ;
  } catch (error) {
    logger.error(`❌ GetAllOrdersController Error: ${(error as Error).message}`);
    res.status(500).json({ error: "Server Error" });
    return ;
  }
};

// ✅ Get Specific Order by ID
export const getOrderByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const order = await getOrderService(id);

    if (!order) {
      res.status(404).json({ error: "Order not found" });
      return ;
    }

    res.status(200).json(order);
    return ;
  } catch (error) {
    logger.error(`❌ GetOrderByIdController Error: ${(error as Error).message}`);
    res.status(500).json({ error: "Server Error" });
    return ;
  }
};

// ✅ Update Order Status
export const updateOrderStatusController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const parsed = updateOrderStatusSchema.safeParse(req.body);

    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.errors });
      return ;
    }

    const updatedOrder = await updateOrderStatusService(id, parsed.data.order_status);
    if (!updatedOrder) {
      res.status(404).json({ error: "Order not found" });
      return ;
    }

    res.status(200).json(updatedOrder);
    return ;
  } catch (error) {
    logger.error(`❌ UpdateOrderStatusController Error: ${(error as Error).message}`);
    res.status(500).json({ error: "Server Error" });
    return ;
  }
};

// ✅ Delete an Order
export const deleteOrderController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteOrderService(id);
    res.status(204).send();
    return ;
  } catch (error) {
    logger.error(`❌ DeleteOrderController Error: ${(error as Error).message}`);
    res.status(500).json({ error: "Server Error" });
    return ;
  }
};
