import { Router } from "express";
import routes from "./routes";

export function jwstModule() {
  const router = Router();
  router.use("/", routes);
  return router;
}
