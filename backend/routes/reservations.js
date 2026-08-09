const router = require('express').Router();
const pool = require('../db/pool');

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM reservations ORDER BY reservation_date, reservation_time');
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', async (req, res) => {
  try {
    const { customer_name, phone, reservation_date, reservation_time, guests, area, notes } = req.body;
    if (!customer_name || !phone || !reservation_date || !reservation_time)
      return res.status(400).json({ error: 'customer_name, phone, reservation_date, reservation_time are required' });
    const [result] = await pool.query(
      `INSERT INTO reservations (customer_name, phone, reservation_date, reservation_time, guests, area, notes)
       VALUES (?,?,?,?,?,?,?)`,
      [customer_name, phone, reservation_date, reservation_time, guests || 2, area || 'Main Hall', notes || '']
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    if (!['confirmed','cancelled','completed'].includes(status)) return res.status(400).json({ error: 'invalid status' });
    await pool.query('UPDATE reservations SET status = ? WHERE id = ?', [status, req.params.id]);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
