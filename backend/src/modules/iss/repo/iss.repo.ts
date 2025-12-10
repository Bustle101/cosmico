import  db  from "../../../core/config/db";
import { IssPosition } from "../domain/iss.types";

export async function upsertIssTelemetry(pos: IssPosition) {
  await db.query(
    `
    INSERT INTO iss_telemetry (timestamp, lat, lon, altitude, velocity)
    VALUES ($1, $2, $3, $4, $5)
    ON CONFLICT (timestamp)
    DO UPDATE SET 
      lat = EXCLUDED.lat,
      lon = EXCLUDED.lon,
      altitude = EXCLUDED.altitude,
      velocity = EXCLUDED.velocity;
  `,
    [
      pos.fetched_at,
      pos.lat,
      pos.lon,
      pos.altitude || null,
      pos.velocity || null
    ]
  );
}

export async function getIssHistory(from: Date, to: Date) {
  const res = await db.query(
    `
    SELECT timestamp, lat, lon, altitude, velocity
    FROM iss_telemetry
    WHERE timestamp BETWEEN $1 AND $2
    ORDER BY timestamp ASC
  `,
    [from, to]
  );

  return res.rows;
}

export async function getLatestIssTelemetry() {
  const res = await db.query(
    `
    SELECT *
    FROM iss_telemetry
    ORDER BY timestamp DESC
    LIMIT 1
  `
  );

  return res.rows[0] || null;
}
