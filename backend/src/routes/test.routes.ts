import { Router } from "express";
import { testDb } from "../repo/test.repo";

export const testRouter = Router();

testRouter.get("/db", async (req, res) => {
  const data = await testDb();
  res.json(data);
});
