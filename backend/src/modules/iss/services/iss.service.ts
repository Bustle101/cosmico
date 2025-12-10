import { fetchIssPositionRaw } from "../clients/iss.client";
import {
  upsertIssTelemetry,
  getIssHistory,
  getLatestIssTelemetry
} from "../repo/iss.repo";


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


export async function getIssHistoryService(from: string, to: string) {
  return await getIssHistory(new Date(from), new Date(to));
}


export async function getIssLatest() {
  return await getLatestIssTelemetry();
}


export async function getIssService() {
  const latest = await getIssLatest();

 
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
