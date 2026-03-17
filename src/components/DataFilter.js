import React from "react";

function DateFilter({ onChange }) {
  return (
    <div className="date-filter">

      <label>Show data for</label>

      <select onChange={(e) => onChange(e.target.value)}>
        <option>All time</option>
        <option>Today</option>
        <option>Last 7 Days</option>
        <option>Last 30 Days</option>
        <option>Last 90 Days</option>
      </select>

    </div>
  );
}

export default DateFilter;