import { fetchOsdrFiles } from "../clients/osdr.client";
import { loadOsdrCache, saveOsdrCache } from "../repo/osdr.repo";

const CACHE_TTL = 600;
const MAX_IDS = 30;

const IMAGE_EXT = [".jpg", ".jpeg", ".png", ".tif"];

// нормализация одного файла
function makeFullUrl(remote: string) {
  return "https://osdr.nasa.gov" + remote;
}

export async function getOsdrService(limit: number = 10) {
  const cacheKey = `osdr:${limit}`;
  
  const cached = await loadOsdrCache(cacheKey);
  if (cached) return { ok: true, items: cached };

  const items: any[] = [];

  // пробегаем первые 30 ID
  for (let id = 1; id <= MAX_IDS; id++) {
    const data = await fetchOsdrFiles(id);

    if ("error" in data) {
      // просто пропускаем ID, которых не существует
      continue;
    }

    // данные содержат набор studies внутри объекта
    const studyKeys = Object.keys(data.studies);
    if (studyKeys.length === 0) continue;

    const studyName = studyKeys[0];
    const study = data.studies[studyName];

    if (!study?.study_files?.length) continue;

    // ищем изображение
    const img = study.study_files.find(f =>
      IMAGE_EXT.some(ext => f.file_name.toLowerCase().endsWith(ext))
    );

    items.push({
      id: studyName,
      title: studyName,
      description: `${study.file_count} files`,
      url: `https://osdr.nasa.gov/osdr/data/osd/files/${id}`,
      image: img ? makeFullUrl(img.remote_url) : null
    });

    if (items.length >= limit) break;
  }

  await saveOsdrCache(cacheKey, items, CACHE_TTL);

  return { ok: true, items };
}
