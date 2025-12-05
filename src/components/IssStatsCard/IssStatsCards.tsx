import React from "react";
import "./IssStatsCards.css"

export const IssStatsCards = () => {
  return (
    <div className="iss-stats-container">
      <StatCard label="Скорость МКС" value="27 584" />
      <StatCard label="Высота МКС" value="425" />
    </div>
  );
};

const StatCard: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => {
  return (
    <div className="iss-card">
      <div className="iss-card-label">{label}</div>
      <div className="iss-card-value">{value}</div>
    </div>
  );
};
