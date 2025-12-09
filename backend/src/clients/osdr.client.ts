import axios from "axios";
import { logApiCall } from "../utils/logger";

// Универсальный тип ошибки
export interface OsdrError {
  code: string;
  message: string;
}

// Тип ответа списка датасетов
export interface OsdrDatasetsIndex {
  [key: string]: {
    REST_URL: string;
  };
}

// Детальный ответ по датасету
export interface OsdrDatasetDetails {
  id: string;
  title?: string;
  description?: string;
  preview_image?: string;
  files?: any[];
  groups?: any[];
  categories?: any[];
  [key: string]: any;
}

// Базовый URL API
const BASE = "https://visualization.osdr.nasa.gov/biodata/api/v2";

const http = axios.create({
  baseURL: BASE,
  timeout: 10000,
  headers: {
    "User-Agent": "CosmicoBackend/1.0"
  }
});


export async function fetchOsdrDatasetsIndex():
  Promise<OsdrDatasetsIndex | { error: OsdrError }> {

  const url = "/datasets/?format=json";

  try {
    const res = await http.get(url);

    // Логируем успешный запрос
    await logApiCall("osdr", url, true);

    return res.data as OsdrDatasetsIndex;

  } catch (err: any) {

    // Логируем ошибку
    await logApiCall("osdr", url, false, err.message);

    return {
      error: {
        code: "OSDR_INDEX_ERROR",
        message: err.message
      }
    };
  }
}

/**
 * Получить детали конкретного датасета OSDR.
 *
 * @param datasetId — например "OSD-1"
 */
export async function fetchOsdrDatasetDetails(
  datasetId: string
): Promise<OsdrDatasetDetails | { error: OsdrError }> {

  const url = `/dataset/${datasetId}/`;

  try {
    const res = await http.get(url);

    // Логируем успешный запрос
    await logApiCall("osdr", url, true);

    return res.data as OsdrDatasetDetails;

  } catch (err: any) {

    // Логируем ошибку
    await logApiCall("osdr", url, false, err.message);

    return {
      error: {
        code: "OSDR_DATASET_ERROR",
        message: err.message
      }
    };
  }
}
