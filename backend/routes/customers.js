const router = require('express').Router();
const pool = require('../db/pool');

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM customers ORDER BY loyalty_points DESC');
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', async (req, res) => {
  try {
    const { name, phone, email } = req.body;
    if (!name || !phone) return res.status(400).json({ error: 'name and phone are required' });
    const [result] = await pool.query(
      'INSERT INTO customers (name, phone, email) VALUES (?,?,?)', [name, phone, email || '']
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// POST /api/customers/:id/points — add or redeem loyalty points
// body: { delta: 25 } (positive to earn, negative to redeem)
router.post('/:id/points', async (req, res) => {
  try {
    const { delta } = req.body;
    if (typeof delta !== 'number') return res.status(400).json({ error: 'delta must be a number' });
    await pool.query('UPDATE customers SET loyalty_points = GREATEST(0, loyalty_points + ?) WHERE id = ?', [delta, req.params.id]);
    const [[customer]] = await pool.query('SELECT * FROM customers WHERE id = ?', [req.params.id]);
    res.json(customer);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.patch('/:id', async (req, res) => {
  try {
    const fields = ['name','phone','email','status'];
    const updates = [], values = [];
    fields.forEach(f => { if (req.body[f] !== undefined) { updates.push(`${f} = ?`); values.push(req.body[f]); } });
    if (!updates.length) return res.status(400).json({ error: 'no fields to update' });
    values.push(req.params.id);
    await pool.query(`UPDATE customers SET ${updates.join(', ')} WHERE id = ?`, values);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
