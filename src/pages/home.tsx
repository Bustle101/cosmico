import React from "react";
import { AstroSection } from "../components/AstroSection/AstroSection";
import { Dashboard } from "../components/Dashboard/Dashboard";


export const DashboardPage: React.FC = () => {
  return (
    <div className="page">
    
      <AstroSection />
      <Dashboard /> 
      
    </div>
  );
};

export default DashboardPage;
