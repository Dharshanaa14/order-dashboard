import React, { useMemo, useState } from "react";
import DashboardLayout from "./DashboardLayout";
import ChartWidget from "./ChartWidget";
import TableWidget from "./TableWidget";
import WidgetConfigurationPanel from "./WidgetConfigurationPanel";

function GridCanvas({
  activeWidget,
  setActiveWidget,
  totalOrders,
  totalRevenue,
  totalCustomers,
  totalSoldQuantity,
  monthlyRevenue,
  statusData,
  orders,
  allOrders,
  onEdit,
  onDelete,
  onCreateOrder,
  configuredWidgets,
  setConfiguredWidgets,
  onOpenDashboard,
  onOpenOrdersTable,
}) {
  const [selectedWidgetId, setSelectedWidgetId] = useState(null);

  const pendingOrders = useMemo(() => {
    return (allOrders || []).filter(
      (item) => String(item.status || "").toLowerCase() === "pending"
    );
  }, [allOrders]);

  const scatterData = useMemo(() => {
    return (orders || []).map((item) => ({
      quantity: Number(item.quantity || 0),
      totalAmount: Number(item.totalAmount || 0),
    }));
  }, [orders]);

  const selectedWidget = (configuredWidgets || []).find(
    (widget) => widget.id === selectedWidgetId
  );

  const handleSaveWidgetConfig = (id, newConfig) => {
    setConfiguredWidgets((prev) =>
      prev.map((widget) =>
        widget.id === id
          ? {
              ...widget,
              ...newConfig,
              w:
                newConfig.width !== undefined && newConfig.width !== ""
                  ? Number(newConfig.width)
                  : widget.w,
              h:
                newConfig.height !== undefined && newConfig.height !== ""
                  ? Number(newConfig.height)
                  : widget.h,
            }
          : widget
      )
    );
  };

  const handleDeleteWidget = (id) => {
    setConfiguredWidgets((prev) => prev.filter((widget) => widget.id !== id));
    if (selectedWidgetId === id) {
      setSelectedWidgetId(null);
    }
  };

  const getWidgetData = (type) => {
    if (type === "pie") return statusData;
    if (type === "scatter") return scatterData;
    if (type === "table") return orders;
    return monthlyRevenue;
  };

  const renderConfiguredWidget = (widget) => {
    if (widget.type === "kpi") {
      const metricMap = {
        Orders: totalOrders,
        Revenue: totalRevenue,
        Customers: totalCustomers,
        Quantity: totalSoldQuantity,
      };

      const metricValue = metricMap[widget.metric] ?? totalRevenue;

      return (
        <div
          key={widget.id}
          className="dashboard-grid-item"
          style={{ gridColumn: `span ${widget.w || 3}` }}
        >
          <div className="widget-card kpi-widget-card">
            <div className="widget-header-row">
              <h3 className="widget-title">{widget.title || "KPI Value"}</h3>
              <div className="widget-actions-inline">
                <button
                  className="widget-icon-btn"
                  onClick={() => setSelectedWidgetId(widget.id)}
                  title="Edit"
                >
                  ⚙️
                </button>
                <button
                  className="widget-icon-btn delete-btn"
                  onClick={() => handleDeleteWidget(widget.id)}
                  title="Delete"
                >
                  🗑️
                </button>
              </div>
            </div>

            <div className="kpi-widget-body">
              <p className="kpi-title">{widget.metric || "Revenue"}</p>
              <h2 className="kpi-big-value">
                {widget.metric === "Revenue"
                  ? `$ ${Number(metricValue || 0)}`
                  : metricValue}
              </h2>
            </div>
          </div>
        </div>
      );
    }

    if (widget.type === "table") {
      return (
        <div
          key={widget.id}
          className="dashboard-grid-item"
          style={{ gridColumn: "span 12" }}
        >
          <div className="widget-shell">
            <div className="widget-top-controls">
              <button
                className="widget-icon-btn"
                onClick={() => setSelectedWidgetId(widget.id)}
                title="Edit"
              >
                ⚙️
              </button>
              <button
                className="widget-icon-btn delete-btn"
                onClick={() => handleDeleteWidget(widget.id)}
                title="Delete"
              >
                🗑️
              </button>
            </div>

            <TableWidget
              data={orders}
              onEdit={onEdit}
              onDelete={onDelete}
              onCreateOrder={onCreateOrder}
              onGoDashboard={onOpenDashboard}
            />
          </div>
        </div>
      );
    }

    return (
      <div
        key={widget.id}
        className="dashboard-grid-item"
        style={{ gridColumn: `span ${widget.w || 6}` }}
      >
        <ChartWidget
          type={widget.type}
          data={getWidgetData(widget.type)}
          title={widget.title}
          config={{
            title: widget.title,
            width: widget.w,
            height: widget.h,
            xField: widget.xField || (widget.type === "pie" ? "name" : "month"),
            yField:
              widget.yField ||
              (widget.type === "pie"
                ? "value"
                : widget.type === "scatter"
                ? "totalAmount"
                : "revenue"),
            showLegend:
              widget.showLegend !== undefined ? widget.showLegend : true,
            showLabel:
              widget.showLabel !== undefined ? widget.showLabel : false,
            metric: widget.metric,
          }}
          onSettings={() => setSelectedWidgetId(widget.id)}
          onDelete={() => handleDeleteWidget(widget.id)}
        />
      </div>
    );
  };

  if (activeWidget === "table") {
    return (
      <div className="grid-canvas">
        <TableWidget
          data={orders}
          onEdit={onEdit}
          onDelete={onDelete}
          onCreateOrder={onCreateOrder}
          onGoDashboard={onOpenDashboard}
        />
      </div>
    );
  }

  return (
    <div className="grid-canvas">
      <div className="table-tabs">
        <button
          className={`tab-btn ${activeWidget === "dashboard" ? "active-tab" : ""}`}
          onClick={() => setActiveWidget("dashboard")}
        >
          Dashboard
        </button>
        <button
          className={`tab-btn ${activeWidget === "table" ? "active-tab" : ""}`}
          onClick={() => setActiveWidget("table")}
        >
          Table
        </button>
      </div>

      <DashboardLayout
        totalOrders={totalOrders}
        totalRevenue={totalRevenue}
        totalCustomers={totalCustomers}
        totalSoldQuantity={totalSoldQuantity}
      />

      <div className="dashboard-builder-grid">
        {configuredWidgets && configuredWidgets.length > 0 ? (
          configuredWidgets.map(renderConfiguredWidget)
        ) : (
          <div className="empty-dashboard-card">
            <h3>No widgets configured yet</h3>
            <p>
              Click <strong>Configure Dashboard</strong> and drag widgets into
              your dashboard.
            </p>
          </div>
        )}
      </div>

      <div className="pending-section">
        <div className="section-heading-row">
          <h3>Pending orders</h3>
          <button className="link-btn" onClick={onOpenOrdersTable}>
            View full table
          </button>
        </div>

        <TableWidget
          data={pendingOrders}
          onEdit={onEdit}
          onDelete={onDelete}
          onCreateOrder={onCreateOrder}
          onGoDashboard={onOpenDashboard}
          compact={true}
          title="Pending orders"
        />
      </div>

      <WidgetConfigurationPanel
        isOpen={!!selectedWidgetId}
        widget={selectedWidget}
        onClose={() => setSelectedWidgetId(null)}
        onSave={handleSaveWidgetConfig}
      />
    </div>
  );
}

export default GridCanvas;