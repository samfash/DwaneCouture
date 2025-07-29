import { fetcher } from './api_v2';
import type {
  Payment,
  CreatePaymentPayload,
  PaymentStatus,
  PaymentMethod,
} from '@/src/types/payments';

// Create payment
export const createPayment = (data: CreatePaymentPayload) =>
  fetcher.post<Payment>(`/api/payments`, data);

// Get payment by order ID
export const getPayment = (orderId: string) =>
  fetcher.get<{ payment: Payment }>(`/api/payments/${orderId}`);

// Update payment status
export const updatePaymentStatus = (
  orderId: string,
  status: PaymentStatus,
  method: PaymentMethod
) =>
  fetcher.patch<Payment>(
    `/api/payments/${orderId}?method=${method}`,
    { payment_status: status }
  );
