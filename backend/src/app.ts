import express from "express";
import morgan from "morgan";
import router from "./routes";
import { apiResponseMiddleware } from "./middleware/apiResponse";

export function createServer() {
  const app = express();

  app.use(express.json());
  app.use(morgan("dev"));
  app.use(apiResponseMiddleware);

  app.use("/api", router);

  return app;
}
