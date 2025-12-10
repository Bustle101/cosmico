import axios from "axios";
import { logApiCall } from "../../../core/logger/logger";

const http = axios.create({
  baseURL: "http://api.open-notify.org",
  timeout: 5000,
  headers: {
    "User-Agent": "CosmicoBackend/1.0"
  }
});

export async function fetchIssPositionRaw() {
  const url = "/iss-now.json";

  try {
    const response = await http.get(url);

    // лог успешного вызова
    await logApiCall("iss", url, true);

    return response.data;
  } catch (error: any) {
    // лог ошибки
    await logApiCall("iss", url, false, error.message);

    return {
      error: {
        code: "UPSTREAM_ISS_ERROR",
        message: "Failed to fetch ISS position"
      }
    };
  }
}
