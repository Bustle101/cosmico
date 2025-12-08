import { fetchJwstImages } from "../clients/jwst.client";
import { saveJwstCache, loadJwstCache } from "../repo/jwst.repo";

const CACHE_TTL = 600;

function normalizeJwst(item: any) {
  return {
    id: item.id,
    title: item.details?.description || "JWST Image",
    description: item.details?.description || "",
    instrument: Array.isArray(item.details?.instruments)
      ? item.details.instruments.map((i: any) => i.instrument).join(", ")
      : "",
    url: item.location,
    thumbnail_url: item.thumbnail || item.location,
    suffix: item.details?.suffix || "",
    program: item.program
  };
}

export async function getJwstImagesService(limit: number = 20) {
  const cacheKey = `jwst:${limit}`;

  const cached = await loadJwstCache(cacheKey);
  if (cached) {
    return { ok: true, items: cached };
  }

  const raw = await fetchJwstImages(limit);

  if ((raw as any).error) {
    return { ok: false, error: raw.error };
  }

  const normalized = (raw as any[]).map((item: any) => normalizeJwst(item));

  await saveJwstCache(cacheKey, normalized, CACHE_TTL);

  return { ok: true, items: normalized };
}
