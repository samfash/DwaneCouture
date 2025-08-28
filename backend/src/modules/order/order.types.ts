export interface OrderBase {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  total_price: number;
  delivery_address: string;
  notes?: string;
  order_status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  created_at: Date;
  updated_at: Date;
}
  
export interface OrderItemInput {
  product_id: string;
  quantity: number;
  price: number; // frontend must send price or fetch from db
}

export interface CreateOrderInput {
  delivery_address: string;
  notes?: string;
  items: OrderItemInput[];
}

export interface OrderResponse {
  id: string;
  user_id: string;
  total_amount: number;
  delivery_address: string;
  notes?: string;
  order_status: string;
  created_at: string;
  updated_at: string;
  items: {
    id: string;
    product_id: string;
    quantity: number;
    price: number;
  }[];
}