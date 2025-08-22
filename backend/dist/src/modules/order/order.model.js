import pool from "../../core/database";
// ✅ Create a new Order
export const createOrder = async (userId, data) => {
    // const result = await pool.query<OrderBase>(
    //   `
    //   INSERT INTO orders (user_id, product_id, quantity, total_price, delivery_address, notes)
    //   SELECT $1, id, $2, (price * $2), $3, $4
    //   FROM products
    //   WHERE id = $5
    //   RETURNING *;
    //   `,
    //   [userId, data.quantity, data.delivery_address, data.notes || null, data.product_id]
    // );
    const productResult = await pool.query(`SELECT price FROM products WHERE id = $1`, [data.product_id]);
    const product = productResult.rows[0];
    if (!product) {
        throw new Error("Product not found");
    }
    const totalPrice = product.price * data.quantity;
    // Step 2: Insert order
    const orderResult = await pool.query(`
    INSERT INTO orders (user_id, product_id, quantity, total_price, delivery_address, notes)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
    `, [
        userId,
        data.product_id,
        data.quantity,
        totalPrice,
        data.delivery_address,
        data.notes || null,
    ]);
    return orderResult.rows[0];
};
// ✅ Fetch a single Order
export const getOrderById = async (orderId) => {
    const result = await pool.query("SELECT * FROM orders WHERE id = $1", [orderId]);
    return result.rowCount ? result.rows[0] : null;
};
// ✅ Fetch all Orders for a User
export const getUserOrders = async (userId) => {
    const result = await pool.query("SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC", [userId]);
    return result.rows;
};
// ✅ Update Order Status (for admin)
export const updateOrderStatus = async (orderId, status) => {
    const result = await pool.query(`
    UPDATE orders
    SET order_status = $1, updated_at = CURRENT_TIMESTAMP
    WHERE id = $2
    RETURNING *;
    `, [status, orderId]);
    return result.rowCount ? result.rows[0] : null;
};
// ✅ Delete Order
export const deleteOrder = async (orderId) => {
    await pool.query("DELETE FROM orders WHERE id = $1", [orderId]);
};
