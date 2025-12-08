import { Request, Response } from "express";
import { getFeedService } from "../services/feed.service";

export async function getFeedHandler(req: Request, res: Response) {
  const limit = Number(req.query.limit) || 20;

  const data = await getFeedService(limit);

  return res.json(data);
}
