// types/orders.ts

export type OrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled';

export type Order = {
  id: string;
  userId: string;
  profileId: string;
  totalAmount: number;
  status: OrderStatus;
  items: Array<{
    productId: string;
    quantity: number;
  }>;
  createdAt: string;
  updatedAt: string;
};

export type CreateOrderPayload = {
  profileId: string;
  items: Array<{
    productId: string;
    quantity: number;
  }>;
  totalAmount: number;
};

export type UpdateOrderStatusPayload = {
  order_status: OrderStatus;
};
