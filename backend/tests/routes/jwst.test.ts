import request from "supertest";
import { createServer } from "../../src/app";

const app = createServer();

describe("JWST API", () => {
  it("GET /api/jwst/images returns JSON", async () => {
    const res = await request(app).get("/api/jwst/images?limit=5");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("ok");

    if (res.body.ok) {
      expect(Array.isArray(res.body.data)).toBe(true);
    } else {
      expect(res.body.error).toHaveProperty("code");
      expect(res.body.error).toHaveProperty("message");
    }
  });
});
