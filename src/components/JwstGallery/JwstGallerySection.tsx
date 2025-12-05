import React, { useState } from "react";
import sampleImage from "../../assets/PeaJVwzG8to.jpg";
import "./JwstGallerySection.css";

export const JwstGallerySection = () => {
  const images = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    src: sampleImage,
    title: `jw02731001003_${i.toString().padStart(4, "0")}`,
    instrument: "FGS/NIRCAM/NIRISS/NIRSPECMIRI"
  }));

  const PAGE_SIZE = 4;
  const [page, setPage] = useState(0);

  const canPrev = page > 0;
  const canNext = (page + 1) * PAGE_SIZE < images.length;

  return (
    <div className="jwst-gallery">
      {/* Заголовок и фильтры */}
      <div className="jwst-gallery-header">
        <h3 className="jwst-gallery-title">JWST — последние изображения</h3>

        <div className="jwst-filters">
          <select className="jwst-select"><option>По суффиксу</option></select>
          <select className="jwst-select"><option>_cal</option></select>
          <select className="jwst-select"><option>Любой инструмент</option></select>
          <select className="jwst-select"><option>24</option></select>
          <button className="jwst-button">Показать</button>
        </div>
      </div>

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
            transform: `translateX(-${page * 100}%)`
          }}
        >
          {images.map((img) => (
            <div key={img.id} className="jwst-item">
              <img src={img.src} className="jwst-image" />
              <div className="jwst-caption">
                {img.title}
                <br />• {img.instrument}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
