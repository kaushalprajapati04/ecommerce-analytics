const { pool } = require("../config/db");

const getAnalyticsSummary = async (req, res) => {
  try {
    const [overallRows] = await pool.query(`
      SELECT
        COUNT(*) AS totalOrders,
        COALESCE(SUM(total_amount), 0) AS totalRevenue,
        COALESCE(AVG(total_amount), 0) AS averageOrderValue,
        COALESCE(SUM(CASE WHEN status = 'Delivered' THEN 1 ELSE 0 END), 0) AS deliveredOrders,
        COALESCE(SUM(CASE WHEN status = 'Delivered' THEN total_amount ELSE 0 END), 0) AS deliveredRevenue
      FROM orders
    `);

    const [statusRows] = await pool.query(`
      SELECT
        status,
        COUNT(*) AS count,
        COALESCE(SUM(total_amount), 0) AS revenue
      FROM orders
      GROUP BY status
    `);

    const overall = overallRows[0] || {};
    const totalOrders = Number(overall.totalOrders) || 0;
    const totalRevenue = Number(overall.totalRevenue) || 0;
    const averageOrderValue = totalOrders > 0 ? Number(overall.averageOrderValue) : 0;
    const deliveredOrders = Number(overall.deliveredOrders) || 0;
    const deliveredRevenue = Number(overall.deliveredRevenue) || 0;
    const fulfillmentRate =
      totalOrders > 0 ? Math.round((deliveredOrders / totalOrders) * 100) : 0;

    const statusDistribution = {
      Delivered: 0,
      Shipped: 0,
      Processing: 0,
      Pending: 0,
      Cancelled: 0,
    };

    statusRows.forEach((row) => {
      if (row.status && statusDistribution.hasOwnProperty(row.status)) {
        statusDistribution[row.status] = Number(row.count) || 0;
      }
    });

    const summaryData = {
      totalRevenue: Number(totalRevenue.toFixed(2)),
      totalOrders,
      averageOrderValue: Number(averageOrderValue.toFixed(2)),
      deliveredOrders,
      statusDistribution,
      deliveredRevenue: Number(deliveredRevenue.toFixed(2)),
      fulfillmentRate,
    };

    res.json({
      success: true,
      ...summaryData,
      data: summaryData,
    });
  } catch (error) {
    console.error("Analytics Summary Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch analytics summary",
      error: error.message,
    });
  }
};

module.exports = {
  getAnalyticsSummary,
};