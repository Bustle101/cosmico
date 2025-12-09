import { Pool } from "pg";

let db: any = null;


if (process.env.NODE_ENV === "test") {
  console.log("[DB] Using mock DB (test mode)");
  db = {
    query: async () => ({ rows: [] }),
  };
} 
else {
  try {
    db = new Pool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    console.log("[DB] Pool created");

  } catch (err) {
    console.error("[DB] Failed to initialize DB:", err);
 
  }
}

export default db;
