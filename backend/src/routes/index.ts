import { Router } from "express";
import { testRouter } from "./test.routes";
import issRoutes from "./iss.routes";
import jwstRoutes from "./jwst.routes";
import osdrRoutes from "./osdr.routes";
import feedRoutes from "./feed.routes";


const router = Router();

router.use("/test", testRouter);
router.use("/iss", issRoutes);
router.use("/jwst", jwstRoutes);
router.use("/osdr", osdrRoutes);
router.use("/feed", feedRoutes);

router.get("/health", (req, res) => res.json({ status: "ok" }));

export default router;
