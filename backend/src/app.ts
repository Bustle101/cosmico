import express from "express";
import cors from "cors";
import morgan from "morgan";
import router from "./routes";
import { apiResponseMiddleware } from "./middleware/apiResponse";

export function createServer() {
  const app = express();

  // CORS
  app.use(
    cors({
      origin: "http://localhost:5173",
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

  app.use(express.json());
  app.use(morgan("dev"));
  app.use(apiResponseMiddleware);
 
  app.use("/api", router);




  return app;
}
