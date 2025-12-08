import { api } from "./axiosClient";

export const getIssPosition = async () => {
  const res = await api.get("/iss/position");
  console.log("📡 RAW RESPONSE:", res.data);
  return res.data.data; // backend отдаёт структуру { ok: true, data: {...} }
};
