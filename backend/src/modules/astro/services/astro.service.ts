import * as Astronomy from "astronomy-engine";

export async function getAstronomyEventsService(
  fromStr: string,
  toStr: string,
  lat: number,
  lon: number
) {
  const dateFrom = new Date(fromStr);
  const dateTo = new Date(toStr);


  const observer = new Astronomy.Observer(lat, lon, 0);

  const rows: any[] = [];


  const moonEvents: { type: string; date: string; extra: string }[] = [];


  let q = Astronomy.SearchMoonQuarter(
    new Astronomy.AstroTime(dateFrom)
  );

  while (q.time.date <= dateTo) {
    const name = [
      "New Moon (Новолуние)",
      "First Quarter (Первая четверть)",
      "Full Moon (Полнолуние)",
      "Third Quarter (Последняя четверть)"
    ][q.quarter];

    moonEvents.push({
      type: name,
      date: q.time.date.toISOString(),
      extra: `Quarter: ${q.quarter}`
    });

    q = Astronomy.NextMoonQuarter(q);
  }

  rows.push({
    entry: { id: "moon", name: "Moon" },
    cells: moonEvents
  });

  return {
    ok: true,
    data: {
      table: {
        rows
      }
    }
  };
}
