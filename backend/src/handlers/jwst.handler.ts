import { Request, Response } from "express";
import { getJwstImagesService } from "../services/jwst.service";

export async function getJwstImagesHandler(req: Request, res: Response) {
  const limit = Number(req.query.limit) || 20;

  const result = await getJwstImagesService(limit);

  // Ошибка сервиса — пробрасываем в middleware
  if (!result.ok) {
    return res.json({
      error: result.error
    });
  }

  // Успех — возвращаем данные (middleware сам добавит ok: true)
  return res.json({
    items: result.items
  });
}
