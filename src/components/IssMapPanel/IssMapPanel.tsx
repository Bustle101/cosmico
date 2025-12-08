import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import React, { useEffect, useState } from "react";
import { getIssPosition } from "../../api/iss";
import "./IssMapPanel.css";

const issIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/854/854878.png",
  iconSize: [36, 36],
  iconAnchor: [18, 36],
});

type IssPosition = {
  lat: number;
  lon: number;
  altitude?: number;
  velocity?: number;
  fetched_at?: string;
};

function ChangeMapView({ lat, lon }: { lat: number; lon: number }) {
  const map = useMap();
  map.setView([lat, lon]);
  return null;
}

export const IssMapPanel = () => {
  const [pos, setPos] = useState<IssPosition | null>(null);

  useEffect(() => {
    const load = async () => {
      const data = await getIssPosition();
      console.log("ISS POS:", data);
      setPos(data);
    };

    load();
    const interval = setInterval(load, 10000);
    return () => clearInterval(interval);
  }, []);

  const ready =
    typeof pos?.lat === "number" &&
    typeof pos?.lon === "number" &&
    !isNaN(pos.lat) &&
    !isNaN(pos.lon);

  return (
    <div className="iss-map-panel">
      <h3 className="iss-map-title">МКС — положение и движение</h3>

      <div className="iss-map-wrapper">
        <MapContainer
          center={[0, 0]}
          zoom={3}
          scrollWheelZoom={false}
          className="iss-map"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="© OpenStreetMap"
          />

          {ready && <ChangeMapView lat={pos!.lat} lon={pos!.lon} />}

          {ready && (
            <Marker position={[pos!.lat, pos!.lon]} icon={issIcon}>
              <Popup>
                <b>МКС</b><br/>

                Широта:{" "}
                {pos.lat != null ? pos.lat.toFixed(3) + "°" : "нет данных"}
                <br/>

                Долгота:{" "}
                {pos.lon != null ? pos.lon.toFixed(3) + "°" : "нет данных"}
                <br/>

                Высота:{" "}
                {pos.altitude != null
                  ? pos.altitude.toFixed(1) + " км"
                  : "нет данных"}
                <br/>

                Скорость:{" "}
                {pos.velocity != null
                  ? pos.velocity.toFixed(1) + " км/ч"
                  : "нет данных"}
                <br/>

                {pos.fetched_at && (
                  <>
                    Обновлено:{" "}
                    {new Date(pos.fetched_at).toLocaleTimeString("ru-RU")}
                  </>
                )}
              </Popup>

            </Marker>
          )}
        </MapContainer>
      </div>
    </div>
  );
};
