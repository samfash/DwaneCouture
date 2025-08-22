import pool from "../../core/database";
// ✅ Create Payment Record
export const createPayment = async (userId, data, paymentReference) => {
    const result = await pool.query(`
    INSERT INTO payments (order_id, user_id, payment_method, payment_reference, amount, currency)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
    `, [
        data.order_id,
        userId,
        data.payment_method,
        paymentReference,
        data.amount,
        data.currency || "usd",
    ]);
    return result.rows[0];
};
// ✅ Fetch Payment by Order ID
export const getPaymentByOrderId = async (orderId) => {
    const result = await pool.query("SELECT * FROM payments WHERE order_id = $1", [orderId]);
    return result.rowCount ? result.rows[0] : null;
};
// ✅ Fetch Payment by Order ID
export const getPaymentById = async (paymentId) => {
    const result = await pool.query("SELECT * FROM payments WHERE id = $1", [paymentId]);
    return result.rowCount ? result.rows[0] : null;
};
// ✅ Update Payment Status (from webhook/callback)
export const updatePaymentStatus = async (paymentId, status, verified) => {
    const result = await pool.query(`
    UPDATE payments
    SET payment_status = $1, verified = $2, updated_at = CURRENT_TIMESTAMP
    WHERE id = $3
    RETURNING *;
    `, [status, verified, paymentId]);
    return result.rowCount ? result.rows[0] : null;
};
