const router = require('express').Router();
const pool = require('../db/pool');

// GET /api/reports/summary — top-line numbers for the overview page
router.get('/summary', async (req, res) => {
  try {
    const [[totals]] = await pool.query(
      `SELECT COUNT(*) AS order_count, COALESCE(SUM(total),0) AS revenue
       FROM orders WHERE status != 'Cancelled'`);
    const [byStatus] = await pool.query('SELECT status, COUNT(*) AS count FROM orders GROUP BY status');
    const [topDishes] = await pool.query(
      `SELECT mi.name, SUM(oi.quantity) AS qty
       FROM order_items oi JOIN menu_items mi ON mi.id = oi.menu_item_id
       GROUP BY mi.name ORDER BY qty DESC LIMIT 5`);
    res.json({ ...totals, byStatus, topDishes });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// GET /api/reports/daily-sales?days=7 — for the sales trend chart
router.get('/daily-sales', async (req, res) => {
  try {
    const days = parseInt(req.query.days) || 7;
    const [rows] = await pool.query(
      `SELECT DATE(created_at) AS day, SUM(total) AS revenue, COUNT(*) AS orders
       FROM orders WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL ? DAY) AND status != 'Cancelled'
       GROUP BY DATE(created_at) ORDER BY day`, [days]);
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
