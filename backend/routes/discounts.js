const router = require('express').Router();
const pool = require('../db/pool');

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM discounts ORDER BY active DESC, name');
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', async (req, res) => {
  try {
    const { name, type, value, starts_at, ends_at } = req.body;
    if (!name || !value) return res.status(400).json({ error: 'name and value are required' });
    const [result] = await pool.query(
      'INSERT INTO discounts (name, type, value, starts_at, ends_at) VALUES (?,?,?,?,?)',
      [name, type || 'percentage', value, starts_at || null, ends_at || null]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.patch('/:id/toggle', async (req, res) => {
  try {
    await pool.query('UPDATE discounts SET active = NOT active WHERE id = ?', [req.params.id]);
    const [[d]] = await pool.query('SELECT * FROM discounts WHERE id = ?', [req.params.id]);
    res.json(d);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete('/:id', async (req, res) => {
  try { await pool.query('DELETE FROM discounts WHERE id = ?', [req.params.id]); res.json({ success: true }); }
  catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
