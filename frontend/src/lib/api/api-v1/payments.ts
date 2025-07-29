import { fetcher } from './api';

export const createPayment = (data: unknown) =>
  fetcher(`/api/payments`, 'POST', data);

export const getPayment = (orderId: string) =>
  fetcher(`/api/payments/${orderId}`, 'GET', undefined);

export const updatePaymentStatus = (
  orderId: string,
  status: string,
  method: 'paystack' | 'flutterwave' | 'stripe'
) =>
  fetcher(`/api/payments/${orderId}?method=${method}`, 'PATCH', { payment_status: status });
