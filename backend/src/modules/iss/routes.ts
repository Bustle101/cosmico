import { Router } from "express";
import { getIssPositionHandler, getIssHistoryHandler, getIssLatestHandler } from "../iss/handlers/iss.handler";

const router = Router();

router.get("/position", getIssPositionHandler);
router.get("/history", getIssHistoryHandler);
router.get("/latest", getIssLatestHandler);



export default router;
