import React, { useEffect, useState } from "react";

function WidgetConfigurationPanel({ isOpen, widget, onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    description: "",
    width: 6,
    height: 4,
    metric: "Revenue",
    aggregation: "Sum",
    dataFormat: "Currency",
    decimalPrecision: 0,
    showLegend: true,
    showLabel: false,
  });

  useEffect(() => {
    if (widget && isOpen) {
      setFormData({
        title: widget.title || "Untitled",
        type: widget.type || "",
        description: widget.description || "",
        width: widget.w || 6,
        height: widget.h || 4,
        metric: widget.metric || "Revenue",
        aggregation: widget.aggregation || "Sum",
        dataFormat: widget.dataFormat || "Currency",
        decimalPrecision:
          widget.decimalPrecision !== undefined ? widget.decimalPrecision : 0,
        showLegend:
          widget.showLegend !== undefined ? widget.showLegend : true,
        showLabel:
          widget.showLabel !== undefined ? widget.showLabel : false,
      });
    }
  }, [widget, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : ["width", "height", "decimalPrecision"].includes(name)
          ? Number(value)
          : value,
    }));
  };

  const handleSave = () => {
    onSave(widget.id, formData);
    onClose();
  };

  if (!isOpen || !widget) return null;

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
          <label>Widget title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />

          <label>Widget type</label>
          <input type="text" value={formData.type.toUpperCase()} readOnly />

          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />

          <div className="config-row">
            <div>
              <label>Width (Columns)</label>
              <select
                name="width"
                value={formData.width}
                onChange={handleChange}
              >
                {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Height (Rows)</label>
              <select
                name="height"
                value={formData.height}
                onChange={handleChange}
              >
                {[2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {(formData.type === "kpi" ||
            formData.type === "bar" ||
            formData.type === "line" ||
            formData.type === "area" ||
            formData.type === "pie" ||
            formData.type === "scatter") && (
            <>
              <label>Select metric</label>
              <select
                name="metric"
                value={formData.metric}
                onChange={handleChange}
              >
                <option value="Revenue">Revenue</option>
                <option value="Orders">Orders</option>
                <option value="Customers">Customers</option>
                <option value="Quantity">Quantity</option>
              </select>

              <label>Aggregation</label>
              <select
                name="aggregation"
                value={formData.aggregation}
                onChange={handleChange}
              >
                <option value="Sum">Sum</option>
                <option value="Average">Average</option>
                <option value="Count">Count</option>
              </select>

              <label>Data format</label>
              <select
                name="dataFormat"
                value={formData.dataFormat}
                onChange={handleChange}
              >
                <option value="Currency">Currency</option>
                <option value="Number">Number</option>
                <option value="Percentage">Percentage</option>
              </select>

              <label>Decimal precision</label>
              <input
                type="number"
                name="decimalPrecision"
                min="0"
                max="4"
                value={formData.decimalPrecision}
                onChange={handleChange}
              />

              {formData.type !== "kpi" && formData.type !== "table" && (
                <div className="config-checkbox-row">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="showLegend"
                      checked={formData.showLegend}
                      onChange={handleChange}
                    />
                    Show legend
                  </label>

                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="showLabel"
                      checked={formData.showLabel}
                      onChange={handleChange}
                    />
                    Show label
                  </label>
                </div>
              )}
            </>
          )}
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

export default WidgetConfigurationPanel;