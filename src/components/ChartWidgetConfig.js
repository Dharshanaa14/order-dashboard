import React, { useEffect, useState } from "react";
function ChartWidgetConfig({
  isOpen,
  onClose,
  onSave,
  widgetType,
  initialConfig,
}) {
  const [form, setForm] = useState({
    title: "",
    type: "",
    description: "",
    width: 6,
    height: 4,
    xField: "",
    yField: "",
    showLegend: true,
    showLabel: false,
  });
  useEffect(() => {
    if (isOpen) {
      setForm({
        title: initialConfig?.title || "",
        type: widgetType || "",
        description: initialConfig?.description || "",
        width: initialConfig?.width || 6,
        height: initialConfig?.height || 4,
        xField:
          initialConfig?.xField ||
          (widgetType === "pie"
            ? "name"
            : widgetType === "scatter"
            ? "quantity"
            : "month"),
        yField:
          initialConfig?.yField ||
          (widgetType === "pie"
            ? "value"
            : widgetType === "scatter"
            ? "totalAmount"
            : "revenue"),
        showLegend:
          initialConfig?.showLegend !== undefined
            ? initialConfig.showLegend
            : true,
        showLabel:
          initialConfig?.showLabel !== undefined
            ? initialConfig.showLabel
            : false,
      });
    }
  }, [isOpen, initialConfig, widgetType]);
  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleSave = () => {
    onSave({
      ...form,
      width: Number(form.width),
      height: Number(form.height),
    });
    onClose();
  };
  if (!isOpen) return null;
  return (
    <div className="config-modal-overlay">
      <div className="config-modal-card">
        <div className="config-modal-header">
          <h2>Widget configuration</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="config-modal-body">
          <label>Widget title *</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
          <label>Widget type *</label>
          <input type="text" value={form.type.toUpperCase()} readOnly />
          <label>Description</label>
          <textarea
            value={form.description}
            placeholder="Description"
            onChange={(e) => handleChange("description", e.target.value)}
          />
          <h4>Widget size</h4>
          <div className="config-row">
            <div>
              <label>Width (Columns) *</label>
              <select
                value={form.width}
                onChange={(e) => handleChange("width", e.target.value)}
              >
                {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Height (Rows) *</label>
              <select
                value={form.height}
                onChange={(e) => handleChange("height", e.target.value)}
              >
                {[2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <h4>Data setting</h4>
          <label>Choose X-axis data</label>
          <select
            value={form.xField}
            onChange={(e) => handleChange("xField", e.target.value)}
          >
            {widgetType === "pie" ? (
              <>
                <option value="name">Name</option>
                <option value="status">Status</option>
              </>
            ) : widgetType === "scatter" ? (
              <>
                <option value="quantity">Quantity</option>
                <option value="unitPrice">Unit Price</option>
              </>
            ) : (
              <>
                <option value="month">Month</option>
                <option value="name">Name</option>
              </>
            )}
          </select>
          <label>Choose Y-axis data</label>
          <select
            value={form.yField}
            onChange={(e) => handleChange("yField", e.target.value)}
          >
            {widgetType === "pie" ? (
              <option value="value">Value</option>
            ) : widgetType === "scatter" ? (
              <>
                <option value="totalAmount">Total Amount</option>
                <option value="quantity">Quantity</option>
              </>
            ) : (
              <>
                <option value="revenue">Revenue</option>
                <option value="orders">Orders</option>
                <option value="customers">Customers</option>
                <option value="quantity">Quantity</option>
              </>
            )}
          </select>
          <div className="config-checkbox-row">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={form.showLegend}
                onChange={(e) => handleChange("showLegend", e.target.checked)}
              />
              Show legend
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={form.showLabel}
                onChange={(e) => handleChange("showLabel", e.target.checked)}
              />
              Show data label
            </label>
          </div>
        </div>
        <div className="config-modal-actions">
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
export default ChartWidgetConfig;