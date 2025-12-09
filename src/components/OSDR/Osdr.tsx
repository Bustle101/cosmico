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
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const DEFAULT_LIMIT = 12;

  useEffect(() => {
    let cancelled = false;

    async function loadOsdr() {
      setLoading(true);
      setError(null);

      const data = await getOsdrDatasets(DEFAULT_LIMIT);

      try {
        if (!data.ok) {
          throw new Error(data.error?.message || data.error?.code || "Unknown OSDR error");
        }

        if (!cancelled) {
          setItems(data.items || []);
        }
      } catch (err: any) {
        if (!cancelled) {
          setError(err.message || "Failed to load OSDR datasets");
          setItems([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadOsdr();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleRetry = () => {
    window.location.reload();
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

      {!loading && !error && items.length === 0 && (
        <div className="osdr-state osdr-state-empty">
          <span>Нет доступных датасетов OSDR.</span>
        </div>
      )}

      {!loading && !error && items.length > 0 && (
        <main className="osdr-grid">
          {items.map(item => (
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
