import { api } from "./axiosClient";

export async function getJwstFeatured() {
  const res = await api.get("/jwst/featured");

  // безопасно получаем "item"
  return res.data?.data?.item ?? null;
}

export async function getJwstImages(limit = 20) {
  const res = await api.get("/jwst/images", { params: { limit } });

  return res.data?.data?.items ?? [];
}
