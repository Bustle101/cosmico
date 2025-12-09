import { Request, Response } from "express";
import { getAstronomyEventsService } from "../services/astro.service";

export async function getAstronomyEventsHandler(req: Request, res: Response) {
  // Получаем параметры из query
  const { from, to, lat, lon } = req.query;

  // Простая валидация
  if (!from || !to || !lat || !lon) {
    return res.status(400).json({
      ok: false,
      error: {
        code: "BAD_PARAMS",
        message: "Required query params: from (YYYY-MM-DD), to, lat, lon"
      }
    });
  }

  try {
    const result = await getAstronomyEventsService(
      String(from),
      String(to),
      Number(lat),
      Number(lon)
    );
    
   
    if (!result.ok) {
        return res.status(502).json(result); 
    }

    return res.json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ ok: false, message: "Internal Server Error" });
  }
}