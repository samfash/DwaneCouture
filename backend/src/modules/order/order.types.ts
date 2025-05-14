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
  
  // When creating an order (client does not send id, created_at, updated_at)
  export interface CreateOrderInput {
    product_id: string;
    quantity: number;
    delivery_address: string;
    notes?: string;
  }
  