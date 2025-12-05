import React from "react";
import "./AstroSection.css"

export const AstroSection: React.FC = () => {
  return (
    <section className="astro-section">
      <div className="astro-header">
        <h2 className="astro-title">Астрономические события (AstronomyAPI)</h2>

        <form className="astro-form">
          <input
            className="astro-input"
            type="text"
            placeholder="55.7558"
            defaultValue="55.7558"
          />
          <input
            className="astro-input"
            type="text"
            placeholder="37.6176"
            defaultValue="37.6176"
          />
          <input
            className="astro-input astro-input-days"
            type="number"
            defaultValue={7}
          />
          <button type="submit" className="astro-button">
            Показать
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
            <tr>
              <td colSpan={5} className="astro-empty">
                события не найдены
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="astro-json-toggle">
        <details>
          <summary>Полный JSON</summary>
          {/* позже здесь покажем сырой ответ API */}
        </details>
      </div>
    </section>
  );
};
