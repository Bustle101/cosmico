import axios from "axios";
import { OsdrFileResponse } from "../domain/osdr.types";

const BASE = "https://osdr.nasa.gov";

const http = axios.create({
  baseURL: BASE,
  timeout: 10000,
  headers: {
    "User-Agent": "CosmicoBackend/1.0"
  }
});

// запрос данных по OSDR ID
export async function fetchOsdrFiles(id: number): Promise<OsdrFileResponse | { error: any }> {
  try {
    const url = `/osdr/data/osd/files/${id}`;
    const res = await http.get(url);

    return res.data as OsdrFileResponse;
  } catch (err: any) {
    return {
      error: {
        code: "OSDR_LIST_ERROR",
        message: err.message
      }
    };
  }
}
