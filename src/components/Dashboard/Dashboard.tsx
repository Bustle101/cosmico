import { useState } from "react";
import { IssStatsCards } from "../IssStatsCard/IssStatsCards";
import { IssMapPanel } from "../IssMapPanel/IssMapPanel";
import { JwstGallerySection } from "../JwstGallery/JwstGallerySection";
import OsdrPage from "../OSDR/Osdr";
import { AstroSection } from "../AstroSection/AstroSection";
import { DashboardCard } from "../DashboardCard/DashboardCard";

import "./Dashboard.css";

export const Dashboard = () => {
  const [tab, setTab] = useState<
    "dashboard" | "iss" | "osdr" | "astro" | "jwst"
  >("dashboard");

  return (
    <div className="tabs-container">
      <div className="tabs-header">

        <div
          className={`tab-item ${tab === "dashboard" ? "active" : ""}`}
          onClick={() => setTab("dashboard")}
        >
          Dashboard
        </div>

        <div
          className={`tab-item ${tab === "iss" ? "active" : ""}`}
          onClick={() => setTab("iss")}
        >
          ISS
        </div>

        <div
          className={`tab-item ${tab === "jwst" ? "active" : ""}`}
          onClick={() => setTab("jwst")}
        >
          JWST
        </div>

        <div
          className={`tab-item ${tab === "osdr" ? "active" : ""}`}
          onClick={() => setTab("osdr")}
        >
          OSDR
        </div>

        <div
          className={`tab-item ${tab === "astro" ? "active" : ""}`}
          onClick={() => setTab("astro")}
        >
          Astronomy
        </div>
      </div>

      <div className="tabs-body">
        {/* DASHBOARD */}
        {tab === "dashboard" && (
          <div className="dashboard-grid">
            <DashboardCard
              title="ISS — Позиция и телеметрия"
              description="Карта перемещения станции и статистические показатели."
              onClick={() => setTab("iss")}
            />

            <DashboardCard
              title="JWST — Космические снимки"
              description="Галерея изображений от космического телескопа Джеймса Уэбба."
              onClick={() => setTab("jwst")}
            />

            <DashboardCard
              title="OSDR — Наборы данных NASA"
              description="Каталоги экспериментов, файлов и датасетов NASA."
              onClick={() => setTab("osdr")}
            />

            <DashboardCard
              title="Astronomy — Солнечно-лунные события"
              description="Фазы луны, солнечные события, астрономическое расписание."
              onClick={() => setTab("astro")}
            />
          </div>
        )}

        {/* ISS */}
        {tab === "iss" && (
          <>
            <IssStatsCards />
            <IssMapPanel />
          </>
        )}

        {/* JWST */}
        {tab === "jwst" && <JwstGallerySection />}

        {/* OSDR */}
        {tab === "osdr" && <OsdrPage />}

        {/* Astronomy */}
        {tab === "astro" && <AstroSection />}
      </div>
    </div>
  );
};
