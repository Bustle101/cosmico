import { Request, Response } from "express";
import { getAstronomyEventsService } from "../services/astro.service";

import { validateDto } from "../../../core/validation/validate";
import { AstroEventsQuery } from "../dto/AstroEventsQuery";

export async function getAstronomyEventsHandler(req: Request, res: Response) {

  const errors = await validateDto(AstroEventsQuery, req.query);

  if (errors) {
    res.locals.error = {
      code: "VALIDATION_ERROR",
      message: errors.join("; ")
    };
    return res.json({ ok: false, error: res.locals.error });
  }


  const { from, to, lat, lon } = req.query as unknown as AstroEventsQuery;

  try {
    const result = await getAstronomyEventsService(
      from,
      to,
      Number(lat),
      Number(lon)
    );

    res.locals.data = result.data;
    return res.json(result);

  } catch (error) {
    res.locals.error = {
      code: "ASTRO_INTERNAL_ERROR",
      message: "Failed to calculate astronomy events"
    };

    return res.json({ ok: false, error: res.locals.error });
  }
}
