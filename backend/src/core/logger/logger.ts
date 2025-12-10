import { Pool } from "pg";

let db: Pool | null = null;


export function initLogger(pool: Pool) {
  if (process.env.NODE_ENV === "test") {
    console.log("[LOGGER] Running in test mode — DB logging disabled");
    return; 
  }

  db = pool;
}


export async function logApiCall(
  service: string,
  url: string,
  ok: boolean,
  error?: string
) {
  // В тестовой среде логирование отключено полностью
  if (process.env.NODE_ENV === "test") {
    return;
  }

  if (!db) return;

  try {
    await db.query(
      `INSERT INTO api_log (service, url, ok, error) VALUES ($1, $2, $3, $4)`,
      [service, url, ok, error ?? null]
    );
  } catch (e) {
    console.error("⚠ Failed to write API log:", e);
  }
}
