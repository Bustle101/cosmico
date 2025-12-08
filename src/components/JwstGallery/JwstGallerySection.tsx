import React, { useEffect, useState } from "react";
import { getJwstImages } from "../../api/jwst";
import "./JwstGallerySection.css";

type JwstImage = {
  id: string;
  title: string;
  thumbnail_url: string;
  instrument: string;
};

export const JwstGallerySection = () => {
  const PAGE_SIZE = 5; // 5 изображений на страницу

  const [images, setImages] = useState<JwstImage[]>([]);
  const [page, setPage] = useState(0);

  // количество страниц
  const totalPages = Math.ceil(images.length / PAGE_SIZE);

  const canPrev = page > 0;
  const canNext = page < totalPages - 1;

  useEffect(() => {
    async function load() {
      try {
        const items = await getJwstImages(30); // берем 30, хватит на 6 страниц
        setImages(items);
      } catch (e) {
        console.error("Ошибка загрузки JWST:", e);
      }
    }
    load();
  }, []);

  return (
    <div className="jwst-gallery">
      <div className="jwst-gallery-header">
        <h3 className="jwst-gallery-title">JWST — последние изображения</h3>
      </div>

      {/* Стрелки — теперь внутри блока галереи */}
      {canPrev && (
        <button className="jwst-arrow left" onClick={() => setPage(page - 1)}>
          ‹
        </button>
      )}

      {canNext && (
        <button className="jwst-arrow right" onClick={() => setPage(page + 1)}>
          ›
        </button>
      )}

      <div className="jwst-gallery-window">
        <div
          className="jwst-gallery-slider"
          style={{
            width: `${totalPages * 100}%`,
            transform: `translateX(-${page * (100 / totalPages)}%)`,
          }}
        >
          {Array.from({ length: totalPages }).map((_, pageIndex) => {
            const start = pageIndex * PAGE_SIZE;
            const pageImages = images.slice(start, start + PAGE_SIZE);

            return (
              <div className="jwst-slide-page" key={pageIndex}>
                {pageImages.map((img) => (
                  <div key={img.id} className="jwst-item">
                    <img src={img.thumbnail_url} className="jwst-image" alt={img.title} />
                    <div className="jwst-caption">
                      {img.title}
                      <br />• {img.instrument}
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>

  );
};
