import React from "react";

function DashboardView({ onConfigure }) {
  return (
    <div className="empty-dashboard">
      <h2>Dashboard Page</h2>
      <p>By default, no widgets are configured in the dashboard.</p>

      <button className="configure-btn" onClick={onConfigure}>
        Configure Dashboard
      </button>
    </div>
  );
}

export default DashboardView;