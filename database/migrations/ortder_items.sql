CREATE TABLE order_items(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id),
    quantity INT NOT NULL CHECK(quantity > 0)
)

ALTER TABLE orders
RENAME COLUMN product_id TO deprecated_product_id;

ALTER TABLE orders
RENAME COLUMN quantity TO deprecated_quantity;
