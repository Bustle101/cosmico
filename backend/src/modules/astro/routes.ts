import { Router } from "express";
import { getAstronomyEventsHandler } from "../astro/handlers/astro.handler";

const router = Router();

router.get("/events", getAstronomyEventsHandler);

export default router;