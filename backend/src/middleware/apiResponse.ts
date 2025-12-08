import { Request, Response, NextFunction } from "express";
import { v4 as uuid } from "uuid";

export function apiResponseMiddleware(req: Request, res: Response, next: NextFunction) {
  const oldJson = res.json;

  res.json = function (body: any) {
    // 1. Если хендлер сам вернул ok/data → НЕ оборачиваем повторно
    if (body && (body.ok === false || body.ok === true)) {
      return oldJson.call(res, body);
    }

    // 2. Если хендлер положил данные в res.locals.data
    if (res.locals.data !== undefined) {
      return oldJson.call(res, {
        ok: true,
        data: res.locals.data
      });
    }

    // 3. Если хендлер положил ошибку в res.locals.error
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

    // 4. Если пришла ошибка в теле ответа
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

    // 5. Если обычные данные
    return oldJson.call(res, {
      ok: true,
      data: body
    });
  };

  next();
}
