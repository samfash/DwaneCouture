import { fetcher } from './api';

export const createPayment = (token: string, data: unknown) =>
  fetcher(`/api/payments`, 'POST', data, token);

export const getPayment = (token: string, orderId: string) =>
  fetcher(`/api/payments/${orderId}`, 'GET', undefined, token);

export const updatePaymentStatus = (
  token: string,
  orderId: string,
  status: string,
  method: 'paystack' | 'flutterwave' | 'stripe'
) =>
  fetcher(`/api/payments/${orderId}?method=${method}`, 'PATCH', { payment_status: status }, token);
