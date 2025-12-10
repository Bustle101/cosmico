import rateLimit from "express-rate-limit";

export const globalRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 минута
  max: 300,            // 300 запросов в минуту на каждого клиента
  standardHeaders: true,
  legacyHeaders: false
});
