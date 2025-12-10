import { Router } from "express";
import {
  getJwstImagesHandler,
  getJwstFeaturedHandler
} from "../jwst/handlers/jwst.handler";

const router = Router();

// Галерея JWST (список)
router.get("/images", getJwstImagesHandler);

router.get("/featured", getJwstFeaturedHandler);

export default router;
