import { db } from "../config/db";

// сохранить кэш
export async function saveOsdrCache(key: string, value: any, ttlSeconds: number) {
  await db.query(
    `
      INSERT INTO api_cache (key, value, expires_at)
      VALUES ($1, $2, NOW() + ($3 || ' seconds')::interval)
      ON CONFLICT (key)
      DO UPDATE SET value = EXCLUDED.value, expires_at = EXCLUDED.expires_at;
    `,
    [key, JSON.stringify(value), ttlSeconds]
  );
}

// загрузить кэш
export async function loadOsdrCache(key: string) {
  const res = await db.query(
    `
      SELECT value
      FROM api_cache
      WHERE key = $1
        AND expires_at > NOW()
    `,
    [key]
  );

  return res.rows[0]?.value || null;
}
