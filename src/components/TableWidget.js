import React, { useMemo, useState } from "react";

function TableWidget({
  data = [],
  onEdit,
  onDelete,
  onCreateOrder,
  onGoDashboard,
  compact = false,
  title = "Customer Orders",
}) {
  const [search, setSearch] = useState("");
  const [menuOpenId, setMenuOpenId] = useState(null);

  const filteredData = useMemo(() => {
    const term = search.toLowerCase();

    return (Array.isArray(data) ? data : []).filter((order) => {
      return (
        String(order.orderId || "").toLowerCase().includes(term) ||
        String(order.email || "").toLowerCase().includes(term) ||
        String(order.product || "").toLowerCase().includes(term) ||
        String(order.status || "").toLowerCase().includes(term) ||
        String(order.firstName || "").toLowerCase().includes(term) ||
        String(order.lastName || "").toLowerCase().includes(term)
      );
    });
  }, [data, search]);

  const getRowId = (order, index) => order?.id ?? order?.orderId ?? index;

  const handleEditClick = (order) => {
    setMenuOpenId(null);
    onEdit(order);
  };

  const handleDeleteClick = async (order) => {
    setMenuOpenId(null);
    await onDelete(order.id);
  };

  return (
    <div className="customer-orders-card">
      <div className="customer-orders-header">
        <div>
          <h2>{title}</h2>
          <p>View and manage customer orders and details</p>
        </div>

        <div className="table-toolbar">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <span className="search-icon">⌕</span>
          </div>

          <button className="create-order-small-btn" onClick={onCreateOrder}>
            ⊕ Create order
          </button>
        </div>
      </div>

      {!compact && (
        <div className="table-tabs">
          <button className="tab-btn dashboard-link-btn" onClick={onGoDashboard}>
            Dashboard
          </button>
          <button className="tab-btn active-tab">Table</button>
        </div>
      )}

      {filteredData.length === 0 ? (
        <div className="empty-orders-state">
          <div className="empty-icon">⊞</div>
          <h3>No Orders Yet</h3>
          <p>Click Create Order and enter your order information</p>
          <button className="create-order-empty-btn" onClick={onCreateOrder}>
            ⊕ Create order
          </button>
        </div>
      ) : (
        <div className="orders-table-wrapper">
          <table className="modern-orders-table professional-orders-table">
            <thead>
              <tr>
                <th>S.no</th>
                <th>Customer name</th>
                <th>Email id</th>
                <th>Order ID</th>
                <th>Order date</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Total amount</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {filteredData.map((order, index) => {
                const rowId = getRowId(order, index);

                return (
                  <tr key={rowId}>
                    <td>{index + 1}</td>
                    <td>{`${order.firstName || ""} ${order.lastName || ""}`.trim() || "-"}</td>
                    <td>{order.email || "-"}</td>
                    <td>{order.orderId || "-"}</td>
                    <td>
                      {order.orderDate
                        ? new Date(order.orderDate).toLocaleDateString("en-US", {
                            month: "short",
                            day: "2-digit",
                            year: "numeric",
                          })
                        : "-"}
                    </td>
                    <td>{order.product || "-"}</td>
                    <td>{order.quantity ?? "-"}</td>
                    <td>$ {Number(order.totalAmount || 0).toFixed(2)}</td>
                    <td>
                      <span
                        className={`status-chip status-${String(order.status || "unknown")
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                      >
                        {order.status || "Unknown"}
                      </span>
                    </td>
                    <td className="menu-cell">
                      <button
                        className="menu-dots-btn"
                        onClick={() =>
                          setMenuOpenId(menuOpenId === rowId ? null : rowId)
                        }
                      >
                        ⋮
                      </button>

                      {menuOpenId === rowId && (
                        <div className="row-menu">
                          <button
                            type="button"
                            className="row-menu-item"
                            onClick={() => handleEditClick(order)}
                          >
                            ✎ Edit
                          </button>

                          <button
                            type="button"
                            className="row-menu-item delete-menu-item"
                            onClick={() => handleDeleteClick(order)}
                          >
                            🗑 Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TableWidget;