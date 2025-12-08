import { Request, Response } from "express";
import { getOsdrService } from "../services/osdr.service";

export async function getOsdrHandler(req: Request, res: Response) {
  const limit = Number(req.query.limit) || 10;

  const result = await getOsdrService(limit);

  return res.json(result);
}
