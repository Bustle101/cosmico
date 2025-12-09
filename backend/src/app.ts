import express from "express";
import cors from "cors";
import morgan from "morgan";
import router from "./routes";
import { apiResponseMiddleware } from "./middleware/apiResponse";
import "dotenv/config";
import { initLogger } from "./utils/logger";
import { Pool } from "pg";

export function createServer() {
  const app = express();

  // Подключение к PostgreSQL
  const db = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  // Инициализация логгера
  initLogger(db);

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
