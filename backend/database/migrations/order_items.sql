CREATE TABLE order_items(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id),
    quantity INT NOT NULL CHECK(quantity > 0),
    price NUMERIC(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT now()
);

ALTER TABLE orders
RENAME COLUMN product_id TO deprecated_product_id;

ALTER TABLE orders
RENAME COLUMN quantity TO deprecated_quantity;

-- Or drop and re-add with default 0
ALTER TABLE orders
ALTER COLUMN total_amount SET DEFAULT 0;

-- (Optional) later you can drop these:
ALTER TABLE orders DROP COLUMN deprecated_product_id, DROP COLUMN deprecated_quantity;

