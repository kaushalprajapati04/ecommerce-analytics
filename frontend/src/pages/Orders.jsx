import { useEffect, useState, useMemo } from "react";
import { getOrders, getCustomers } from "../services/api";
import {
  CartIcon,
  SearchIcon,
  RefreshIcon,
  TruckIcon,
  ClockIcon,
  CheckCircleIcon,
  AlertCircleIcon,
} from "../components/Icons";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [customersMap, setCustomersMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    setError("");

    try {
      const [ordersRes, customersRes] = await Promise.all([
        getOrders(),
        getCustomers().catch(() => null),
      ]);

      setOrders(ordersRes.data || []);

      if (customersRes && customersRes.data) {
        const map = {};
        customersRes.data.forEach((c) => {
          map[c.customer_id] = c;
        });
        setCustomersMap(map);
      }
    } catch (err) {
      console.error("Orders Error:", err);
      setError("Failed to load customer orders from server.");
    } finally {
      setLoading(false);
    }
  };

  const getCustomerInitials = (customer, customerId) => {
    if (customer && customer.first_name) {
      const first = customer.first_name.charAt(0);
      const last = customer.last_name ? customer.last_name.charAt(0) : "";
      return `${first}${last}`.toUpperCase();
    }
    return `C${customerId}`;
  };

  const getCustomerName = (customer, customerId) => {
    if (customer && customer.first_name) {
      return `${customer.first_name} ${customer.last_name || ""}`.trim();
    }
    return `Customer #${customerId}`;
  };

  const filteredOrders = useMemo(() => {
    if (!searchTerm.trim()) return orders;
    const term = searchTerm.toLowerCase().trim();
    return orders.filter((order) => {
      const customer = customersMap[order.customer_id];
      const customerName = customer
        ? `${customer.first_name || ""} ${customer.last_name || ""}`.toLowerCase()
        : "";
      const orderIdStr = String(order.order_id);
      const customerIdStr = String(order.customer_id);
      const customerText = `customer #${order.customer_id}`.toLowerCase();
      const statusText = (order.status || "").toLowerCase();

      return (
        orderIdStr.includes(term) ||
        `#${orderIdStr}`.includes(term) ||
        customerIdStr.includes(term) ||
        customerText.includes(term) ||
        customerName.includes(term) ||
        statusText.includes(term)
      );
    });
  }, [orders, customersMap, searchTerm]);

  const formatDate = (dateString) => {
    if (!dateString) return "—";
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatAmount = (amount) => {
    return `₹${Number(amount).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Delivered":
        return (
          <span className="order-status-badge badge-delivered">
            <CheckCircleIcon className="badge-icon" />
            <span>Delivered</span>
          </span>
        );
      case "Shipped":
        return (
          <span className="order-status-badge badge-shipped">
            <TruckIcon className="badge-icon" />
            <span>Shipped</span>
          </span>
        );
      case "Processing":
        return (
          <span className="order-status-badge badge-processing">
            <ClockIcon className="badge-icon" />
            <span>Processing</span>
          </span>
        );
      case "Pending":
        return (
          <span className="order-status-badge badge-pending">
            <span className="badge-dot"></span>
            <span>Pending</span>
          </span>
        );
      case "Cancelled":
        return (
          <span className="order-status-badge badge-cancelled">
            <AlertCircleIcon className="badge-icon" />
            <span>Cancelled</span>
          </span>
        );
      default:
        return (
          <span className="order-status-badge badge-pending">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="orders-page page-container">
      {/* Orders Header Section */}
      <div className="page-header">
        <div>
          <h1>Orders</h1>
          <p>Manage and monitor customer orders</p>
        </div>

        <div className="header-actions">
          <div className="count-badge">
            <CartIcon />
            <span>{orders.length} Orders</span>
          </div>

          <button
            type="button"
            className="refresh-button"
            onClick={fetchOrders}
            disabled={loading}
            aria-label="Refresh orders"
          >
            <RefreshIcon spinning={loading} />
            <span>{loading ? "Refreshing..." : "Refresh"}</span>
          </button>
        </div>
      </div>

      {/* Error state matching Dashboard & Products */}
      {error && (
        <div className="alert-error">
          <div className="alert-content">
            <strong>Error:</strong>
            <span>{error}</span>
          </div>
          <button type="button" className="btn-retry" onClick={fetchOrders}>
            Try Again
          </button>
        </div>
      )}

      {/* Main Order Management Card/Table */}
      <div className="table-card content-card-table">
        <div className="table-header-bar">
          <div>
            <h2>Order Management</h2>
            <span>
              Showing {filteredOrders.length} of {orders.length} total orders
            </span>
          </div>

          <div className="table-search-box">
            <SearchIcon className="search-svg" />
            <input
              type="text"
              placeholder="Search by order ID or customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            {searchTerm && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => setSearchTerm("")}
                aria-label="Clear search input"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {loading && !orders.length ? (
          <div className="loading-card">
            <div className="spinner"></div>
            <h3>Loading orders...</h3>
            <p>Fetching transaction records from MySQL database.</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="empty-state">
            <CartIcon className="empty-icon" />
            <h3>No orders found</h3>
            <p>
              {searchTerm
                ? `No orders match your search query "${searchTerm}".`
                : "No customer orders are currently recorded."}
            </p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="modern-table">
              <thead>
                <tr>
                  <th style={{ width: "110px" }}>ORDER ID</th>
                  <th>CUSTOMER</th>
                  <th>ORDER DATE</th>
                  <th>STATUS</th>
                  <th style={{ textAlign: "right" }}>TOTAL AMOUNT</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => {
                  const customer = customersMap[order.customer_id];
                  const initials = getCustomerInitials(customer, order.customer_id);
                  const customerDisplayName = getCustomerName(customer, order.customer_id);

                  return (
                    <tr key={order.order_id}>
                      <td>
                        <span className="id-badge order-id">#{order.order_id}</span>
                      </td>
                      <td>
                        <div className="customer-inline">
                          <div className="customer-avatar-small">
                            {initials}
                          </div>
                          <span className="customer-label">
                            <strong>{customerDisplayName}</strong>
                          </span>
                        </div>
                      </td>
                      <td>
                        <span className="date-cell">
                          {formatDate(order.order_date)}
                        </span>
                      </td>
                      <td>
                        {getStatusBadge(order.status)}
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <strong className="order-amount">
                          {formatAmount(order.total_amount)}
                        </strong>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <div className="table-footer">
          <span>
            Total: <strong>{filteredOrders.length}</strong> of{" "}
            <strong>{orders.length}</strong> orders
          </span>
        </div>
      </div>
    </div>
  );
}

export default Orders;