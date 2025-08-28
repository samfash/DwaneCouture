export interface PaymentBase {
    id: string;
    order_id: string;
    user_id: string;
    payment_method: "stripe" | "paystack" | "flutterwave";
    payment_reference: string;
    payment_status: "pending" | "paid" | "failed" | "refunded";
    amount: number;
    currency: string;
    verified: boolean;
    metadata?: object;
    created_at: Date;
    updated_at: Date;
  }
  
  // When initiating a payment (client-side)
  export interface CreatePaymentInput {
    order_id: string;
    payment_method: "stripe" | "paystack" | "flutterwave";
    total_amount: number;
    currency?: string;
  }
  