import { Request, Response, NextFunction } from "express";
import { v4 as uuid } from "uuid";

export function apiResponseMiddleware(req: Request, res: Response, next: NextFunction) {
  const oldJson = res.json;

  res.json = function (body: any) {
   
    if (body && (body.ok === false || body.ok === true)) {
      return oldJson.call(res, body);
    }


    if (res.locals.data !== undefined) {
      return oldJson.call(res, {
        ok: true,
        data: res.locals.data
      });
    }


    if (res.locals.error) {
      return oldJson.call(res, {
        ok: false,
        error: {
          code: res.locals.error.code || "INTERNAL_ERROR",
          message: res.locals.error.message || "Unknown error",
          trace_id: uuid()
        }
      });
    }

  
    if (body?.error) {
      return oldJson.call(res, {
        ok: false,
        error: {
          code: body.error.code || "INTERNAL_ERROR",
          message: body.error.message || "Unknown error",
          trace_id: uuid()
        }
      });
    }

 
    return oldJson.call(res, {
      ok: true,
      data: body
    });
  };

  next();
}
