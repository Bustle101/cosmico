import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function connectWithRetry() {
  try {
    await pool.connect();
    console.log("[DB] Connected to PostgreSQL");
  } catch (err) {
    console.log("[DB] Waiting for PostgreSQL... retrying in 3s");
    setTimeout(connectWithRetry, 3000);
  }
}

connectWithRetry();

export const db = pool;
