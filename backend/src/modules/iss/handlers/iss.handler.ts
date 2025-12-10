import { Request, Response } from "express";

import {
  getCurrentIssPosition,
  getIssHistoryService,
  getIssLatest
} from "../services/iss.service";

import { IssHistoryQuery } from "../dto/IssHistoryQuery";
import { validateDto } from "../../../core/validation/validate";

export async function getIssPositionHandler(req: Request, res: Response) {
  const data = await getCurrentIssPosition();
  res.locals.data = data;
  return res.json(data);
}

export async function getIssHistoryHandler(req: Request, res: Response) {

  const errors = await validateDto(IssHistoryQuery, req.query);

  if (errors) {
    res.locals.error = {
      code: "VALIDATION_ERROR",
      message: errors.join("; ")
    };
    return res.json({ ok: false, error: res.locals.error });
  }

  
  const { from, to } = req.query as unknown as IssHistoryQuery;


  
  const data = await getIssHistoryService(from, to);

  res.locals.data = data;
  return res.json(data);
}


export async function getIssLatestHandler(req: Request, res: Response) {
  const data = await getIssLatest();
  res.locals.data = data;
  return res.json(data);
}
