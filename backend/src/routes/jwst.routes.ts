import { Router } from "express";
import {
  getJwstImagesHandler,
  getJwstFeaturedHandler
} from "../handlers/jwst.handler";

const router = Router();

// Галерея JWST (список)
router.get("/images", getJwstImagesHandler);

router.get("/featured", getJwstFeaturedHandler);

export default router;
