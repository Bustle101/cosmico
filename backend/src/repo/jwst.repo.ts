import  db  from "../config/db";


export async function saveJwstCache(key: string, value: any, ttlSeconds: number) {
  const json = JSON.stringify(value);

  await db.query(
    `
      INSERT INTO api_cache (key, value, expires_at)
      VALUES ($1, $2::jsonb, NOW() + ($3 || ' seconds')::interval)
      ON CONFLICT (key)
      DO UPDATE SET value = EXCLUDED.value, expires_at = EXCLUDED.expires_at;
    `,
    [key, json, ttlSeconds]
  );
}


export async function loadJwstCache(key: string) {
  const res = await db.query(
    `
      SELECT value::text
      FROM api_cache
      WHERE key = $1
        AND expires_at > NOW()
    `,
    [key]
  );

  if (!res.rows[0]) return null;

  return JSON.parse(res.rows[0].value);
}
