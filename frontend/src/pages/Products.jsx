import { useEffect, useState, useMemo } from "react";
import { getProducts } from "../services/api";
import {
  PackageIcon,
  SearchIcon,
  RefreshIcon,
  FolderIcon,
  FactoryIcon,
} from "../components/Icons";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await getProducts();
      setProducts(response.data || []);
    } catch (err) {
      console.error("Error loading products:", err);
      setError("Failed to load products from database.");
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) return products;
    const term = searchTerm.toLowerCase().trim();
    return products.filter((product) => {
      const nameMatch = (product.product_name || "").toLowerCase().includes(term);
      const categoryMatch =
        (product.category_name || "").toLowerCase().includes(term) ||
        String(product.category_id).includes(term) ||
        `category ${product.category_id}`.toLowerCase().includes(term);
      const supplierMatch =
        (product.supplier_name || "").toLowerCase().includes(term) ||
        String(product.supplier_id).includes(term) ||
        `supplier ${product.supplier_id}`.toLowerCase().includes(term);
      const idMatch =
        String(product.product_id) === term ||
        `#${product.product_id}` === term;

      return nameMatch || categoryMatch || supplierMatch || idMatch;
    });
  }, [products, searchTerm]);

  const formatPrice = (price) => {
    return `₹${Number(price).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "—";
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="products-page page-container">
      {/* Products Header Section */}
      <div className="page-header">
        <div>
          <h1>Products</h1>
          <p>Manage and monitor your product catalog</p>
        </div>

        <div className="header-actions">
          <div className="count-badge">
            <PackageIcon />
            <span>{products.length} Products</span>
          </div>

          <button
            type="button"
            className="refresh-button"
            onClick={loadProducts}
            disabled={loading}
            aria-label="Refresh product catalog"
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
          <button type="button" className="btn-retry" onClick={loadProducts}>
            Try Again
          </button>
        </div>
      )}

      {/* Main Product Catalog Card/Table matching Dashboard styling */}
      <div className="table-card content-card-table">
        <div className="table-header-bar">
          <div>
            <h2>Product Catalog</h2>
            <span>
              Showing {filteredProducts.length} of {products.length} total products
            </span>
          </div>

          <div className="table-search-box">
            <SearchIcon className="search-svg" />
            <input
              type="text"
              placeholder="Search by product, category, or supplier..."
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

        {loading && !products.length ? (
          <div className="loading-card">
            <div className="spinner"></div>
            <h3>Loading products...</h3>
            <p>Fetching inventory records from catalog.</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="empty-state">
            <PackageIcon className="empty-icon" />
            <h3>No products found</h3>
            <p>
              {searchTerm
                ? `No products match your search query "${searchTerm}".`
                : "No products currently available in catalog."}
            </p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="modern-table">
              <thead>
                <tr>
                  <th style={{ width: "80px" }}>ID</th>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Supplier</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => {
                  const isLowStock = product.stock_quantity <= 30;
                  return (
                    <tr key={product.product_id}>
                      <td>
                        <span className="id-badge">#{product.product_id}</span>
                      </td>
                      <td>
                        <div className="product-title-cell">
                          <div className="product-icon-wrap">
                            <PackageIcon className="tiny-icon" />
                          </div>
                          <strong>{product.product_name}</strong>
                        </div>
                      </td>
                      <td>
                        <span className="category-badge">
                          <FolderIcon className="tiny-icon" />
                          {product.category_name || `Category ${product.category_id}`}
                        </span>
                      </td>
                      <td>
                        <span className="supplier-cell">
                          <FactoryIcon className="tiny-icon" />
                          {product.supplier_name || `Supplier ${product.supplier_id}`}
                        </span>
                      </td>
                      <td>
                        <strong className="price-tag">
                          {formatPrice(product.price)}
                        </strong>
                      </td>
                      <td>
                        <span
                          className={`stock-badge ${
                            isLowStock ? "stock-low" : "stock-good"
                          }`}
                        >
                          <span className="stock-dot"></span>
                          {product.stock_quantity} units
                          {isLowStock && " (Low)"}
                        </span>
                      </td>
                      <td>
                        <span className="date-cell">
                          {formatDate(product.created_at)}
                        </span>
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
            Total: <strong>{filteredProducts.length}</strong> of{" "}
            <strong>{products.length}</strong> products
          </span>
        </div>
      </div>
    </div>
  );
}

export default Products;