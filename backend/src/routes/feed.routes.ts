import { Router } from "express";
import { getFeedHandler } from "../handlers/feed.handler";

const router = Router();

router.get("/", getFeedHandler);

export default router;
