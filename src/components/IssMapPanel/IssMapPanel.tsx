import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import React from "react";
import "./IssMapPanel.css"

const issIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/854/854878.png",
  iconSize: [36, 36],
  iconAnchor: [18, 36],
});

export const IssMapPanel = () => {
  return (
    <div className="iss-map-panel">
      <h3 className="iss-map-title">МКС — положение и движение</h3>

      {/* Карта */}
      <div className="iss-map-wrapper">
        <MapContainer
          center={[50.0, 45.0]} //  координаты
          zoom={5}
          scrollWheelZoom={false}
          className="iss-map"
          attributionControl={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="© OpenStreetMap"
          />

          <Marker position={[50.0, 45.0]} icon={issIcon}>
            <Popup>МКС — примерная позиция</Popup>
          </Marker>
        </MapContainer>
      </div>

      {/* Маленькие графики */}
      <div className="iss-mini-charts">
        <MiniChart label="Скорость" />
        <MiniChart label="Высота" />
      </div>
    </div>
  );
};

const MiniChart: React.FC<{ label: string }> = ({ label }) => {
  return (
    <div className="iss-mini-chart">
      <div className="iss-mini-chart-label">{label}</div>
      <div className="iss-mini-chart-bar"></div>

      {/* оси графика */}
      <div className="iss-mini-chart-axis">
        <span>0</span>
        <span>0,5</span>
        <span>1,0</span>
      </div>
    </div>
  );
};
