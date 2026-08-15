const router = require('express').Router();
const pool = require('../db/pool');

// GET /api/tables — list all restaurant tables
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM restaurant_tables ORDER BY number ASC');
    res.json(rows);
  } catch (err) {
    console.error('GET /api/tables error:', err);
    res.status(500).json({ error: err.message || String(err) });
  }
});

// PATCH /api/tables/:id — update status (available/occupied/reserved/cleaning)
router.patch('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const valid = ['available', 'occupied', 'reserved', 'cleaning'];
    if (!valid.includes(status)) return res.status(400).json({ error: 'invalid status' });
    await pool.query('UPDATE restaurant_tables SET status = ? WHERE id = ?', [status, req.params.id]);
    res.json({ success: true });
  } catch (err) {
    console.error('PATCH /api/tables error:', err);
    res.status(500).json({ error: err.message || String(err) });
  }
});

module.exports = router;