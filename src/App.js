import React, { useEffect, useMemo, useState } from "react";
import API from "./api";
import GridCanvas from "./components/GridCanvas";
import DashboardConfig from "./components/DashboardConfig";
import OrderModal from "./components/OrderModal";
import LoginPage from "./LoginPage";
import "./App.css";

function App() {
  const [page, setPage] = useState("canvas");
  const [orders, setOrders] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editOrder, setEditOrder] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("adminLoggedIn") === "true"
  );
  const [activeWidget, setActiveWidget] = useState("dashboard");
  const [dateFilter, setDateFilter] = useState(
    localStorage.getItem("dashboardDateFilter") || "All time"
  );

  const [configuredWidgets, setConfiguredWidgets] = useState(() => {
    const saved = localStorage.getItem("configuredWidgets");
    return saved ? JSON.parse(saved) : [];
  });

  const [dashboardData, setDashboardData] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0,
    totalSoldQuantity: 0,
    monthlyRevenue: [],
    statusData: [],
  });

  const fetchOrders = async () => {
    try {
      const response = await API.get("/orders");
      const data = Array.isArray(response.data) ? response.data : [];
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchOrders();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem("configuredWidgets", JSON.stringify(configuredWidgets));
  }, [configuredWidgets]);

  useEffect(() => {
    localStorage.setItem("dashboardDateFilter", dateFilter);
  }, [dateFilter]);

  const filteredOrders = useMemo(() => {
    if (dateFilter === "All time") return orders;

    const now = new Date();

    return orders.filter((item) => {
      if (!item.orderDate) return false;
      const orderDate = new Date(item.orderDate);
      if (isNaN(orderDate.getTime())) return false;

      const diffDays = (now - orderDate) / (1000 * 60 * 60 * 24);

      if (dateFilter === "Today") return diffDays < 1;
      if (dateFilter === "Last 7 Days") return diffDays <= 7;
      if (dateFilter === "Last 30 Days") return diffDays <= 30;
      if (dateFilter === "Last 90 Days") return diffDays <= 90;

      return true;
    });
  }, [orders, dateFilter]);

  useEffect(() => {
    const totalOrders = filteredOrders.length;

    const totalRevenue = filteredOrders.reduce(
      (sum, item) => sum + Number(item.totalAmount || 0),
      0
    );

    const totalSoldQuantity = filteredOrders.reduce(
      (sum, item) => sum + Number(item.quantity || 0),
      0
    );

    const totalCustomers = new Set(
      filteredOrders.map(
        (item) =>
          `${item.firstName || ""} ${item.lastName || ""}`.trim() || item.email
      )
    ).size;

    const monthMap = {};
    filteredOrders.forEach((item) => {
      let month = "N/A";
      if (item.orderDate) {
        const dateObj = new Date(item.orderDate);
        if (!isNaN(dateObj.getTime())) {
          month = dateObj.toLocaleString("default", { month: "short" });
        }
      }
      monthMap[month] = (monthMap[month] || 0) + Number(item.totalAmount || 0);
    });

    const monthOrder = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
      "N/A",
    ];

    const monthlyRevenue = Object.keys(monthMap)
      .map((month) => ({
        month,
        revenue: monthMap[month],
      }))
      .sort(
        (a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month)
      );

    const statusMap = {};
    filteredOrders.forEach((item) => {
      const status = item.status || "Unknown";
      statusMap[status] = (statusMap[status] || 0) + 1;
    });

    const statusData = Object.keys(statusMap).map((status) => ({
      name: status,
      value: statusMap[status],
    }));

    setDashboardData({
      totalOrders,
      totalRevenue,
      totalCustomers,
      totalSoldQuantity,
      monthlyRevenue,
      statusData,
    });
  }, [filteredOrders]);

  const handleCreateOrder = () => {
    setEditOrder(null);
    setModalOpen(true);
  };

  const handleEditOrder = (order) => {
    setEditOrder(order);
    setModalOpen(true);
  };

  const handleDeleteOrder = async (id) => {
    try {
      await API.delete(`/orders/${id}`);
      fetchOrders();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleSaveOrder = async (formData) => {
    try {
      if (editOrder) {
        await API.put(`/orders/${editOrder.id || editOrder.orderId}`, formData);
      } else {
        await API.post("/orders", formData);
      }

      setModalOpen(false);
      setEditOrder(null);
      fetchOrders();
      setActiveWidget("table");
      setPage("canvas");
    } catch (error) {
      console.error("Save failed:", error);
    }
  };

  const openDashboard = () => {
    setActiveWidget("dashboard");
    setPage("canvas");
  };

  const openOrdersTable = () => {
    setActiveWidget("table");
    setPage("canvas");
  };

  if (!isLoggedIn) {
    return <LoginPage onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="app-shell">
      <div className="main-page">
        {page !== "config" && (
          <div className="page-header">
            <div>
              <h1 className="page-title">Customer Orders Dashboard</h1>
              <p className="page-subtitle">
                View and manage customer orders and analytics
              </p>
            </div>

            <div className="top-right-controls">
              <select
                className="top-date-filter"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              >
                <option>All time</option>
                <option>Today</option>
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>Last 90 Days</option>
              </select>

              <button
                className="configure-btn"
                onClick={() => setPage("config")}
              >
                Configure Dashboard
              </button>
            </div>
          </div>
        )}

        {page === "config" ? (
          <DashboardConfig
            configuredWidgets={configuredWidgets}
            setConfiguredWidgets={setConfiguredWidgets}
            onBack={openDashboard}
            onSaveConfiguration={() => {
              setPage("canvas");
              setActiveWidget("dashboard");
            }}
          />
        ) : (
          <GridCanvas
            activeWidget={activeWidget}
            setActiveWidget={setActiveWidget}
            totalOrders={dashboardData.totalOrders}
            totalRevenue={dashboardData.totalRevenue}
            totalCustomers={dashboardData.totalCustomers}
            totalSoldQuantity={dashboardData.totalSoldQuantity}
            monthlyRevenue={dashboardData.monthlyRevenue}
            statusData={dashboardData.statusData}
            orders={filteredOrders}
            allOrders={orders}
            onEdit={handleEditOrder}
            onDelete={handleDeleteOrder}
            onCreateOrder={handleCreateOrder}
            configuredWidgets={configuredWidgets}
            setConfiguredWidgets={setConfiguredWidgets}
            onOpenDashboard={openDashboard}
            onOpenOrdersTable={openOrdersTable}
          />
        )}
      </div>

      <OrderModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditOrder(null);
        }}
        onSave={handleSaveOrder}
        editData={editOrder}
      />
    </div>
  );
}

export default App;