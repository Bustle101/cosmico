import { Router } from "express";
import routes from "./routes";

export function osdrModule() {
  const router = Router();
  router.use("/", routes);
  return router;
}
