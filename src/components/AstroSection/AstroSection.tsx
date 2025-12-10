import React, { useState } from "react";
import "./AstroSection.css";
import { fetchAstroEvents, type AstroBodyRow } from "../../api/astro";

interface FlatEvent {
  bodyName: string;
  eventType: string;
  date: string;
  extra?: string;
}

export const AstroSection: React.FC = () => {
  // Состояния для формы
  const [lat, setLat] = useState("55.7558");
  const [lon, setLon] = useState("37.6176");
  const [days, setDays] = useState(7);

  // Состояния для данных
  const [events, setEvents] = useState<FlatEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fullJson, setFullJson] = useState<any>(null);

  const downloadCsv = () => {
    if (events.length === 0) return;

    const headers = ["bodyName", "eventType", "date", "extra"];

    const rows = events.map(e => [
      e.bodyName,
      e.eventType,
      e.date,
      e.extra ?? ""
    ]);

    const csvContent =
      [headers.join(","), ...rows.map(r => r.join(","))].join("\n");

    // 📌 Добавляем BOM для Excel
    const BOM = "\uFEFF";

    const blob = new Blob([BOM + csvContent], {
      type: "text/csv;charset=utf-8;"
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "astro_events.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

 
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setEvents([]);

    try {
      const result = await fetchAstroEvents(Number(lat), Number(lon), days);

      setFullJson(result);

      const rows = result.data.table.rows;
      const flatList: FlatEvent[] = [];

      rows.forEach((row: AstroBodyRow) => {
        if (row.cells && row.cells.length > 0) {
          row.cells.forEach((cell) => {
            flatList.push({
              bodyName: row.entry.name,
              eventType: cell.type,
              date: cell.date,
              extra: ""
            });
          });
        }
      });

      if (flatList.length === 0) {
        setError("Событий за этот период не найдено");
      }

      setEvents(flatList);

    } catch (err) {
      console.error(err);
      setError("Ошибка при получении данных");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="astro-section">
      <div className="astro-header">
        <h2 className="astro-title">Астрономические события (AstronomyAPI)</h2>

        <form className="astro-form" onSubmit={handleSearch}>
          <input
            className="astro-input"
            type="text"
            placeholder="Широта"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
          />
          <input
            className="astro-input"
            type="text"
            placeholder="Долгота"
            value={lon}
            onChange={(e) => setLon(e.target.value)}
          />
          <input
            className="astro-input astro-input-days"
            type="number"
            min="1"
            max="90"
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
          />

          {/* КНОПКА ПОКАЗАТЬ */}
          <button type="submit" className="astro-button" disabled={loading}>
            {loading ? "..." : "Показать"}
          </button>

          {/* КНОПКА ВЫГРУЗИТЬ CSV */}
          <button
            type="button"
            className="astro-button"
            onClick={downloadCsv}
            disabled={events.length === 0}
            style={{ marginLeft: "10px" }}
          >
            Выгрузить CSV
          </button>
        </form>
      </div>

      <div className="astro-table-wrapper">
        <table className="astro-table">
          <thead>
            <tr>
              <th style={{ width: "40px" }}>#</th>
              <th>Тело</th>
              <th>Событие</th>
              <th>Когда (UTC)</th>
              <th>Дополнительно</th>
            </tr>
          </thead>
          <tbody>

            {/* ОШИБКА */}
            {error && (
              <tr>
                <td colSpan={5} style={{ textAlign: "center", color: "red", padding: "10px" }}>
                  {error}
                </td>
              </tr>
            )}

            {/* ДАННЫЕ */}
            {!error && events.map((evt, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{evt.bodyName}</td>
                <td>{evt.eventType}</td>
                <td>{new Date(evt.date).toLocaleString()}</td>
                <td>{evt.extra || "-"}</td>
              </tr>
            ))}

            {/* ПУСТО */}
            {!loading && !error && events.length === 0 && (
              <tr>
                <td colSpan={5} className="astro-empty">
                  события не найдены (нажмите Показать)
                </td>
              </tr>
            )}

          </tbody>
        </table>
      </div>

      <div className="astro-json-toggle">
        <details>
          <summary>Полный JSON</summary>
          <pre style={{ fontSize: "10px", textAlign: "left" }}>
            {JSON.stringify(fullJson, null, 2)}
          </pre>
        </details>
      </div>
    </section>
  );
};
