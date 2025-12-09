import * as Astronomy from "astronomy-engine";

export async function getAstronomyEventsService(
  fromStr: string,
  toStr: string,
  lat: number,
  lon: number
) {
  // Границы диапазона
  const dateFrom = new Date(fromStr);
  const dateTo = new Date(toStr);


  const observer = new Astronomy.Observer(lat, lon, 0);

  const rows: any[] = [];

  
  const moonEvents: { type: string; date: string; extra: string }[] = [];


  let quarterInfo = Astronomy.SearchMoonQuarter(
    new Astronomy.AstroTime(dateFrom)
  );


  while (quarterInfo.time.date <= dateTo) {
    const phaseDate = quarterInfo.time.date;

    const phaseName = [
      "New Moon (Новолуние)",
      "First Quarter (Первая четверть)",
      "Full Moon (Полнолуние)",
      "Third Quarter (Последняя четверть)"
    ][quarterInfo.quarter];

    moonEvents.push({
      type: phaseName,
      date: phaseDate.toISOString(),
      extra: `Quarter: ${quarterInfo.quarter}`
    });

    // Переход к следующей фазе
    quarterInfo = Astronomy.NextMoonQuarter(quarterInfo);

    // Защита от бесконечного цикла 
    if (moonEvents.length > 100) break;
  }

  // Добавляем строку Moon в таблицу
  rows.push({
    entry: { id: "moon", name: "Moon" },
    cells: moonEvents
  });

  // Итоговый ответ
  return {
    ok: true,
    data: {
      table: {
        rows
      }
    }
  };
}
