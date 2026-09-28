const { pool } = require("../config/db");

const getCustomers = async (req, res) => {
  try {
    const { search } = req.query;

    let query = `
      SELECT
        customer_id,
        first_name,
        last_name,
        email,
        phone,
        city,
        state,
        registration_date
      FROM customers
    `;
    const params = [];

    if (search && search.trim()) {
      const searchTerm = `%${search.trim().toLowerCase()}%`;
      query += `
        WHERE LOWER(first_name) LIKE ?
           OR LOWER(last_name) LIKE ?
           OR LOWER(email) LIKE ?
           OR LOWER(CONCAT(first_name, ' ', last_name)) LIKE ?
      `;
      params.push(searchTerm, searchTerm, searchTerm, searchTerm);
    }

    query += " ORDER BY customer_id ASC";

    const [rows] = await pool.query(query, params);

    res.json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error("Customers Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch customers",
      error: error.message,
    });
  }
};

module.exports = {
  getCustomers,
};
