import React, { useState } from "react";

function KPIWidgetConfig({ onSave, onClose, initialConfig }) {
  const [form, setForm] = useState({
    title: initialConfig?.title || "Untitled",
    description: initialConfig?.description || "",
    width: initialConfig?.width || 3,
    height: initialConfig?.height || 2,
    metric: initialConfig?.metric || "Revenue",
    aggregation: initialConfig?.aggregation || "Count",
    format: initialConfig?.format || "Number",
    precision: initialConfig?.precision || 0,
  });

  const metrics = ["Revenue", "Orders", "Customers", "Quantity"];

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (onSave) {
      onSave({
        ...form,
        width: Number(form.width),
        height: Number(form.height),
        precision: Number(form.precision),
      });
    }
    if (onClose) onClose();
  };

  return (
    <div className="kpi-config-container">
      <div className="kpi-config-card">
        <h2>Widget Configuration - KPI</h2>

        <label>Widget title *</label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />

        <label>Widget type *</label>
        <input type="text" value="KPI" readOnly />

        <label>Description</label>
        <textarea
          placeholder="Enter description"
          value={form.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />

        <div className="size-row">
          <div>
            <label>Width (Columns)</label>
            <select
              value={form.width}
              onChange={(e) => handleChange("width", e.target.value)}
            >
              {[2, 3, 4, 5, 6].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Height (Rows)</label>
            <select
              value={form.height}
              onChange={(e) => handleChange("height", e.target.value)}
            >
              {[2, 3, 4].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
        </div>

        <label>Select metric *</label>
        <select
          value={form.metric}
          onChange={(e) => handleChange("metric", e.target.value)}
        >
          {metrics.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>

        <label>Aggregation *</label>
        <select
          value={form.aggregation}
          onChange={(e) => handleChange("aggregation", e.target.value)}
        >
          <option>Count</option>
          <option>Sum</option>
          <option>Average</option>
        </select>

        <label>Data format *</label>
        <select
          value={form.format}
          onChange={(e) => handleChange("format", e.target.value)}
        >
          <option>Number</option>
          <option>Currency</option>
        </select>

        <label>Decimal precision</label>
        <input
          type="number"
          min="0"
          value={form.precision}
          onChange={(e) => handleChange("precision", e.target.value)}
        />

        <div className="config-buttons">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="save-btn" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default KPIWidgetConfig;