import bcrypt from "bcryptjs";
import pool from "../../core/database";
export const createAdminUser = async (email, password) => {
    const hashed = await bcrypt.hash(password, 10);
    const query = `
    INSERT INTO users (id, email, password, role)
    VALUES (gen_random_uuid(), $1, $2, 'admin')
    RETURNING *;
  `;
    const values = [email, hashed];
    const result = await pool.query(query, values);
    return result.rows[0];
};
