import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Перехват успешных ответов
api.interceptors.response.use(
  (response) => {

    if (response.data && response.data.ok === false) {
      console.error("API Error:", response.data.error);
      throw new Error(response.data.error?.message || "Unknown API error");
    }
    return response;
  },
  (error) => {
    console.error("NETWORK ERROR:", error);
    throw error;
  }
);
