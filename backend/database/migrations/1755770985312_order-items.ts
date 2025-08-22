// /**
//  * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
//  */
// export const shorthands = undefined;

// /**
//  * @param pgm {import('node-pg-migrate').MigrationBuilder}
//  * @param run {() => void | undefined}
//  * @returns {Promise<void> | void}
//  */

import { MigrationBuilder } from 'node-pg-migrate';

export const up = (pgm: MigrationBuilder) => {
    pgm.createTable("order_items", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },
    order_id: {
      type: "uuid",
      notNull: true,
      references: "orders",
      onDelete: "CASCADE",
    },
    product_id: {
      type: "uuid",
      notNull: true,
      references: "products",
    },
    quantity: {
      type: "integer",
      notNull: true,
      check: "quantity > 0",
    },
    price: {
      type: "numeric(10,2)",
      notNull: true,
      check: "price >= 0",
    },
    created_at: {
      type: "timestamp",
      default: pgm.func("now()"),
    },
    });

    pgm.sql(`
    ALTER TABLE orders RENAME COLUMN product_id TO deprecated_product_id;
    ALTER TABLE orders RENAME COLUMN quantity TO deprecated_quantity;
    ALTER TABLE orders RENAME COLUMN total_price TO total_amount;
    ALTER TABLE orders ALTER COLUMN total_amount SET DEFAULT 0;
  `);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm: MigrationBuilder) => {
    pgm.sql(`
    ALTER TABLE orders ALTER COLUMN total_amount DROP DEFAULT;
    ALTER TABLE orders RENAME COLUMN total_amount TO total_price;
    ALTER TABLE orders RENAME COLUMN deprecated_quantity TO quantity;
    ALTER TABLE orders RENAME COLUMN deprecated_product_id TO product_id;
  `);

    pgm.dropTable("order_items");
};
