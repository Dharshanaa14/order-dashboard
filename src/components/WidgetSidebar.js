import React from "react";

function WidgetSidebar({ activeWidget, onOpenDashboard, onOpenOrdersTable }) {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Order Dashboard</h2>
        <p>Manage orders and analytics</p>
      </div>

      <div className="sidebar-section">
        <h3>Main Menu</h3>

        <button
          className={`sidebar-widget ${activeWidget === "dashboard" ? "active-widget" : ""}`}
          onClick={onOpenDashboard}
        >
          Dashboard
        </button>

        <button
          className={`sidebar-widget ${activeWidget === "table" ? "active-widget" : ""}`}
          onClick={onOpenOrdersTable}
        >
          Orders Table
        </button>
      </div>
    </div>
  );
}

export default WidgetSidebar;