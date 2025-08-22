// src/modules/profiles/profile.model.ts
import pool from "../../core/database";
// Create profile
export const createProfile = async (profile) => {
    const query = `
    INSERT INTO profiles (user_id, full_name, gender, delivery_address)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
    const values = [profile.user_id, profile.full_name, profile.gender, profile.delivery_address];
    const { rows } = await pool.query(query, values);
    return rows[0];
};
// Create gender-specific measurements
export const createMaleMeasurements = async (profileId, measurements) => {
    const keys = Object.keys(measurements);
    const values = Object.values(measurements);
    const columns = keys.map(k => k.replace(/[A-Z]/g, l => `_${l.toLowerCase()}`)).join(", ");
    const placeholders = keys.map((_, i) => `$${i + 2}`).join(", ");
    const query = `
    INSERT INTO male_measurements (profile_id, ${columns})
    VALUES ($1, ${placeholders});
  `;
    await pool.query(query, [profileId, ...values]);
};
export const createFemaleMeasurements = async (profileId, measurements) => {
    const keys = Object.keys(measurements);
    const values = Object.values(measurements);
    const columns = keys.map(k => k.replace(/[A-Z]/g, l => `_${l.toLowerCase()}`)).join(", ");
    const placeholders = keys.map((_, i) => `$${i + 2}`).join(", ");
    const query = `
    INSERT INTO female_measurements (profile_id, ${columns})
    VALUES ($1, ${placeholders});
  `;
    await pool.query(query, [profileId, ...values]);
};
//get profile
export const getProfile = async (profileId) => {
    const query = `SELECT * FROM profiles WHERE id = $1`;
    const { rows } = await pool.query(query, [profileId]);
    return rows[0] || null;
};
// Get profile + measurements
export const getProfileWithMeasurements = async (userId) => {
    const profileQuery = `SELECT * FROM profiles WHERE user_id = $1`;
    const { rows: profiles } = await pool.query(profileQuery, [userId]);
    if (!profiles.length)
        return null;
    const profile = profiles[0];
    let measurements = null;
    if (profile.gender === "male") {
        const { rows } = await pool.query(`SELECT * FROM male_measurements WHERE profile_id = $1`, [profile.id]);
        measurements = rows[0];
    }
    else {
        const { rows } = await pool.query(`SELECT * FROM female_measurements WHERE profile_id = $1`, [profile.id]);
        measurements = rows[0];
    }
    return { profile, measurements };
};
// Update profile
export const updateProfile = async (profileId, updates) => {
    const keys = Object.keys(updates);
    const values = Object.values(updates);
    const setClause = keys.map((key, i) => `${key} = $${i + 2}`).join(", ");
    const query = `UPDATE profiles SET ${setClause} WHERE id = $1 RETURNING *`;
    const { rows } = await pool.query(query, [profileId, ...values]);
    return rows[0];
};
export const updateMaleMeasurements = async (profileId, updates) => {
    const keys = Object.keys(updates);
    const values = Object.values(updates);
    if (keys.length === 0)
        return;
    const setters = keys.map((key, i) => `${key} = $${i + 1}`).join(", ");
    const query = `UPDATE male_measurements SET ${setters} WHERE profile_id = $${keys.length + 1}`;
    await pool.query(query, [...values, profileId]);
};
export const updateFemaleMeasurements = async (profileId, updates) => {
    const keys = Object.keys(updates);
    const values = Object.values(updates);
    if (keys.length === 0)
        return;
    const setters = keys.map((key, i) => `${key} = $${i + 1}`).join(", ");
    const query = `UPDATE female_measurements SET ${setters} WHERE profile_id = $${keys.length + 1}`;
    await pool.query(query, [...values, profileId]);
};
