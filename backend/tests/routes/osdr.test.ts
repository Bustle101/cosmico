import request from "supertest";
import { createServer } from "../../src/app";

const app = createServer();

describe("OSDR API", () => {
  it("GET /api/osdr/datasets returns index", async () => {
    const res = await request(app).get("/api/osdr/datasets");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("ok");
  });
});
