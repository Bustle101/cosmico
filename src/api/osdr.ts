// src/api/osdr.ts
import { api } from "./axiosClient";

export interface OsdrApiError {
  code: string;
  message: string;
}

export interface OsdrItem {
  id: string;
  title: string;
  description: string;
  image: string | null;
  url: string;
}

export interface OsdrApiResponse {
  ok: boolean;
  items?: OsdrItem[];
  error?: OsdrApiError;
}

export async function getOsdrDatasets(limit: number = 12): Promise<OsdrApiResponse> {
  try {
    // ВАЖНО: ведущий слэш обязателен
    const response = await api.get(`/osdr/datasets?limit=${limit}`);
    return response.data as OsdrApiResponse;
  } catch (err: any) {
    return {
      ok: false,
      error: {
        code: "NETWORK_ERROR",
        message: err.message || "Failed to fetch datasets",
      },
    };
  }
}

export async function getOsdrDatasetDetails(id: string) {
  console.warn("Dataset details not implemented yet.");
  return null;
}
