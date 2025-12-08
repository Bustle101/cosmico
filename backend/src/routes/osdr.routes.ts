import { Router } from "express";
import { getOsdrHandler } from "../handlers/osdr.handler";

const router = Router();

router.get("/datasets", getOsdrHandler);

export default router;
