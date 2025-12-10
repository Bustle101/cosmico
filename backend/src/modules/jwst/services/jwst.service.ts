import { fetchJwstImages } from "../clients/jwst.client";
import { saveJwstCache, loadJwstCache } from "../repo/jwst.repo";

const CACHE_TTL = 600; 
const FEATURED_ROTATION_TIME = 10 * 60 * 1000; 

let featuredList: any[] = [];  
let featuredIndex = 0;         
let lastFeaturedUpdate = 0;    

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

  // пробуем взять кеш
  const cached = await loadJwstCache(cacheKey);
  if (cached) {
    return { ok: true, items: cached };
  }

  // тянем данные с API
  const raw = await fetchJwstImages(limit);
  if ((raw as any).error) {
    return { ok: false, error: raw.error };
  }

  const normalized = (raw as any[]).map((item: any) => normalizeJwst(item));

  // сохраняем в кеш
  await saveJwstCache(cacheKey, normalized, CACHE_TTL);

  return { ok: true, items: normalized };
}


export async function getFeaturedJwstObservation() {
  const now = Date.now();


  if (featuredList.length === 0) {
    const result = await getJwstImagesService(30); 

    if (!result.ok || !result.items.length) {
      return {
        ok: false,
        error: "Unable to load JWST images for rotation"
      };
    }

    featuredList = result.items;
    featuredIndex = 0;
    lastFeaturedUpdate = now;
  }

  
  if (now - lastFeaturedUpdate > FEATURED_ROTATION_TIME) {
    featuredIndex = (featuredIndex + 1) % featuredList.length;
    lastFeaturedUpdate = now;
  }

  return {
    ok: true,
    item: featuredList[featuredIndex]
  };
}
