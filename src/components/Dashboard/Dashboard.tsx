import { useState } from "react";
import { IssStatsCards } from "../IssStatsCard/IssStatsCards";
import { JwstFeaturedObservation } from "../JwstObservation/JwstFeaturedObservation";
import { IssMapPanel } from "../IssMapPanel/IssMapPanel";
import { JwstGallerySection } from "../JwstGallery/JwstGallerySection";

import "./Dashboard.css"


export const Dashboard = () => {
  const [tab, setTab] = useState<"dashboard" | "iss" | "osdr">("dashboard");

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
          className={`tab-item ${tab === "osdr" ? "active" : ""}`}
          onClick={() => setTab("osdr")}
        >
          OSDR
        </div>
      </div>

      {/* Содержимое вкладки */}
      <div className="tabs-body">

        {/* Главная вкладка Dashboard */}
        {tab === "dashboard" && (
          <div>
            <IssStatsCards />
            <JwstFeaturedObservation/>
            <IssMapPanel />
            <JwstGallerySection /> 

          </div>
        )}

        {/* Вкладка ISS */}
        {tab === "iss" && (
          <div>Здесь будут данные ISS</div>
        )}

        {/* Вкладка OSDR */}
        {tab === "osdr" && (
          <div>Здесь данные NASA / OSDR</div>
        )}
      </div>
    </div>
  );
};
