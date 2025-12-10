import axios from "axios";
import { logApiCall } from "../../../core/logger/logger";

const http = axios.create({
  baseURL: "https://api.jwstapi.com",
  timeout: 8000,
  headers: {
    "X-API-KEY": process.env.JWST_API_KEY!,
  }
});

// Универсальная ошибка
function wrapError(err: any) {
  return {
    error: {
      code: "UPSTREAM_JWST_ERROR",
      message: err?.response?.data?.error || err.message
    }
  };
}

// Получить JPG-файлы
export async function fetchJwstImages(limit: number = 20) {
  const url = "/all/type/jpg";

  try {
    const perPage = limit;
    const page = 1;

    const res = await http.get(url, {
      params: { page, perPage }
    });

 
    await logApiCall("jwst", url, true);

    return res.data.body; // важное поле
  } catch (err: any) {
 
    await logApiCall("jwst", url, false, err.message);

    return wrapError(err);
  }
}
