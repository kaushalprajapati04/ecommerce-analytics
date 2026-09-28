const { pool } = require("../config/db");

const getDashboardSummary = async (req, res) => {
  try {
    const queries = await Promise.all([
      pool.query("SELECT COUNT(*) AS total_categories FROM categories"),
      pool.query("SELECT COUNT(*) AS total_suppliers FROM suppliers"),
      pool.query("SELECT COUNT(*) AS total_products FROM products"),
      pool.query("SELECT COUNT(*) AS total_customers FROM customers"),
      pool.query("SELECT COUNT(*) AS total_orders FROM orders"),
      pool.query("SELECT COUNT(*) AS total_order_items FROM order_items"),
      pool.query("SELECT COUNT(*) AS total_payments FROM payments"),
      pool.query("SELECT COUNT(*) AS total_reviews FROM reviews"),
    ]);

    const data = {
      total_categories: queries[0][0][0].total_categories,
      total_suppliers: queries[1][0][0].total_suppliers,
      total_products: queries[2][0][0].total_products,
      total_customers: queries[3][0][0].total_customers,
      total_orders: queries[4][0][0].total_orders,
      total_order_items: queries[5][0][0].total_order_items,
      total_payments: queries[6][0][0].total_payments,
      total_reviews: queries[7][0][0].total_reviews,
    };

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Dashboard Summary Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard data",
      error: error.message,
    });
  }
};

module.exports = {
  getDashboardSummary,
};
