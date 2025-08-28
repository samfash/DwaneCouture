import pool from "../../core/database";
import { CreateOrderInput, OrderBase, OrderItemInput, OrderResponse } from "./order.types";
import { CreateOrderDTO } from "./order.validation";

// ✅ Create a new Order
export const createOrder = async (
  userId: string,
  data: CreateOrderDTO
): Promise<OrderBase> => {
  try{
    await pool.query("BEGIN");

  // Step 1: Insert order row with initial total_amount = 0
    const orderRes = await pool.query(
      `INSERT INTO orders (user_id, delivery_address, notes, total_amount)
       VALUES ($1, $2, $3, 0)
       RETURNING *`,
      [userId, data.delivery_address, data.notes ?? null]
    );
    const order = orderRes.rows[0];

    // Step 2: Insert order_items
    let totalAmount = 0;
    for (const item of data.items) {
      const itemTotal = Number(item.price) * item.quantity;
      totalAmount += itemTotal;

      await pool.query(
        `INSERT INTO order_items (order_id, product_id, quantity, price)
         VALUES ($1, $2, $3, $4)`,
        [order.id, item.product_id, item.quantity, Number(item.price)]
      );
    }


    // Step 3: Update total_amount
    const updatedOrderRes = await pool.query(
      `UPDATE orders SET total_amount = $1::numeric WHERE id = $2 RETURNING *`,
      [totalAmount, order.id]
    );

    const updatedOrder = updatedOrderRes.rows[0];

    await pool.query("COMMIT");

    // Step 4: Fetch back with items
    const itemsRes = await pool.query(
      `SELECT id, product_id, quantity, price
       FROM order_items WHERE order_id = $1`,
      [order.id]
    );

  return { ...updatedOrder, items: itemsRes.rows };
  } catch (err) {
    await pool.query("ROLLBACK");
    throw err;
  }
};

// ✅ Fetch a single Order
export const getOrderById = async (orderId: string): Promise<OrderResponse | null> => {
  const orderRes = await pool.query(
    "SELECT * FROM orders WHERE id = $1",
    [orderId]
  );

  if (!orderRes.rowCount) return null;
  const order = orderRes.rows[0];

  const itemsRes = await pool.query(
    `SELECT id, product_id, quantity, price
     FROM order_items
     WHERE order_id = $1`,
    [orderId]
  );
  return { ...order, items: itemsRes.rows };
;
};

// ✅ Fetch all Orders for a User
export const getUserOrders = async (userId: string): Promise<OrderBase[]> => {
  const result = await pool.query<OrderBase>(
    "SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC",
    [userId]
  );
  
  return result.rows;
};

// export const getUserOrders = async (userId: string): Promise<OrderResponse[]> => {
//   const result = await pool.query(
//     `
//     SELECT 
//       o.id AS order_id,
//       o.user_id,
//       o.total_price,
//       o.delivery_address,
//       o.notes,
//       o.order_status,
//       o.created_at,
//       o.updated_at,
//       oi.id AS item_id,
//       oi.product_id,
//       oi.quantity,
//       oi.price
//     FROM orders o
//     LEFT JOIN order_items oi ON o.id = oi.order_id
//     WHERE o.user_id = $1
//     ORDER BY o.created_at DESC;
//     `,
//     [userId]
//   );

//   // Group rows by order_id
//   const ordersMap: Record<string, OrderResponse> = {};

//   for (const row of result.rows) {
//     if (!ordersMap[row.order_id]) {
//       ordersMap[row.order_id] = {
//         id: row.order_id,
//         user_id: row.user_id,
//         total_amount: row.total_price,
//         delivery_address: row.delivery_address,
//         notes: row.notes,
//         order_status: row.order_status,
//         created_at: row.created_at,
//         updated_at: row.updated_at,
//         items: []
//       };
//     }

//     if (row.item_id) {
//       ordersMap[row.order_id].items.push({
//         id: row.item_id,
//         product_id: row.product_id,
//         quantity: row.quantity,
//         price: row.price
//       });
//     }
//   }

//   return Object.values(ordersMap);
// };

// ✅ Update Order Status (for admin)
export const updateOrderStatus = async (
  orderId: string,
  status: OrderBase["order_status"]
): Promise<OrderBase | null> => {
  const result = await pool.query<OrderBase>(
    `
    UPDATE orders
    SET order_status = $1, updated_at = CURRENT_TIMESTAMP
    WHERE id = $2
    RETURNING *;
    `,
    [status, orderId]
  );
  return result.rowCount ? result.rows[0] : null;
};

// ✅ Delete Order
export const deleteOrder = async (orderId: string): Promise<void> => {
  await pool.query(
    "DELETE FROM orders WHERE id = $1",
    [orderId]
  );
};
