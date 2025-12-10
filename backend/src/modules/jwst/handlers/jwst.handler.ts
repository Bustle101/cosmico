import { Request, Response } from "express";
import {
  getJwstImagesService,
  getFeaturedJwstObservation
} from "../services/jwst.service";

import { validateDto } from "../../../core/validation/validate";
import { JwstImagesQuery } from "../dto/JwstImagesQuery";

export async function getJwstImagesHandler(req: Request, res: Response) {

  const errors = await validateDto(JwstImagesQuery, req.query);

  if (errors) {
    res.locals.error = {
      code: "VALIDATION_ERROR",
      message: errors.join("; ")
    };
    return res.json({ ok: false, error: res.locals.error });
  }

 
  const { limit } = req.query as unknown as JwstImagesQuery;


  const result = await getJwstImagesService(Number(limit));

  if (!result.ok) {
    res.locals.error = {
      code: result.error.code ?? "JWST_API_ERROR",
      message: result.error.message ?? "Failed to fetch JWST images"
    };
    return res.json({ ok: false, error: res.locals.error });
  }

  res.locals.data = { items: result.items };
  return res.json({ ok: true, data: res.locals.data });
}


export async function getJwstFeaturedHandler(req: Request, res: Response) {
  const result = await getFeaturedJwstObservation();

  if (!result.ok) {
    res.locals.error = {
      code: "JWST_FEATURED_ERROR",
      message: "Unable to load featured JWST observation"
    };
    return res.json({ ok: false, error: res.locals.error });
  }

  res.locals.data = { item: result.item };
  return res.json({ ok: true, data: res.locals.data });
}
