import React from "react";
import { AstroSection } from "../components/AstroSection/AstroSection";
import { Cms } from "../components/Cms/Cms";
import { Dashboard } from "../components/Dashboard/Dashboard";


export const DashboardPage: React.FC = () => {
  return (
    <div className="page">
    
      <AstroSection />
      <Cms />
      <Dashboard /> 
      
    </div>
  );
};

export default DashboardPage;
