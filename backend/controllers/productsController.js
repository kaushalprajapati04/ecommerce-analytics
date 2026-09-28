const { pool } = require("../config/db");

const getProducts = async (req, res) => {
  try {
    const { search } = req.query;

    let query = `
      SELECT
        p.product_id,
        p.product_name,
        p.category_id,
        p.supplier_id,
        p.price,
        p.stock_quantity,
        p.created_at,
        c.category_name,
        s.supplier_name
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.category_id
      LEFT JOIN suppliers s ON p.supplier_id = s.supplier_id
    `;
    const params = [];

    if (search && search.trim()) {
      const searchTerm = `%${search.trim().toLowerCase()}%`;
      query += `
        WHERE LOWER(p.product_name) LIKE ?
           OR LOWER(c.category_name) LIKE ?
           OR LOWER(s.supplier_name) LIKE ?
      `;
      params.push(searchTerm, searchTerm, searchTerm);
    }

    query += " ORDER BY p.product_id ASC";

    const [rows] = await pool.query(query, params);

    res.json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error("Products Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error.message,
    });
  }
};

module.exports = {
  getProducts,
};
