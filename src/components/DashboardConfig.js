import React, { useEffect, useState } from "react";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import WidgetConfigurationPanel from "./WidgetConfigurationPanel";
import UnsavedChangesModal from "./UnsavedChangesModal";
import { Responsive, WidthProvider } from "react-grid-layout/legacy";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const ResponsiveGridLayout = WidthProvider(Responsive);

const DEFAULT_WIDGETS = {
  bar: { type: "bar", title: "Bar Chart", w: 3, h: 3 },
  line: { type: "line", title: "Line Chart", w: 3, h: 3 },
  pie: { type: "pie", title: "Pie Chart", w: 3, h: 3 },
  area: { type: "area", title: "Area Chart", w: 3, h: 3 },
  scatter: { type: "scatter", title: "Scatter Plot", w: 4, h: 3 },
  table: { type: "table", title: "Table", w: 6, h: 4 },
  kpi: { type: "kpi", title: "KPI Value", w: 2, h: 2 },
};

const previewChartData = [
  { name: "Jan", value: 1200 },
  { name: "Feb", value: 900 },
  { name: "Mar", value: 1500 },
  { name: "Apr", value: 1100 },
];

const previewPieData = [
  { name: "Pending", value: 3 },
  { name: "Completed", value: 2 },
  { name: "In Progress", value: 1 },
];

const previewScatterData = [
  { quantity: 1, totalAmount: 100 },
  { quantity: 2, totalAmount: 250 },
  { quantity: 3, totalAmount: 400 },
  { quantity: 4, totalAmount: 550 },
];

const COLORS = ["#2563eb", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

function WidgetPreview({ widget }) {
  if (!widget) return null;

  if (widget.type === "kpi") {
    return (
      <div
        style={{
          padding: "10px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <p
          style={{
            margin: "0 0 5px 0",
            color: "#64748b",
            fontSize: "14px",
          }}
        >
          Total Orders
        </p>
        <h3 style={{ margin: 0, fontSize: "28px", color: "#0f172a" }}>24</h3>
      </div>
    );
  }

  if (widget.type === "table") {
    return (
      <div
        style={{
          padding: "10px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "1px solid #e2e8f0",
            paddingBottom: "8px",
            marginBottom: "8px",
            fontWeight: "600",
            fontSize: "12px",
            color: "#64748b",
          }}
        >
          <span>Order ID</span>
          <span>Status</span>
          <span>Amount</span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "12px",
            marginBottom: "6px",
          }}
        >
          <span>ORD-101</span>
          <span
            style={{
              color: "#b54708",
              background: "#fff7ed",
              padding: "2px 6px",
              borderRadius: "4px",
            }}
          >
            Pending
          </span>
          <span>$120</span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "12px",
          }}
        >
          <span>ORD-102</span>
          <span
            style={{
              color: "#027a48",
              background: "#ecfdf3",
              padding: "2px 6px",
              borderRadius: "4px",
            }}
          >
            Completed
          </span>
          <span>$300</span>
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: "100%", height: "100%", padding: "10px" }}>
      <ResponsiveContainer width="100%" height="100%">
        {widget.type === "bar" ? (
          <BarChart data={previewChartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 10, fill: "#64748b" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 10, fill: "#64748b" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip />
            <Bar dataKey="value" fill="#2563eb" radius={[4, 4, 0, 0]} />
          </BarChart>
        ) : widget.type === "line" ? (
          <LineChart data={previewChartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 10, fill: "#64748b" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 10, fill: "#64748b" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#2563eb"
              strokeWidth={3}
              dot={{ r: 4, fill: "#2563eb", strokeWidth: 2, stroke: "#fff" }}
            />
          </LineChart>
        ) : widget.type === "area" ? (
          <AreaChart data={previewChartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 10, fill: "#64748b" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 10, fill: "#64748b" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#2563eb"
              fill="#bfdbfe"
              strokeWidth={2}
            />
          </AreaChart>
        ) : widget.type === "pie" ? (
          <PieChart>
            <Pie
              data={previewPieData}
              dataKey="value"
              nameKey="name"
              innerRadius={30}
              outerRadius={50}
              paddingAngle={2}
            >
              {previewPieData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        ) : (
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis
              type="number"
              dataKey="quantity"
              tick={{ fontSize: 10, fill: "#64748b" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              type="number"
              dataKey="totalAmount"
              tick={{ fontSize: 10, fill: "#64748b" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip />
            <Scatter data={previewScatterData} fill="#10b981" />
          </ScatterChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}

function DashboardConfig({
  configuredWidgets = [],
  setConfiguredWidgets,
  onBack,
  onSaveConfiguration,
}) {
  const [localWidgets, setLocalWidgets] = useState([]);
  const [showUnsavedModal, setShowUnsavedModal] = useState(false);
  const [selectedWidgetId, setSelectedWidgetId] = useState(null);

  const normalizeWidget = (w) => ({
    ...w,
    w: w.w > 20 ? 3 : w.w,
    h: w.h > 20 ? 3 : w.h,
    x: w.x > 20 ? 0 : w.x,
    y: w.y > 20 ? 0 : w.y,
  });

  useEffect(() => {
    setLocalWidgets((configuredWidgets || []).map(normalizeWidget));
  }, [configuredWidgets]);

  const handleDragStart = (e, type) => {
    e.dataTransfer.setData("text/plain", type);
  };

  const handleDrop = (layout, item, e) => {
    const type = e.dataTransfer.getData("text/plain");
    if (!type || !DEFAULT_WIDGETS[type]) return;

    const defaultProps = DEFAULT_WIDGETS[type];

    const newWidget = {
      id: `${type}-${Date.now()}`,
      type,
      title: defaultProps.title,
      x: item?.x ?? 0,
      y: item?.y ?? 0,
      w: defaultProps.w,
      h: defaultProps.h,
    };

    setLocalWidgets((prev) => [...prev, newWidget]);
  };

  const handleLayoutChange = (layout) => {
    setLocalWidgets((prev) =>
      prev.map((widget) => {
        const layoutItem = layout.find((l) => l.i === widget.id);
        if (!layoutItem) return widget;

        return {
          ...widget,
          x: layoutItem.x,
          y: layoutItem.y,
          w: layoutItem.w,
          h: layoutItem.h,
        };
      })
    );
  };

  const handleRemoveWidget = (id) => {
    setLocalWidgets((prev) => prev.filter((widget) => widget.id !== id));
    if (selectedWidgetId === id) {
      setSelectedWidgetId(null);
    }
  };

  const handleSaveWidgetConfig = (id, newConfig) => {
    setLocalWidgets((prev) =>
      prev.map((widget) => {
        if (widget.id !== id) return widget;

        return {
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
        };
      })
    );
  };

  const handleBackClick = () => {
    const original = (configuredWidgets || []).map(normalizeWidget);
    const hasChanges = JSON.stringify(localWidgets) !== JSON.stringify(original);

    if (hasChanges) {
      setShowUnsavedModal(true);
    } else {
      onBack();
    }
  };

  const saveConfiguration = () => {
    setConfiguredWidgets(localWidgets);
    onSaveConfiguration();
  };

  const selectedWidget = localWidgets.find((widget) => widget.id === selectedWidgetId);

  return (
    <div
      className="builder-page"
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="builder-header">
        <button className="builder-back-btn" onClick={handleBackClick}>
          ←
        </button>

        <div>
          <h2>Configure dashboard</h2>
          <p>Drag and drop widgets to configure your dashboard</p>
        </div>
      </div>

      <div
        className="builder-body"
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "20px",
          flex: 1,
        }}
      >
        <div style={{ width: "240px", flexShrink: 0 }}>
          <div
            style={{
              padding: "16px",
              background: "#f8fafc",
              borderRadius: "12px",
            }}
          >
            <h3 style={{ margin: "0 0 4px 0", fontSize: "16px" }}>Widget library</h3>
            <p style={{ margin: "0 0 16px 0", fontSize: "12px", color: "#64748b" }}>
              Drag and drop to your canvas
            </p>

            <div style={{ marginBottom: "16px" }}>
              <h4 style={{ margin: "0 0 8px 0", fontSize: "14px", color: "#475569" }}>
                Charts
              </h4>

              {["bar", "line", "pie", "area", "scatter"].map((type) => (
                <div
                  key={type}
                  draggable
                  onDragStart={(e) => handleDragStart(e, type)}
                  style={{
                    padding: "10px",
                    background: "#fff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    marginBottom: "8px",
                    cursor: "grab",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "14px",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                  }}
                >
                  <span style={{ color: "#94a3b8" }}>⋮⋮</span>
                  <span>{DEFAULT_WIDGETS[type].title}</span>
                </div>
              ))}
            </div>

            <div style={{ marginBottom: "16px" }}>
              <h4 style={{ margin: "0 0 8px 0", fontSize: "14px", color: "#475569" }}>
                Tables
              </h4>

              <div
                draggable
                onDragStart={(e) => handleDragStart(e, "table")}
                style={{
                  padding: "10px",
                  background: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  cursor: "grab",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "14px",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                }}
              >
                <span style={{ color: "#94a3b8" }}>⋮⋮</span>
                <span>Table</span>
              </div>
            </div>

            <div>
              <h4 style={{ margin: "0 0 8px 0", fontSize: "14px", color: "#475569" }}>
                KPIs
              </h4>

              <div
                draggable
                onDragStart={(e) => handleDragStart(e, "kpi")}
                style={{
                  padding: "10px",
                  background: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  cursor: "grab",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "14px",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                }}
              >
                <span style={{ color: "#94a3b8" }}>⋮⋮</span>
                <span>KPI Value</span>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            background: "#f8fafc",
            borderRadius: "12px",
            border: "1px dashed #cbd5e1",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div style={{ flex: 1, padding: "10px", overflowY: "auto" }}>
            {localWidgets.length === 0 && (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "#94a3b8",
                  textAlign: "center",
                  pointerEvents: "none",
                }}
              >
                <h3 style={{ margin: "0 0 8px 0" }}>Empty Grid</h3>
                <p style={{ margin: 0, fontSize: "14px" }}>
                  Drag widgets here to start building your dashboard
                </p>
              </div>
            )}

            <ResponsiveGridLayout
              className="layout"
              layouts={{
                lg: localWidgets.map((w) => ({
                  i: w.id,
                  x: w.x,
                  y: w.y,
                  w: w.w,
                  h: w.h,
                })),
              }}
              breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
              cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
              rowHeight={90}
              margin={[12, 12]}
              compactType="vertical"
              preventCollision={false}
              isDraggable={true}
              isResizable={true}
              isDroppable={true}
              onDrop={handleDrop}
              onLayoutChange={handleLayoutChange}
              draggableHandle=".drag-handle"
              style={{ minHeight: "100%" }}
            >
              {localWidgets.map((widget) => (
                <div
                  key={widget.id}
                  style={{
                    background: "#fff",
                    borderRadius: "12px",
                    boxShadow:
                      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                    border:
                      selectedWidgetId === widget.id
                        ? "2px solid #2563eb"
                        : "1px solid transparent",
                  }}
                >
                  <div
                    className="drag-handle"
                    style={{
                      padding: "12px 16px",
                      borderBottom: "1px solid #f1f5f9",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      cursor: "grab",
                      background: "#fdfdfd",
                    }}
                  >
                    <span
                      style={{
                        fontWeight: "600",
                        fontSize: "14px",
                        color: "#0f172a",
                      }}
                    >
                      {widget.title}
                    </span>

                    <div style={{ display: "flex", gap: "8px" }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedWidgetId(widget.id);
                        }}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          color: "#64748b",
                          padding: "4px",
                          borderRadius: "4px",
                        }}
                        title="Settings"
                      >
                        ⚙️
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveWidget(widget.id);
                        }}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          color: "#ef4444",
                          padding: "4px",
                          borderRadius: "4px",
                        }}
                        title="Delete"
                      >
                        ×
                      </button>
                    </div>
                  </div>

                  <div style={{ flex: 1, overflow: "hidden" }}>
                    <WidgetPreview widget={widget} />
                  </div>
                </div>
              ))}
            </ResponsiveGridLayout>
          </div>

          <div
            style={{
              padding: "16px 24px",
              background: "#fff",
              borderTop: "1px solid #e2e8f0",
              display: "flex",
              justifyContent: "flex-end",
              gap: "12px",
            }}
          >
            <button
              onClick={handleBackClick}
              style={{
                padding: "10px 20px",
                background: "#fff",
                border: "1px solid #cbd5e1",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
                color: "#475569",
              }}
            >
              Cancel
            </button>

            <button
              onClick={saveConfiguration}
              style={{
                padding: "10px 20px",
                background: "#63d39b",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
                color: "#fff",
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>

      <WidgetConfigurationPanel
        isOpen={!!selectedWidgetId}
        widget={selectedWidget}
        onClose={() => setSelectedWidgetId(null)}
        onSave={handleSaveWidgetConfig}
      />

      <UnsavedChangesModal
        isOpen={showUnsavedModal}
        onDiscard={() => {
          setShowUnsavedModal(false);
          onBack();
        }}
        onSave={() => {
          setShowUnsavedModal(false);
          saveConfiguration();
        }}
        onClose={() => setShowUnsavedModal(false)}
      />
    </div>
  );
}

export default DashboardConfig;