import { fetcher } from './api';

export const createOrder = (token: string, order: unknown) =>
  fetcher(`/api/orders`, 'POST', order, token);

export const getOrders = (token: string) =>
  fetcher(`/api/orders`, 'GET', undefined, token);

export const getOrderById = (token: string, orderId: string) =>
  fetcher(`/api/orders/${orderId}`, 'GET', undefined, token);

export const updateOrderStatus = (token: string, orderId: string, order_status: string) =>
  fetcher(`/api/orders/${orderId}`, 'PATCH', { order_status }, token);

export const deleteOrder = (token: string, orderId: string) =>
  fetcher(`/api/orders/${orderId}`, 'DELETE', undefined, token);
