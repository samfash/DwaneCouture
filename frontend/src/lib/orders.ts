import { fetcher } from './api';

export const createOrder = (order: unknown) =>
  fetcher(`/api/orders`, 'POST', order);

export const getOrders = () =>
  fetcher(`/api/orders`, 'GET', undefined);

export const getOrderById = (orderId: string) =>
  fetcher(`/api/orders/${orderId}`, 'GET', undefined);

export const updateOrderStatus = (orderId: string, order_status: string) =>
  fetcher(`/api/orders/${orderId}`, 'PATCH', { order_status });

export const deleteOrder = (orderId: string) =>
  fetcher(`/api/orders/${orderId}`, 'DELETE', undefined);
