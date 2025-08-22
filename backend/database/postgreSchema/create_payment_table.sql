CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  order_id UUID NOT NULL,
  user_id UUID NOT NULL,

  payment_method TEXT CHECK (
    payment_method IN ('stripe', 'flutterwave', 'paystack')) NOT NULL,
  payment_reference TEXT UNIQUE NOT NULL,

  payment_status TEXT CHECK (
    payment_status IN ('pending', 'paid', 'failed', 'refunded')
  ) DEFAULT 'pending',

  amount NUMERIC(10, 2) NOT NULL,
  currency TEXT DEFAULT 'usd',
  verified BOOLEAN DEFAULT false,
  metadata JSONB,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_payment_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  CONSTRAINT fk_payment_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
