import React, { useEffect, useState } from "react";
import { getJwstFeatured } from "../../api/jwst";
import "./JwstFeaturedObservation.css";

export const JwstFeaturedObservation = () => {
  const [item, setItem] = useState<any | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const obs = await getJwstFeatured();
        console.log("JWST FEATURED:", obs);
        setItem(obs);
      } catch (err) {
        console.error("Ошибка загрузки выбранного наблюдения JWST:", err);
      }
    }

    load(); // загружаем при первом рендере
  }, []);

  return (
    <div className="jwst-featured">
      <h3 className="jwst-title">JWST — выбранное наблюдение</h3>

      <p className="jwst-subtitle">
        Этот блок остаётся как был (JSON/сводка). Основная галерея ниже.
      </p>

      {/* Вывод JSON-сводки */}
      {item ? (
        <pre className="jwst-json">{JSON.stringify(item, null, 2)}</pre>
      ) : (
        <div className="jwst-loading">Загрузка...</div>
      )}
    </div>
  );
};
