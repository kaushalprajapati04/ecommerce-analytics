const mysql = require("mysql2/promise");

require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "ecommerce_analytics",
  port: Number(process.env.DB_PORT) || 3306,

  ssl: process.env.DB_SSL === "true"
    ? { rejectUnauthorized: false }
    : undefined,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const connectDB = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("MySQL Database Connected Successfully");
    connection.release();
  } catch (error) {
    console.error("Database Connection Failed:", error.message);
  }
};

module.exports = {
  pool,
  connectDB,
};