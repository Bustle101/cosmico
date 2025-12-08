import axios from "axios";

const http = axios.create({
  baseURL: "http://api.open-notify.org",
  timeout: 5000,
  headers: {
    "User-Agent": "CosmicoBackend/1.0"
  }
});

export async function fetchIssPositionRaw() {
  try {
    const response = await http.get("/iss-now.json");
    return response.data;
  } catch (error) {
    return {
      error: {
        code: "UPSTREAM_ISS_ERROR",
        message: "Failed to fetch ISS position"
      }
    };
  }
}
