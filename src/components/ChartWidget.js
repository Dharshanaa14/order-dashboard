import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  LineChart,
  Line,
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
} from "recharts";
const COLORS = [
  "#2563eb",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
  "#84cc16",
];
function ChartWidget({ type, data, title, onSettings, onDelete, config = {} }) {
  const safeData = Array.isArray(data) ? data : [];
  const showLegend = config.showLegend ?? true;
  const showLabel = config.showLabel ?? false;
  const xField =
    config.xField ||
    (type === "pie" ? "name" : type === "scatter" ? "quantity" : "month");
  const yField =
    config.yField ||
    (type === "pie"
      ? "value"
      : type === "scatter"
      ? "totalAmount"
      : "revenue");
  return (
    <div className="widget-card chart-card">
      <div className="widget-header-row">
        <h3 className="widget-title">{config.title || title}</h3>
        <div className="widget-actions-inline">
          <button
            type="button"
            className="widget-icon-btn"
            onClick={onSettings}
            title="Settings"
          >
            ⚙️
          </button>
          <button
            type="button"
            className="widget-icon-btn delete-btn"
            onClick={onDelete}
            title="Delete"
          >
            🗑️
          </button>
        </div>
      </div>
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height="100%">
          {type === "bar" ? (
            <BarChart data={safeData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis dataKey={xField} axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip />
              {showLegend && <Legend />}
              <Bar
                dataKey={yField}
                fill="#2563eb"
                radius={[8, 8, 0, 0]}
                label={showLabel}
              />
            </BarChart>
          ) : type === "line" ? (
            <LineChart data={safeData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis dataKey={xField} axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip />
              {showLegend && <Legend />}
              <Line
                type="monotone"
                dataKey={yField}
                stroke="#2563eb"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          ) : type === "area" ? (
            <AreaChart data={safeData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis dataKey={xField} axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip />
              {showLegend && <Legend />}
              <Area
                type="monotone"
                dataKey={yField}
                stroke="#2563eb"
                fill="#bfdbfe"
              />
            </AreaChart>
          ) : type === "pie" ? (
            <PieChart>
              <Pie
                data={safeData}
                dataKey={yField}
                nameKey={xField}
                cx="40%"
                cy="50%"
                outerRadius={95}
                label={showLabel}
              >
                {safeData.map((entry, index) => (
                  <Cell
                    key={`${entry?.name || "item"}-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              {showLegend && (
                <Legend layout="vertical" verticalAlign="middle" align="right" />
              )}
            </PieChart>
          ) : (
            <ScatterChart margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis type="number" dataKey={xField} name={xField} />
              <YAxis type="number" dataKey={yField} name={yField} />
              <Tooltip />
              {showLegend && <Legend />}
              <Scatter data={safeData} fill="#10b981" />
            </ScatterChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
export default ChartWidget;