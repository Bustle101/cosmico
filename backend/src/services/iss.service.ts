import { fetchIssPositionRaw } from "../clients/iss.client";
import {
  upsertIssTelemetry,
  getIssHistory,
  getLatestIssTelemetry
} from "../repo/iss.repo";

/**
 * Получить текущие координаты ISS и сохранить в БД
 */
export async function getCurrentIssPosition() {
  const data = await fetchIssPositionRaw();

  if (data.error) return data;

  const pos = {
    lat: parseFloat(data.iss_position.latitude),
    lon: parseFloat(data.iss_position.longitude),
    fetched_at: new Date(data.timestamp * 1000)
  };

  await upsertIssTelemetry(pos);

  return pos;
}

/**
 * История телеметрии ISS за период
 */
export async function getIssHistoryService(from: string, to: string) {
  return await getIssHistory(new Date(from), new Date(to));
}

/**
 * Последняя запись телеметрии
 */
export async function getIssLatest() {
  return await getLatestIssTelemetry();
}


export async function getIssService() {
  const latest = await getIssLatest();

  // Если в базе нет данных — получаем и сохраняем
  if (!latest) {
    return await getCurrentIssPosition();
  }

  return {
    lat: latest.lat,
    lon: latest.lon,
    fetched_at: latest.fetched_at,
    source: "cached"
  };
}
