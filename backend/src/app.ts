import express from "express";
import cors from "cors";
import morgan from "morgan";
import "dotenv/config";
import { globalRateLimit } from "./core/rate-limit/apiRateLimit";
import { Pool } from "pg";

import { apiResponseMiddleware } from "./core/middleware/apiResponse";
import { initLogger } from "./core/logger/logger";

import { loadModules } from "./modules/moduleLoader";

export function createServer() {
  const app = express();

  const db = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  initLogger(db);

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
  app.use(globalRateLimit);

 
  loadModules(app);

  app.get("/api/health", (_, res) => {
    res.json({ ok: true });
  });

  return app;
}
