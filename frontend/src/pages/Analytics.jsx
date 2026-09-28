import { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import { getAnalyticsSummary } from "../services/api";
import {
  RupeeIcon,
  CartIcon,
  AnalyticsIcon,
  CheckCircleIcon,
  TruckIcon,
  ClockIcon,
  AlertCircleIcon,
  RefreshIcon,
} from "../components/Icons";

function Analytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await getAnalyticsSummary();
      const analyticsData = result.data || result;
      setData(analyticsData);
    } catch (err) {
      console.error("Analytics Error:", err);
      setError("Failed to load analytics metrics from MySQL server.");
    } finally {
      setLoading(false);
    }
  };

  const totalOrders = data?.totalOrders || 0;
  const statusDistribution = data?.statusDistribution || {};

  const formatCurrency = (val) => {
    return `₹${Number(val || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const getPercentage = (count) => {
    if (!totalOrders) return 0;
    return Math.round((count / totalOrders) * 100);
  };

  const statusList = [
    {
      name: "Delivered",
      count: statusDistribution.Delivered || 0,
      pct: getPercentage(statusDistribution.Delivered || 0),
      color: "#10b981",
      bgColor: "#f0fdf4",
      borderColor: "#bbf7d0",
      textColor: "#15803d",
      icon: <CheckCircleIcon className="tiny-icon" />,
    },
    {
      name: "Shipped",
      count: statusDistribution.Shipped || 0,
      pct: getPercentage(statusDistribution.Shipped || 0),
      color: "#3b82f6",
      bgColor: "#eff6ff",
      borderColor: "#bfdbfe",
      textColor: "#1d4ed8",
      icon: <TruckIcon className="tiny-icon" />,
    },
    {
      name: "Processing",
      count: statusDistribution.Processing || 0,
      pct: getPercentage(statusDistribution.Processing || 0),
      color: "#f59e0b",
      bgColor: "#fffbeb",
      borderColor: "#fde68a",
      textColor: "#b45309",
      icon: <ClockIcon className="tiny-icon" />,
    },
    {
      name: "Pending",
      count: statusDistribution.Pending || 0,
      pct: getPercentage(statusDistribution.Pending || 0),
      color: "#64748b",
      bgColor: "#f8fafc",
      borderColor: "#e2e8f0",
      textColor: "#475569",
      icon: <span className="badge-dot" style={{ backgroundColor: "#64748b" }}></span>,
    },
    {
      name: "Cancelled",
      count: statusDistribution.Cancelled || 0,
      pct: getPercentage(statusDistribution.Cancelled || 0),
      color: "#ef4444",
      bgColor: "#fef2f2",
      borderColor: "#fecaca",
      textColor: "#b91c1c",
      icon: <AlertCircleIcon className="tiny-icon" />,
    },
  ];

  return (
    <div className="analytics-page page-container">
      {/* Top Page Header */}
      <div className="page-header">
        <div>
          <h1>Analytics</h1>
          <p>Monitor your e-commerce business performance</p>
        </div>

        <div className="header-actions">
          <div className="count-badge">
            <CartIcon />
            <span>{totalOrders} Orders</span>
          </div>

          <button
            type="button"
            className="refresh-button"
            onClick={fetchAnalytics}
            disabled={loading}
            aria-label="Refresh analytics data"
          >
            <RefreshIcon spinning={loading} />
            <span>{loading ? "Refreshing..." : "Refresh"}</span>
          </button>
        </div>
      </div>

      {/* Error state matching Products & Orders */}
      {error && (
        <div className="alert-error">
          <div className="alert-content">
            <strong>Error:</strong>
            <span>{error}</span>
          </div>
          <button type="button" className="btn-retry" onClick={fetchAnalytics}>
            Try Again
          </button>
        </div>
      )}

      {loading && !data ? (
        <div className="content-card loading-card">
          <div className="spinner"></div>
          <h3>Loading analytics...</h3>
          <p>Fetching calculated metrics from MySQL database.</p>
        </div>
      ) : (
        <>
          {/* Summary Cards: 4 clean white cards matching Products/Orders design */}
          <div className="stats-grid">
            <StatCard
              title="Total Revenue"
              value={formatCurrency(data?.totalRevenue)}
              icon={<RupeeIcon className="stat-svg" />}
              description="From all orders"
              iconColor="blue"
            />
            <StatCard
              title="Total Orders"
              value={totalOrders}
              icon={<CartIcon className="stat-svg" />}
              description="All customer orders"
              iconColor="violet"
            />
            <StatCard
              title="Average Order Value"
              value={formatCurrency(data?.averageOrderValue)}
              icon={<AnalyticsIcon className="stat-svg" />}
              description="Average per order"
              iconColor="amber"
            />
            <StatCard
              title="Delivered Orders"
              value={data?.deliveredOrders || 0}
              icon={<CheckCircleIcon className="stat-svg" />}
              description="Successfully delivered"
              iconColor="emerald"
            />
          </div>

          {/* Order Status Overview: One large white card */}
          <div className="content-card analytics-section">
            <div className="section-title">
              <div>
                <h2>Order Status Overview</h2>
                <p>Real-time volume and distribution across order fulfillment stages</p>
              </div>
              <span className="section-badge">{totalOrders} total orders</span>
            </div>

            <div className="status-grid">
              {statusList.map((item) => (
                <div
                  key={item.name}
                  className="status-card"
                  style={{
                    backgroundColor: item.bgColor,
                    borderColor: item.borderColor,
                  }}
                >
                  <div className="status-card-header">
                    <span className="status-pill" style={{ color: item.textColor }}>
                      {item.icon} {item.name}
                    </span>
                    <span className="status-percentage" style={{ color: item.textColor }}>
                      {item.pct}%
                    </span>
                  </div>
                  <strong className="status-count" style={{ color: item.textColor }}>
                    {item.count}
                  </strong>
                  <span className="status-sub" style={{ color: item.textColor }}>
                    {item.count === 1 ? "1 order" : `${item.count} orders`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue Summary and Order Distribution Cards */}
          <div className="analytics-bottom">
            {/* Revenue Summary Card */}
            <div className="content-card analytics-panel">
              <div className="panel-header">
                <div>
                  <h2>Revenue Summary</h2>
                  <p>Financial breakdown of customer orders</p>
                </div>
              </div>

              <div className="summary-list">
                <div className="summary-row">
                  <div className="summary-label-wrap">
                    <span className="summary-dot dot-blue"></span>
                    <span>Total Revenue</span>
                  </div>
                  <strong className="summary-val-highlight">
                    {formatCurrency(data?.totalRevenue)}
                  </strong>
                </div>

                <div className="summary-row">
                  <div className="summary-label-wrap">
                    <span className="summary-dot dot-amber"></span>
                    <span>Average Order Value</span>
                  </div>
                  <strong>{formatCurrency(data?.averageOrderValue)}</strong>
                </div>

                <div className="summary-row">
                  <div className="summary-label-wrap">
                    <span className="summary-dot dot-emerald"></span>
                    <span>Delivered Orders Revenue</span>
                  </div>
                  <strong className="text-emerald">
                    {formatCurrency(data?.deliveredRevenue)}
                  </strong>
                </div>

                <div className="summary-row">
                  <div className="summary-label-wrap">
                    <span className="summary-dot dot-purple"></span>
                    <span>Total Orders Placed</span>
                  </div>
                  <strong>{totalOrders}</strong>
                </div>

                <div className="summary-row">
                  <div className="summary-label-wrap">
                    <span className="summary-dot dot-blue"></span>
                    <span>Order Fulfillment Rate</span>
                  </div>
                  <strong className="text-emerald">
                    {data?.fulfillmentRate || 0}% ({data?.deliveredOrders || 0} delivered)
                  </strong>
                </div>
              </div>
            </div>

            {/* Order Distribution Card */}
            <div className="content-card analytics-panel">
              <div className="panel-header">
                <div>
                  <h2>Order Distribution</h2>
                  <p>Volume proportion by fulfillment stage</p>
                </div>
              </div>

              <div className="distribution-list">
                {statusList.map((item) => {
                  const widthPercent = totalOrders
                    ? (item.count / totalOrders) * 100
                    : 0;

                  return (
                    <div key={item.name} className="distribution-row">
                      <div className="dist-label-wrap">
                        <span
                          className="dist-dot"
                          style={{ backgroundColor: item.color }}
                        ></span>
                        <span className="dist-name">{item.name}</span>
                      </div>

                      <div className="progress-track">
                        <div
                          className="progress-fill"
                          style={{
                            width: `${widthPercent}%`,
                            backgroundColor: item.color,
                          }}
                        ></div>
                      </div>

                      <div className="dist-meta">
                        <span className="dist-pct">
                          {item.pct}% ({item.count})
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Analytics;