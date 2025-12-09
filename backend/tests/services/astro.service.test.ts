import { getAstronomyEventsService } from "../../src/services/astro.service";

describe("Astronomy Events Service", () => {
  it("should return moon phase events within date range", async () => {
    const from = "2025-01-01T00:00:00Z";
    const to = "2025-02-01T00:00:00Z";

    const result = await getAstronomyEventsService(from, to, 0, 0);

    expect(result.ok).toBe(true);
    expect(result.data).toHaveProperty("table");
    expect(result.data.table).toHaveProperty("rows");

    const moonRow = result.data.table.rows[0];

    expect(moonRow.entry.id).toBe("moon");
    expect(Array.isArray(moonRow.cells)).toBe(true);
    expect(moonRow.cells.length).toBeGreaterThan(0);

    // проверяем структуру ячейки
    const cell = moonRow.cells[0];
    expect(cell).toHaveProperty("type");
    expect(cell).toHaveProperty("date");
    expect(cell).toHaveProperty("extra");
  });

  it("should return no events if date range is zero", async () => {
    const from = "2025-01-01T00:00:00Z";
    const to = "2025-01-01T00:00:00Z";

    const result = await getAstronomyEventsService(from, to, 0, 0);

    const moonRow = result.data.table.rows[0];
    expect(moonRow.cells.length).toBe(0);
  });
});
