import { useState } from "react";
import "./Cms.css"

export const Cms = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="cms-container">
      <div className="cms-header" onClick={() => setOpen(!open)}>
        <span className="cms-arrow">{open ? "▾" : "▸"}</span>
        <span className="cms-title">CMS</span>
      </div>

      {open && (
        <div className="cms-content">
          ошибка
        </div>
      )}
    </div>
  );
};
