import { fetchJwstImages } from "../clients/jwst.client";
import { saveJwstCache, loadJwstCache } from "../repo/jwst.repo";

const CACHE_TTL = 600; // 10 мин TTL для кеша API
const FEATURED_ROTATION_TIME = 10 * 60 * 1000; // 10 мин обновление featured

let featuredList: any[] = [];  // изображения для ротации
let featuredIndex = 0;         // текущий индекс featured
let lastFeaturedUpdate = 0;    // время последнего переключения

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

/* -------------------------------------------------------------------
    🎨 Основной сервис — галерея изображений (с кешированием)
-------------------------------------------------------------------- */
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

/* -------------------------------------------------------------------
    🌟 NEW: Featured Observation — по очереди каждые 10 минут
-------------------------------------------------------------------- */
export async function getFeaturedJwstObservation() {
  const now = Date.now();

  // Если список пуст — загружаем его один раз
  if (featuredList.length === 0) {
    const result = await getJwstImagesService(30); // 30 изображений для ротации

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

  // Проверяем, прошло ли 10 минут
  if (now - lastFeaturedUpdate > FEATURED_ROTATION_TIME) {
    featuredIndex = (featuredIndex + 1) % featuredList.length;
    lastFeaturedUpdate = now;
  }

  return {
    ok: true,
    item: featuredList[featuredIndex]
  };
}
