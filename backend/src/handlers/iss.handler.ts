import { Request, Response } from "express";
import { 
  getCurrentIssPosition, 
  getIssHistoryService, 
  getIssLatest 
} from "../services/iss.service";

export async function getIssPositionHandler(req: Request, res: Response) {
  const data = await getCurrentIssPosition();
  res.locals.data = data;
  return res.json(data);
}

export async function getIssHistoryHandler(req: Request, res: Response) {
  const { from, to } = req.query;

  if (!from || !to) {
    res.locals.error = {
      code: "VALIDATION_ERROR",
      message: "Missing 'from' or 'to' query parameters"
    };
    return res.json(res.locals.error);
  }

  const data = await getIssHistoryService(from as string, to as string);
  res.locals.data = data;
  return res.json(data);
}

export async function getIssLatestHandler(req: Request, res: Response) {
  const data = await getIssLatest();
  res.locals.data = data;
  return res.json(data);
}
