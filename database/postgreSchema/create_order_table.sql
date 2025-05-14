CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  user_id UUID NOT NULL,
  product_id UUID NOT NULL,

  quantity INTEGER NOT NULL CHECK (quantity > 0),
  total_price NUMERIC(10, 2) NOT NULL CHECK (total_price >= 0),

  delivery_address TEXT NOT NULL,
  notes TEXT,

  order_status TEXT CHECK (
    order_status IN ('processing', 'shipped', 'delivered', 'cancelled')
  ) DEFAULT 'processing',

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_order_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_order_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
);

