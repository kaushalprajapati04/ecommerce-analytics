import { useLocation } from "react-router-dom";
import { MenuIcon } from "./Icons";

function Navbar({ onToggleSidebar = () => {} }) {
  const location = useLocation();

  const getPageInfo = () => {
    switch (location.pathname) {
      case "/customers":
        return {
          title: "Customers",
          subtitle: "Manage and monitor your customers",
        };
      case "/products":
        return {
          title: "Products",
          subtitle: "Manage and monitor your product catalog",
        };
      case "/orders":
        return {
          title: "Orders",
          subtitle: "Manage and monitor customer orders",
        };
      case "/analytics":
        return {
          title: "Analytics",
          subtitle: "Monitor your e-commerce business performance",
        };
      default:
        return {
          title: "Dashboard",
          subtitle: "Monitor your e-commerce performance",
        };
    }
  };

  const { title, subtitle } = getPageInfo();

  return (
    <header className="navbar">
      <div className="navbar-left">
        <button
          type="button"
          className="mobile-menu-btn"
          onClick={onToggleSidebar}
          aria-label="Toggle navigation menu"
        >
          <MenuIcon className="icon-menu" />
        </button>

        <div className="navbar-heading">
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
      </div>

      <div className="navbar-right">
        <div className="database-status" title="Database connection is active">
          <span className="status-dot"></span>
          <span className="status-text">MySQL Connected</span>
        </div>

        <div className="profile">
          <div className="profile-avatar">A</div>
          <div className="profile-details">
            <strong>Admin</strong>
            <span>Administrator</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;