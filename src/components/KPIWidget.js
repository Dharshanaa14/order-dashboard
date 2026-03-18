import React from "react";

function KPIWidget({ title, value, onSettings, onDelete }) {
  return (
    <div className="widget-card kpi-card">
      {(onSettings || onDelete) && (
        <div className="widget-actions-inline" style={{ justifyContent: "flex-end" }}>
          {onSettings && (
            <button
              type="button"
              className="widget-icon-btn"
              onClick={onSettings}
              title="Settings"
            >
              ⚙️
            </button>
          )}
          {onDelete && (
            <button
              type="button"
              className="widget-icon-btn delete-btn"
              onClick={onDelete}
              title="Delete"
            >
              🗑️
            </button>
          )}
        </div>
      )}

      <p className="kpi-title">{title}</p>
      <h2 className="kpi-value">{value}</h2>
    </div>
  );
}

export default KPIWidget;