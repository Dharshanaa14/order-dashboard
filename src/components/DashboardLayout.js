import React from "react";
import KPIWidget from "./KPIWidget";

function DashboardLayout({
  totalOrders,
  totalRevenue,
  totalCustomers,
  totalSoldQuantity,
}) {
  return (
    <div className="dashboard-layout">
      <div className="kpi-click-card">
        <KPIWidget title="Total Orders" value={totalOrders} />
      </div>

      <div className="kpi-click-card">
        <KPIWidget title="Total Revenue" value={`$ ${totalRevenue}`} />
      </div>

      <div className="kpi-click-card">
        <KPIWidget title="Total Customers" value={totalCustomers} />
      </div>

      <div className="kpi-click-card">
        <KPIWidget title="Total Sold Quantity" value={totalSoldQuantity} />
      </div>
    </div>
  );
}

export default DashboardLayout;