import { Request, Response } from "express";
import Stripe from "stripe";
import axios from "axios";
import {
  createPaymentService,
  getPaymentByOrderService,
  updatePaymentStatusService,
  handlePaymentInitialization,
  handlePaymentVerification,
} from "./payment.service";

import { createPaymentSchema, updatePaymentStatusSchema } from "./payment.validation";
import logger from "../../core/logger";
import config from "../../core/config";

const stripe = new Stripe(config.payment.stripeSecretKey as string);

// ✅ Create a new Payment
export const createPaymentController = async (req: Request, res: Response) => {
  try {
    const parsed = createPaymentSchema.safeParse(req.body);
    if (!parsed.success) {
      console.log(parsed.error);
      res.status(400).json({ error: parsed.error.errors });
      return ;
    }

    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return ;
    }

    const result = await handlePaymentInitialization(userId, parsed.data);
    res.status(201).json(result);
    return ;
  } catch (error) {
    logger.error(`❌ CreatePaymentController Error: ${(error as Error).message}`);
    res.status(500).json({ error: "Server Error" });
    return ;
  }
};


// ✅ Get Payment By ID
export const getPaymentByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const payment = await getPaymentByOrderService(id);

    if (!payment) {
      res.status(404).json({ error: "Payment not found" });
      return ;
    }

    res.status(200).json(payment);
    return ;
  } catch (error) {
    logger.error(`❌ GetPaymentByIdController Error: ${(error as Error).message}`);
    res.status(500).json({ error: "Server Error" });
    return ;
  }
};

// ✅ Update Payment Status
export const updatePaymentStatusController = async (req: Request, res: Response) => {
  try {
    const parsed = updatePaymentStatusSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.errors });
      return ;
    }

    const { method} = req.query;
    const { id } = req.params;

    const result = await handlePaymentVerification(id, method as string, parsed.data.payment_status);
    res.status(result.statusCode).json(result.payload);
    return ;
  } catch (error) {
    logger.error(`❌ UpdatePaymentStatusController Error: ${(error as Error).message}`);
    res.status(500).json({ error: "Server Error" });
    return ;
  }
};
