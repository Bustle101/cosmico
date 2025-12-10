import "./DashboardCard.css";

export const DashboardCard = ({ title, description, onClick }: any) => {
  return (
    <div className="dashboard-card">
      <div className="dashboard-card-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      <button className="dashboard-card-btn" onClick={onClick}>
        Подробнее →
      </button>
    </div>
  );
};
