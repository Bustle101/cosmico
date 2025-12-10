import React, { useEffect, useState } from "react";
import "./Osdr.css";
import { getOsdrDatasets } from "../../api/osdr";

interface OsdrApiError {
  code: string;
  message: string;
}

interface OsdrItem {
  id: string;
  title: string;
  description: string;
  image: string | null;
  url: string;
}

export const OsdrPage: React.FC = () => {
  const [items, setItems] = useState<OsdrItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<OsdrItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(12);

  // ---------------------------
  //  ЗАГРУЗКА OSDR
  // ---------------------------
  async function loadOsdr(currentLimit: number) {
    setLoading(true);
    setError(null);

    const data = await getOsdrDatasets(currentLimit);

    try {
      if (!data.ok) {
        throw new Error(data.error?.message || data.error?.code || "Unknown OSDR error");
      }

      setItems(data.items || []);
      setFilteredItems(data.items || []);

    } catch (err: any) {
      setError(err.message || "Failed to load OSDR datasets");
      setItems([]);
      setFilteredItems([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOsdr(limit);
  }, [limit]);

  // ---------------------------
  //  ФИЛЬТРАЦИЯ ПО ПОИСКУ
  // ---------------------------
  useEffect(() => {
    const q = search.trim().toLowerCase();

    if (!q) {
      setFilteredItems(items);
      return;
    }

    const result = items.filter(item =>
      item.title?.toLowerCase().includes(q) ||
      item.description?.toLowerCase().includes(q) ||
      item.id?.toLowerCase().includes(q)
    );

    setFilteredItems(result);
  }, [search, items]);


  const handleRetry = () => {
    loadOsdr(limit);
  };

  return (
    <div className="osdr-page">
      <header className="osdr-header">
        <div>
          <h1>OSDR Datasets</h1>
          <p className="osdr-subtitle">
            Открытые научные данные NASA OSDR: биологические эксперименты и микрогравитация.
          </p>
        </div>
      </header>

      {/* ---------------------------
            БЛОК ФИЛЬТРАЦИИ
        --------------------------- */}
      <div className="osdr-filters">
        <input
          className="osdr-input"
          type="text"
          placeholder="Поиск по названию / описанию / ID…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="osdr-select"
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
        >
          <option value={6}>6</option>
          <option value={12}>12</option>
          <option value={24}>24</option>
          <option value={48}>48</option>
        </select>
      </div>

      {/* Состояния загрузки / ошибок */}
      {loading && (
        <div className="osdr-state osdr-state-loading">
          <span>Загружаем OSDR датасеты…</span>
        </div>
      )}

      {!loading && error && (
        <div className="osdr-state osdr-state-error">
          <div>
            <strong>Ошибка загрузки OSDR:</strong> {error}
          </div>
          <button className="osdr-button osdr-button-secondary" onClick={handleRetry}>
            Повторить попытку
          </button>
        </div>
      )}

      {!loading && !error && filteredItems.length === 0 && (
        <div className="osdr-state osdr-state-empty">
          <span>Ничего не найдено по запросу «{search}».</span>
        </div>
      )}

      {/* ---------------------------
            СЕТКА КАРТОЧЕК
        --------------------------- */}
      {!loading && !error && filteredItems.length > 0 && (
        <main className="osdr-grid">
          {filteredItems.map(item => (
            <article key={item.id} className="osdr-card">
              {item.image ? (
                <div className="osdr-card-image-wrapper">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="osdr-card-image"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="osdr-card-image-placeholder">
                  <span>{item.id}</span>
                </div>
              )}

              <div className="osdr-card-body">
                <h2 className="osdr-card-title">{item.title || item.id}</h2>
                <p className="osdr-card-description">{item.description}</p>
              </div>

              <footer className="osdr-card-footer">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="osdr-button osdr-button-primary"
                >
                  Открыть в NASA OSDR
                </a>
              </footer>
            </article>
          ))}
        </main>
      )}
    </div>
  );
};

export default OsdrPage;
