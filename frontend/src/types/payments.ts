// types/payments.ts

export type PaymentMethod = 'paystack' | 'flutterwave' | 'stripe';

export type PaymentStatus =
  | 'pending'
  | 'completed'
  | 'failed'
  | 'cancelled'
  | 'refunded';

export interface Payment {
  id: string;
  orderId: string;
  userId: string;
  amount: number;
  currency: string;
  method: PaymentMethod;
  status: PaymentStatus;
  reference: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePaymentPayload {
  orderId: string;
  amount: number;
  method: PaymentMethod;
  currency?: string;
}
