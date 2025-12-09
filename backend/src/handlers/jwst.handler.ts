import { Request, Response } from "express";
import {
  getJwstImagesService,
  getFeaturedJwstObservation
} from "../services/jwst.service";


export async function getJwstImagesHandler(req: Request, res: Response) {
  const limit = Number(req.query.limit) || 20;

  const result = await getJwstImagesService(limit);

  if (!result.ok) {
    return res.json({ error: result.error });
  }

  return res.json({ items: result.items });
}


export async function getJwstFeaturedHandler(req: Request, res: Response) {
  const result = await getFeaturedJwstObservation();

  if (!result.ok) {
    return res.json({ error: result.error });
  }

  return res.json({
    item: result.item
  });
}
