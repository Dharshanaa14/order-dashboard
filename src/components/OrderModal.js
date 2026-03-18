import React, { useEffect, useState } from "react";

function OrderModal({ isOpen, onClose, onSave, editData }) {
  const emptyForm = {
    orderId: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    product: "",
    quantity: 1,
    unitPrice: "",
    totalAmount: "",
    status: "",
    createdBy: "",
    orderDate: "",
  };

  const [formData, setFormData] = useState(emptyForm);

  const formatDateForInput = (dateValue) => {
    if (!dateValue) return "";
    const date = new Date(dateValue);
    if (isNaN(date.getTime())) return "";
    return date.toISOString().split("T")[0];
  };

  useEffect(() => {
    if (editData) {
      setFormData({
        orderId: editData.orderId || "",
        firstName: editData.firstName || "",
        lastName: editData.lastName || "",
        email: editData.email || "",
        phoneNumber: editData.phoneNumber || "",
        address: editData.address || "",
        city: editData.city || "",
        state: editData.state || "",
        postalCode: editData.postalCode || "",
        country: editData.country || "",
        product: editData.product || "",
        quantity: editData.quantity ?? 1,
        unitPrice: editData.unitPrice ?? "",
        totalAmount: editData.totalAmount ?? "",
        status: editData.status || "",
        createdBy: editData.createdBy || "",
        orderDate: formatDateForInput(editData.orderDate),
      });
    } else {
      setFormData(emptyForm);
    }
  }, [editData, isOpen]);

  useEffect(() => {
    const qty = Number(formData.quantity || 0);
    const price = Number(formData.unitPrice || 0);
    const total = qty * price;

    setFormData((prev) => ({
      ...prev,
      totalAmount: qty > 0 && price > 0 ? total.toFixed(2) : "",
    }));
  }, [formData.quantity, formData.unitPrice]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      orderId: formData.orderId || `ORD-${String(Date.now()).slice(-5)}`,
      quantity: Number(formData.quantity || 0),
      unitPrice: Number(formData.unitPrice || 0),
      totalAmount: Number(formData.totalAmount || 0),
    };

    onSave(payload);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="ui-order-modal">
        <div className="ui-modal-header">
          <h2>{editData ? "Edit order" : "Create order"}</h2>
          <button type="button" className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="ui-order-form">
          <h4>Customer Information</h4>

          <div className="ui-form-grid">
            <div className="ui-field">
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>

            <div className="ui-field">
              <input
                type="email"
                name="email"
                placeholder="Email id"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="ui-field">
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>

            <div className="ui-field">
              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone number"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>

            <div className="ui-field full-width">
              <input
                type="text"
                name="address"
                placeholder="Street Address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <div className="ui-field">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
              />
            </div>

            <div className="ui-field">
              <input
                type="text"
                name="state"
                placeholder="State / Province"
                value={formData.state}
                onChange={handleChange}
              />
            </div>

            <div className="ui-field">
              <input
                type="text"
                name="postalCode"
                placeholder="Postal code"
                value={formData.postalCode}
                onChange={handleChange}
              />
            </div>

            <div className="ui-field">
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleChange}
              />
            </div>
          </div>

          <h4>Order Information</h4>

          <div className="ui-form-grid">
            <div className="ui-field full-width">
              <input
                type="text"
                name="product"
                placeholder="Choose product"
                value={formData.product}
                onChange={handleChange}
              />
            </div>

            <div className="ui-field">
              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                min="0"
                value={formData.quantity}
                onChange={handleChange}
              />
            </div>

            <div className="ui-field">
              <input
                type="number"
                name="unitPrice"
                placeholder="Unit price"
                min="0"
                step="0.01"
                value={formData.unitPrice}
                onChange={handleChange}
              />
            </div>

            <div className="ui-field">
              <input
                type="text"
                name="totalAmount"
                placeholder="Total amount"
                value={formData.totalAmount}
                readOnly
              />
            </div>

            <div className="ui-field">
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="">Status</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="In progress">In progress</option>
              </select>
            </div>

            <div className="ui-field">
              <input
                type="text"
                name="createdBy"
                placeholder="Created by"
                value={formData.createdBy}
                onChange={handleChange}
              />
            </div>

            <div className="ui-field">
              <input
                type="date"
                name="orderDate"
                value={formData.orderDate}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="ui-modal-actions">
            <button
              type="button"
              className="cancel-outline-btn"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="green-solid-btn">
              {editData ? "Save" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OrderModal;