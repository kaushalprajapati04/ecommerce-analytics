function StatCard({ title, value, icon, description, iconColor = "blue", badge = null }) {
  // Format numeric values nicely
  const displayValue =
    typeof value === "number"
      ? value.toLocaleString("en-IN")
      : value !== undefined && value !== null
      ? value
      : "—";

  return (
    <div className={`stat-card stat-card-${iconColor}`}>
      <div className="stat-card-header">
        <div className="stat-card-meta">
          <span className="stat-card-title">{title}</span>
          <h3 className="stat-card-value">{displayValue}</h3>
        </div>

        <div className="stat-card-icon-container">
          <div className="stat-card-icon">{icon}</div>
        </div>
      </div>

      {(description || badge) && (
        <div className="stat-card-footer">
          {description && (
            <p className="stat-card-description">{description}</p>
          )}
          {badge && (
            <span className="stat-card-badge">{badge}</span>
          )}
        </div>
      )}
    </div>
  );
}

export default StatCard;