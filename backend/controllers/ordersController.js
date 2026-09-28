const { pool } = require("../config/db");

const getOrders = async (req, res) => {
  try {
    const { search } = req.query;

    let query = `
      SELECT
        o.order_id,
        o.customer_id,
        o.order_date,
        o.status,
        o.total_amount,
        c.first_name,
        c.last_name,
        c.email
      FROM orders o
      LEFT JOIN customers c ON o.customer_id = c.customer_id
    `;
    const params = [];

    if (search && search.trim()) {
      const searchTerm = `%${search.trim().toLowerCase()}%`;
      query += `
        WHERE CAST(o.order_id AS CHAR) LIKE ?
           OR LOWER(c.first_name) LIKE ?
           OR LOWER(c.last_name) LIKE ?
           OR LOWER(CONCAT(c.first_name, ' ', c.last_name)) LIKE ?
           OR LOWER(o.status) LIKE ?
      `;
      params.push(searchTerm, searchTerm, searchTerm, searchTerm, searchTerm);
    }

    query += " ORDER BY o.order_id ASC";

    const [rows] = await pool.query(query, params);

    res.json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error("Orders Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

module.exports = {
  getOrders,
};
