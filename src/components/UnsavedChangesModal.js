import React from "react";

function UnsavedChangesModal({ isOpen, onDiscard, onSave, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" style={{ zIndex: 1100 }}>
      <div className="unsaved-changes-card" style={{ width: "400px", background: "#fff", borderRadius: "10px", boxShadow: "0 15px 30px rgba(16, 24, 40, 0.14)", overflow: "hidden" }}>
        <div className="mini-modal-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", borderBottom: "1px solid #edf1f5" }}>
          <h3 style={{ margin: 0, fontSize: "18px" }}>Unsaved changes</h3>
          <button onClick={onClose} style={{ border: "none", background: "transparent", fontSize: "22px", cursor: "pointer", color: "#98a2b3" }}>×</button>
        </div>
        <div style={{ padding: "22px 18px" }}>
          <p style={{ margin: 0, color: "#344054", fontSize: "14px" }}>
            Do you want to save your changes before navigating away
          </p>
          <div className="mini-modal-actions" style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "20px" }}>
            <button className="cancel-outline-btn" style={{ background: "#fff", border: "1px solid #d0d5dd", color: "#344054", padding: "8px 14px", borderRadius: "8px", cursor: "pointer", fontWeight: "600", fontSize: "14px" }} onClick={onDiscard}>
              Discard
            </button>
            <button className="green-solid-btn" style={{ background: "#63d39b", border: "none", color: "#fff", padding: "8px 14px", borderRadius: "8px", cursor: "pointer", fontWeight: "600", fontSize: "14px" }} onClick={onSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UnsavedChangesModal;
