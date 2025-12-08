import { Request, Response } from "express";
import { getCurrentIssPosition, getIssHistoryService, getIssLatest } from "../services/iss.service";

export async function getIssPositionHandler(req: Request, res: Response) {
  const data = await getCurrentIssPosition();
  res.json(data);
}

export async function getIssHistoryHandler(req: Request, res: Response) {
  const { from, to } = req.query;

  if (!from || !to) {
    return res.json({
      error: {
        code: "VALIDATION_ERROR",
        message: "Missing 'from' or 'to' query parameters"
      }
    });
  }

  const data = await getIssHistoryService(from as string, to as string);
  res.json(data);
}

export async function getIssLatestHandler(req: Request, res: Response) {
  const data = await getIssLatest();
  res.json(data);
}
