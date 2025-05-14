import { Pool } from "pg";
import config from "./config";

const pool = new Pool({
  user: config.database.user,
  host: config.database.host,
  database: config.database.name,
  password: config.database.password,
  port: config.database.port,
  idleTimeoutMillis: 1000, // ✅ Close idle clients after 1 second
  connectionTimeoutMillis: 5000,
});

pool.on("connect", () => {
  console.log("✅ PostgreSQL Pool Connected Successfully!");
  console.log("🌍 NODE_ENV:", process.env.NODE_ENV);
});

pool.on("error", (err) => {
  console.error("❌ Unexpected error on idle client", err);
  process.exit(-1);
});


export default pool;
