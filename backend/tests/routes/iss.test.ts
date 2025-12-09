import request from "supertest";
import { createServer } from "../../src/app";

const app = createServer();

describe("ISS API", () => {
  it("GET /api/iss/position returns valid JSON", async () => {
    const res = await request(app).get("/api/iss/position");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("ok");

    if (res.body.ok) {
      expect(res.body.data).toHaveProperty("lat");
      expect(res.body.data).toHaveProperty("lon");
      expect(typeof res.body.data.lat).toBe("number");
      expect(typeof res.body.data.lon).toBe("number");
    } else {
      // проверяем формат ошибки
      expect(res.body.error).toHaveProperty("code");
      expect(res.body.error).toHaveProperty("message");
    }
  });
});
