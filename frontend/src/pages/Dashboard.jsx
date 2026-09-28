import { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import { getDashboardSummary } from "../services/api";
import {
  FolderIcon,
  FactoryIcon,
  PackageIcon,
  UsersIcon,
  CartIcon,
  ClipboardListIcon,
  CreditCardIcon,
  StarIcon,
  RefreshIcon,
  DatabaseIcon,
  ServerIcon,
  ActivityIcon,
} from "../components/Icons";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const result = await getDashboardSummary();

      if (result.success) {
        setDashboardData(result.data);
      } else {
        setError("Failed to load dashboard data");
      }
    } catch (err) {
      console.error("Dashboard API Error:", err);
      setError("Unable to connect to the backend server");
    } finally {
      setLoading(false);
    }
  };

  const stats = dashboardData
    ? [
        {
          title: "Categories",
          value: dashboardData.total_categories,
          icon: <FolderIcon className="stat-svg" />,
          description: "Product categories",
          color: "blue",
        },
        {
          title: "Suppliers",
          value: dashboardData.total_suppliers,
          icon: <FactoryIcon className="stat-svg" />,
          description: "Registered suppliers",
          color: "indigo",
        },
        {
          title: "Products",
          value: dashboardData.total_products,
          icon: <PackageIcon className="stat-svg" />,
          description: "Products in catalog",
          color: "emerald",
        },
        {
          title: "Customers",
          value: dashboardData.total_customers,
          icon: <UsersIcon className="stat-svg" />,
          description: "Registered customers",
          color: "violet",
        },
        {
          title: "Orders",
          value: dashboardData.total_orders,
          icon: <CartIcon className="stat-svg" />,
          description: "Total orders",
          color: "amber",
        },
        {
          title: "Order Items",
          value: dashboardData.total_order_items,
          icon: <ClipboardListIcon className="stat-svg" />,
          description: "Items purchased",
          color: "sky",
        },
        {
          title: "Payments",
          value: dashboardData.total_payments,
          icon: <CreditCardIcon className="stat-svg" />,
          description: "Payment records",
          color: "teal",
        },
        {
          title: "Reviews",
          value: dashboardData.total_reviews,
          icon: <StarIcon className="stat-svg" />,
          description: "Customer reviews",
          color: "rose",
        },
      ]
    : [];

  return (
    <div className="dashboard-page page-container">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1>E-Commerce Dashboard</h1>
          <p>Overview of your e-commerce database and business data.</p>
        </div>

        <button
          type="button"
          className="refresh-button"
          onClick={loadDashboard}
          disabled={loading}
          aria-label="Refresh dashboard data"
        >
          <RefreshIcon spinning={loading} />
          <span>{loading ? "Refreshing..." : "Refresh"}</span>
        </button>
      </div>

      {/* Loading State */}
      {loading && !dashboardData && (
        <div className="content-card loading-card">
          <div className="spinner"></div>
          <h3>Loading dashboard data...</h3>
          <p>Fetching real-time metrics from MySQL backend.</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="alert-error">
          <div className="alert-content">
            <strong>Connection Error:</strong>
            <span>{error}</span>
          </div>
          <button type="button" className="btn-retry" onClick={loadDashboard}>
            Try Again
          </button>
        </div>
      )}

      {/* Dashboard Content */}
      {dashboardData && (
        <>
          {/* Stats Grid: 4-col desktop, 2-col tablet, 1-col mobile */}
          <div className="stats-grid">
            {stats.map((stat) => (
              <StatCard
                key={stat.title}
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
                description={stat.description}
                iconColor={stat.color}
              />
            ))}
          </div>

          {/* Database Overview & System Status */}
          <div className="dashboard-bottom">
            {/* Database Overview */}
            <div className="content-card">
              <div className="card-heading">
                <div className="card-heading-icon db-icon-wrap">
                  <DatabaseIcon />
                </div>
                <div>
                  <h2>DATABASE OVERVIEW</h2>
                  <p>Current records available in your system</p>
                </div>
              </div>

              <div className="overview-list">
                <div className="overview-item">
                  <div className="overview-item-left">
                    <span className="overview-bullet bullet-blue"></span>
                    <span>Products in catalog</span>
                  </div>
                  <strong className="overview-badge">
                    {dashboardData.total_products}
                  </strong>
                </div>

                <div className="overview-item">
                  <div className="overview-item-left">
                    <span className="overview-bullet bullet-purple"></span>
                    <span>Registered customers</span>
                  </div>
                  <strong className="overview-badge">
                    {dashboardData.total_customers}
                  </strong>
                </div>

                <div className="overview-item">
                  <div className="overview-item-left">
                    <span className="overview-bullet bullet-emerald"></span>
                    <span>Total orders</span>
                  </div>
                  <strong className="overview-badge">
                    {dashboardData.total_orders}
                  </strong>
                </div>

                <div className="overview-item">
                  <div className="overview-item-left">
                    <span className="overview-bullet bullet-amber"></span>
                    <span>Customer reviews</span>
                  </div>
                  <strong className="overview-badge">
                    {dashboardData.total_reviews}
                  </strong>
                </div>
              </div>
            </div>

            {/* System Status */}
            <div className="content-card">
              <div className="card-heading">
                <div className="card-heading-icon sys-icon-wrap">
                  <ServerIcon />
                </div>
                <div>
                  <h2>SYSTEM STATUS</h2>
                  <p>Real-time application health & connectivity</p>
                </div>
              </div>

              <div className="system-status">
                <div className="system-status-item">
                  <div className="status-indicator-wrap">
                    <span className="status-indicator pulse-green"></span>
                  </div>
                  <div className="status-info">
                    <strong>Backend API</strong>
                    <p>Running on port 5000</p>
                  </div>
                  <span className="system-badge badge-healthy">Healthy</span>
                </div>

                <div className="system-status-item">
                  <div className="status-indicator-wrap">
                    <span className="status-indicator pulse-green"></span>
                  </div>
                  <div className="status-info">
                    <strong>MySQL Database</strong>
                    <p>Connected successfully</p>
                  </div>
                  <span className="system-badge badge-healthy">Active</span>
                </div>

                <div className="system-status-item">
                  <div className="status-indicator-wrap">
                    <span className="status-indicator pulse-green"></span>
                  </div>
                  <div className="status-info">
                    <strong>Dashboard API</strong>
                    <p>Data loaded successfully</p>
                  </div>
                  <span className="system-badge badge-healthy">Operational</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;