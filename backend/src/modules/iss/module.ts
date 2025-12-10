
import { Router } from "express";
import routes from "./routes";

export function issModule() {
  const router = Router();
  router.use("/", routes);
  return router;
}
