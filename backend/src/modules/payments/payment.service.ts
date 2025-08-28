import { CreatePaymentInput, PaymentBase } from "./payment.types";
import * as paymentModel from "./payment.model";
import Stripe from "stripe";
import axios from "axios";
import config from "../../core/config";
import logger from "../../core/logger";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const handlePaymentInitialization = async (userId: string, data: CreatePaymentInput) => {
  const { order_id, total_amount, payment_method } = data;
  let paymentUrl: string | undefined;
  let providerRef: string | undefined;

  switch (payment_method) {
    case "stripe": {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [{
          price_data: {
            currency: "usd",
            product_data: { name: "Order Payment" },
            unit_amount: Math.round(total_amount * 100),
          },
          quantity: 1,
        }],
        mode: "payment",
        success_url: `${config.app.frontendUrl}/success?orderId=${order_id}&Method=${payment_method}`,
        cancel_url: `${config.app.frontendUrl}/success?orderId=${order_id}}&Method=${payment_method}`,
      });
      paymentUrl = session.url ?? "";
      providerRef = session.id;
      break;
    }

    case "paystack": {
      const res = await axios.post(
        "https://api.paystack.co/transaction/initialize",
        {
          email: config.email.mailAddress,
          amount: Math.round(total_amount * 100),
          callback_url: `${config.app.frontendUrl}/success?orderId=${order_id}&Method=${payment_method}`,
        },
        {
          headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
        }
      );
      paymentUrl = res.data.data.authorization_url;
      providerRef = res.data.data.reference;
      break;
    }

    case "flutterwave": {
      const res = await axios.post(
        "https://api.flutterwave.com/v3/payments",
        {
          tx_ref: order_id,
          total_amount,
          currency: "USD",
          redirect_url: `${config.app.frontendUrl}/success?orderId=${order_id}&Method=${payment_method}`,
          customer: { email: config.email.mailAddress },
          customizations: {
            title: "Tailoring App",
            description: "Payment for tailoring order",
          },
        },
        {
          headers: { Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}` },
        }
      );
      paymentUrl = res.data.data.link;
      providerRef = res.data.data.tx_ref;
      break;
    }

    default:
      throw new Error("Unsupported payment method");
  }

  if (!providerRef) {
    throw new Error("Provider reference is undefined");
  }
  const payment = await createPaymentService(userId, data, providerRef);
  return { paymentUrl, payment };
};

// ✅ VERIFY
export const handlePaymentVerification = async (
  orderId: string,
  method: string,
  newStatus: string
): Promise<{ statusCode: number; payload: object }> => {
  let isSuccess = false;

  try {
    const payment = await paymentModel.getPaymentByOrderId(orderId);
    if (!payment || !payment.payment_reference) {
      return { statusCode: 404, payload: { error: "Payment not found" } };
    }

    let ref = payment.payment_reference;

    if (method === "stripe") {
      const paymentIntent = await stripe.paymentIntents.retrieve(ref);
      isSuccess = paymentIntent.status === "succeeded";
    }

    if (method === "paystack") {
      const result = await axios.get(
        `https://api.paystack.co/transaction/verify/${ref}`,
        { headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` } }
      );
      isSuccess = result.data.data.status === "success";
    }

    if (method === "flutterwave") {
      const result = await axios.get(
        `https://api.flutterwave.com/v3/transactions/${ref}/verify`,
        { headers: { Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}` } }
      );
      isSuccess = result.data.status === "success";
    }

    if (!["pending", "paid", "failed", "refunded"].includes(newStatus)) {
      throw new Error(`Invalid payment status: ${newStatus}`);
    }

    if (!isSuccess && newStatus === "paid") {
      newStatus = "failed";
      throw new Error("Payment verification failed");
    }
    const updated = await updatePaymentStatusService(payment.id, newStatus as PaymentBase["payment_status"], true);
    if (!updated) {
      return { statusCode: 404, payload: { error: "Payment not found" } };
    }

    return { statusCode: 200, payload: updated };
  } catch (err) {
    logger.error("❌ Verification Failed", { method, error: err });
    return { statusCode: 500, payload: { error: "Payment verification failed" } };
  }
};

// ✅ Create Payment
export const createPaymentService = async (
  userId: string,
  data: CreatePaymentInput,
  paymentReference: string
) => {
  try {
    const payment = await paymentModel.createPayment(userId, data, paymentReference);
    return payment;
  } catch (err) {
    logger.error("❌ Failed to create payment:", err);
    throw new Error("Payment creation failed");
  }
};

// ✅ Get Payment by Order ID
export const getPaymentByOrderService = async (orderId: string) => {
  const payment = await paymentModel.getPaymentByOrderId(orderId);
  if (!payment) {
    throw new Error("Payment not found");
  }
  return payment;
};

// ✅ Update Payment Status (from webhook callback)
export const updatePaymentStatusService = async (
  paymentId: string,
  status: PaymentBase["payment_status"],
  verified: boolean
) => {
  const updated = await paymentModel.updatePaymentStatus(paymentId, status, verified);
  if (!updated) {
    throw new Error("Payment not found or update failed");
  }
  return updated;
};
