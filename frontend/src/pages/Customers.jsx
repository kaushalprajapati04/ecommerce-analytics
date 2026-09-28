import { useEffect, useState, useMemo } from "react";
import { getCustomers } from "../services/api";
import { UsersIcon, SearchIcon, RefreshIcon } from "../components/Icons";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      setError("");
      const result = await getCustomers();
      setCustomers(result.data || []);
    } catch (err) {
      console.error("Failed to fetch customers:", err);
      setError("Failed to load customer records from server.");
    } finally {
      setLoading(false);
    }
  };

  const filteredCustomers = useMemo(() => {
    if (!searchTerm.trim()) return customers;
    const term = searchTerm.toLowerCase().trim();
    return customers.filter((customer) => {
      const fullName = `${customer.first_name || ""} ${customer.last_name || ""}`.toLowerCase();
      const email = (customer.email || "").toLowerCase();
      return fullName.includes(term) || email.includes(term);
    });
  }, [customers, searchTerm]);

  const getInitials = (firstName = "", lastName = "") => {
    const f = firstName ? firstName.charAt(0) : "";
    const l = lastName ? lastName.charAt(0) : "";
    return `${f}${l}`.toUpperCase() || "C";
  };

  return (
    <div className="customers-page page-container">
      {/* Customers Header Section */}
      <div className="page-header">
        <div>
          <h1>Customers</h1>
          <p>Manage and monitor your customers</p>
        </div>

        <div className="header-actions">
          <div className="count-badge">
            <UsersIcon />
            <span>{customers.length} Customers</span>
          </div>

          <button
            type="button"
            className="refresh-button"
            onClick={fetchCustomers}
            disabled={loading}
            aria-label="Refresh customers"
          >
            <RefreshIcon spinning={loading} />
            <span>{loading ? "Refreshing..." : "Refresh"}</span>
          </button>
        </div>
      </div>

      {/* Error state matching Dashboard */}
      {error && (
        <div className="alert-error">
          <div className="alert-content">
            <strong>Error:</strong>
            <span>{error}</span>
          </div>
          <button type="button" className="btn-retry" onClick={fetchCustomers}>
            Try Again
          </button>
        </div>
      )}

      {/* Main Customers Table Card matching Dashboard styling */}
      <div className="table-card content-card-table">
        <div className="table-header-bar">
          <div>
            <h2>Customer Directory</h2>
            <span>
              Showing {filteredCustomers.length} of {customers.length} total customers
            </span>
          </div>

          <div className="table-search-box">
            <SearchIcon className="search-svg" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            {searchTerm && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => setSearchTerm("")}
                aria-label="Clear search query"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {loading && !customers.length ? (
          <div className="loading-card">
            <div className="spinner"></div>
            <h3>Loading customers...</h3>
            <p>Fetching data from MySQL database.</p>
          </div>
        ) : filteredCustomers.length === 0 ? (
          <div className="empty-state">
            <UsersIcon className="empty-icon" />
            <h3>No customers found</h3>
            <p>
              {searchTerm
                ? `No customers match your search query "${searchTerm}".`
                : "No customer records currently exist in the database."}
            </p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="modern-table">
              <thead>
                <tr>
                  <th style={{ width: "90px" }}>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer.customer_id}>
                    <td>
                      <span className="id-badge">#{customer.customer_id}</span>
                    </td>
                    <td>
                      <div className="customer-cell">
                        <div className="customer-avatar">
                          {getInitials(customer.first_name, customer.last_name)}
                        </div>
                        <span className="customer-name-text">
                          <strong>{customer.first_name} {customer.last_name}</strong>
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className="email-cell">{customer.email}</span>
                    </td>
                    <td>
                      <span className="phone-cell">{customer.phone}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="table-footer">
          <span>
            Total: <strong>{filteredCustomers.length}</strong> of{" "}
            <strong>{customers.length}</strong> customers
          </span>
        </div>
      </div>
    </div>
  );
}

export default Customers;