const mysql = require('mysql2/promise');
require('dotenv').config();

// Prefer the full connection string Railway provides (most reliable
// inside Railway's private network). Fall back to individual fields
// if MYSQL_URL isn't set (e.g. local development).
const pool = process.env.MYSQL_URL
  ? mysql.createPool(process.env.MYSQL_URL)
  : mysql.createPool({
      host: process.env.MYSQLHOST || process.env.DB_HOST || 'localhost',
      port: process.env.MYSQLPORT || process.env.DB_PORT || 3306,
      user: process.env.MYSQLUSER || process.env.DB_USER || 'root',
      password: process.env.MYSQLPASSWORD || process.env.DB_PASSWORD || '',
      database: process.env.MYSQLDATABASE || process.env.DB_NAME || 'hiil_cafe',
      waitForConnections: true,
      connectionLimit: 10,
    });

module.exports = pool;