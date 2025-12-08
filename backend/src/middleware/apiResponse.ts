import { Request, Response, NextFunction } from "express";
import { v4 as uuid } from "uuid";

export function apiResponseMiddleware(req: Request, res: Response, next: NextFunction) {
  const oldJson = res.json;

  res.json = function (data: any) {
    if (data?.error) {
      return oldJson.call(res, {
        ok: false,
        error: {
          code: data.error.code || "INTERNAL_ERROR",
          message: data.error.message,
          trace_id: uuid()
        }
      });
    }

    return oldJson.call(res, { ok: true, data });
  };

  next();
}
