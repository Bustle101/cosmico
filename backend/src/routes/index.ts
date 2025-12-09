import { Router } from "express";

import issRoutes from "./iss.routes";
import jwstRoutes from "./jwst.routes";
import osdrRoutes from "./osdr.routes";
import feedRoutes from "./feed.routes";
import astroRoutes from "./astro.routes";

const router = Router();


router.use("/iss", issRoutes);
router.use("/jwst", jwstRoutes);
router.use("/osdr", osdrRoutes);
router.use("/astro", astroRoutes);
router.use("/feed", feedRoutes);

router.get("/health", (req, res) => res.json({ status: "ok" }));

export default router;
