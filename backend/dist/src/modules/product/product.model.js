import pool from "../../core/database";
// ✅ Create a new product
export const createProduct = async (input) => {
    const { name, description, category, price, image_url } = input;
    const result = await pool.query(`
    INSERT INTO products (name, description, category, price, image_url)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    `, [name, description || null, category, price, image_url]);
    return result.rows[0];
};
// ✅ Get all products
export const getAllProducts = async (category) => {
    let query = "SELECT * FROM products";
    const values = [];
    if (category) {
        query += " WHERE category = $1";
        values.push(category);
    }
    query += " ORDER BY created_at DESC";
    const result = await pool.query(query, values);
    return result.rows;
};
// ✅ Get single product by ID
export const getProductById = async (id) => {
    const result = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
    return result.rows.length ? result.rows[0] : null;
};
// ✅ Update product
export const updateProduct = async (id, updates) => {
    const existing = await getProductById(id);
    if (!existing)
        return null;
    const updated = {
        ...existing,
        ...updates,
    };
    const result = await pool.query(`
    UPDATE products
    SET name = $1, description = $2, category = $3, price = $4, image_url = $5, updated_at = CURRENT_TIMESTAMP
    WHERE id = $6
    RETURNING *
    `, [
        updated.name,
        updated.description,
        updated.category,
        updated.price,
        updated.image_url,
        id,
    ]);
    return result.rows[0];
};
// ✅ Delete product
export const deleteProduct = async (id) => {
    const result = await pool.query("DELETE FROM products WHERE id = $1", [id]);
    return result.rowCount !== null && result.rowCount > 0;
};
