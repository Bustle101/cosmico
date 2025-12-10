import { Request, Response } from "express";
import { getOsdrService } from "../services/osdr.service";

import { validateDto } from "../../../core/validation/validate";
import { OsdrQuery } from "../dto/OsdrQuery";


function isOsdrError(err: any): err is { code: string; message: string } {
  return (
    err &&
    typeof err === "object" &&
    "code" in err &&
    "message" in err &&
    typeof err.code === "string" &&
    typeof err.message === "string"
  );
}

export async function getOsdrHandler(req: Request, res: Response) {

  const errors = await validateDto(OsdrQuery, req.query);

  if (errors) {
    res.locals.error = {
      code: "VALIDATION_ERROR",
      message: errors.join("; ")
    };
    return res.json({ ok: false, error: res.locals.error });
  }

 
  const { limit } = req.query as unknown as OsdrQuery;

  
  const result = await getOsdrService(Number(limit));

  
  if (!result.ok) {
    const err = result.error;

    const code = isOsdrError(err)
      ? err.code
      : "OSDR_FETCH_ERROR";

    const message = isOsdrError(err)
      ? err.message
      : "Failed to load OSDR datasets";

    res.locals.error = { code, message };
    return res.json({ ok: false, error: res.locals.error });
  }

  
  res.locals.data = { items: result.items };
  return res.json({ ok: true, data: res.locals.data });
}
