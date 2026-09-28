import { NavLink, useLocation } from "react-router-dom";
import {
  DashboardIcon,
  UsersIcon,
  PackageIcon,
  CartIcon,
  AnalyticsIcon,
  CloseIcon,
} from "./Icons";

const menuItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <DashboardIcon className="nav-svg-icon" />,
  },
  {
    name: "Customers",
    path: "/customers",
    icon: <UsersIcon className="nav-svg-icon" />,
  },
  {
    name: "Products",
    path: "/products",
    icon: <PackageIcon className="nav-svg-icon" />,
  },
  {
    name: "Orders",
    path: "/orders",
    icon: <CartIcon className="nav-svg-icon" />,
  },
  {
    name: "Analytics",
    path: "/analytics",
    icon: <AnalyticsIcon className="nav-svg-icon" />,
  },
];

function Sidebar({ isOpen = false, onClose = () => {} }) {
  const location = useLocation();

  return (
    <>
      {/* Mobile backdrop overlay */}
      {isOpen && (
        <div
          className="sidebar-backdrop"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
        {/* Sidebar Header */}
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <img
              src="/ecommerce-analytics-icon.svg"
              alt="E-Commerce Analytics"
              className="sidebar-brand-icon"
            />

            <div className="logo-text">
              <h2>E-Commerce</h2>
              <span>ANALYTICS</span>
            </div>
          </div>

          {/* Mobile close button */}
          <button
            type="button"
            className="sidebar-close-btn"
            onClick={onClose}
            aria-label="Close Sidebar"
          >
            <CloseIcon className="icon-close" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          <div className="nav-section-label">MAIN NAVIGATION</div>

          {menuItems.map((item) => {
            const isItemActive =
              location.pathname === item.path ||
              (item.path === "/dashboard" && location.pathname === "/");

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`sidebar-link ${
                  isItemActive ? "active" : ""
                }`}
              >
                <span className="sidebar-icon">{item.icon}</span>

                <span className="sidebar-label">{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="sidebar-footer">
          <div className="footer-card">
            <div className="footer-indicator"></div>

            <div className="footer-info">
              <p>Analytics Dashboard</p>
              <span>v1.0.0</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;