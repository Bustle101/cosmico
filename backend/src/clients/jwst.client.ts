import axios from "axios";

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
  try {
    const perPage = limit;
    const page = 1;

    const res = await http.get("/all/type/jpg", {
      params: { page, perPage }
    });

    return res.data.body; // важное поле
  } catch (err) {
    return wrapError(err);
  }
}
