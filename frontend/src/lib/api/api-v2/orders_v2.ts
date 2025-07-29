import { fetcher } from './api_v2';
import type {
  Order,
  OrderStatus,
  CreateOrderPayload
} from '@/src/types/orders';

// Create new order
export const createOrder = (order: CreateOrderPayload) =>
  fetcher.post<Order>('/api/orders', order);

// Get all orders
export const getOrders = () =>
  fetcher.get<{ orders: Order[] }>('/api/orders');

// Get single order
export const getOrderById = (orderId: string) =>
  fetcher.get<{ order: Order }>(`/api/orders/${orderId}`);

// Update order status
export const updateOrderStatus = (orderId: string, status: OrderStatus) =>
  fetcher.patch<Order>(`/api/orders/${orderId}`,{ order_status: status });

// Delete order
export const deleteOrder = (orderId: string) =>
  fetcher.delete<void>(`/api/orders/${orderId}`);
