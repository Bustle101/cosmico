import { fetchOsdrDatasetsIndex, fetchOsdrDatasetDetails } from "../clients/osdr.client";
import { loadOsdrCache, saveOsdrCache } from "../repo/osdr.repo";

const CACHE_TTL = 600; // 10 min
const IMAGE_EXT = [".jpg", ".jpeg", ".png", ".tif", ".gif"];



function isImageFile(filename: string): boolean {
  const lower = filename.toLowerCase();
  return IMAGE_EXT.some(ext => lower.endsWith(ext));
}

function normalizeDataset(datasetId: string, details: any) {
  let image: string | null = null;

  if (details.preview_image) {
    image = details.preview_image;
  }

  if (!image && details.files?.length) {
    const img = details.files.find((file: any) =>
      file.file_name && isImageFile(file.file_name)
    );
    if (img?.url) image = img.url;
  }

  return {
    id: datasetId,
    title: details.title || datasetId,
    description: details.description || "OSDR dataset",
    url: `https://visualization.osdr.nasa.gov/biodata/api/v2/dataset/${datasetId}/`,
    image
  };
}



async function limitConcurrency<T>(tasks: (() => Promise<T>)[], limit: number): Promise<T[]> {
  const result: T[] = [];
  const executing: Promise<void>[] = [];

  for (const task of tasks) {
    const p: Promise<void> = task().then((res) => {
      // сохраняем результат
      (result as T[]).push(res);
    });

    executing.push(p);

    // если достигнут лимит - ждём завершения одного промиса
    if (executing.length >= limit) {
      await Promise.race(executing);
      // удаляем завершённые
      for (let i = executing.length - 1; i >= 0; i--) {
        if (executing[i].catch(() => {}) !== executing[i]) {
          executing.splice(i, 1);
        }
      }
    }
  }

  // ждём остальные
  await Promise.all(executing);
  return result;
}



export async function getOsdrService(limit: number = 10) {
  const cacheKey = `osdr:${limit}`;

  const cached = await loadOsdrCache(cacheKey);
  if (cached) return { ok: true, items: cached };

  const index = await fetchOsdrDatasetsIndex();

  if ("error" in index) {
    return { ok: false, error: index.error };
  }

  const datasetIds = Object.keys(index).slice(0, limit);

  // список задач
  const tasks = datasetIds.map(id => async () => {
    const details = await fetchOsdrDatasetDetails(id);
    if ("error" in details) return null;
    return normalizeDataset(id, details);
  });

  // параллельно по limit = 5
  const results = await limitConcurrency(tasks, 5);


  const items = results.filter(Boolean) as any[];

  await saveOsdrCache(cacheKey, items, CACHE_TTL);

  return { ok: true, items };
}
