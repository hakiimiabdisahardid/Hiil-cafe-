const router = require('express').Router();
const pool = require('../db/pool');

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM inventory ORDER BY name');
    res.json(rows.map(r => ({ ...r, low_stock: Number(r.quantity) <= Number(r.min_quantity) })));
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', async (req, res) => {
  try {
    const { name, unit, quantity, min_quantity, supplier } = req.body;
    if (!name || !unit) return res.status(400).json({ error: 'name and unit are required' });
    const [result] = await pool.query(
      'INSERT INTO inventory (name, unit, quantity, min_quantity, supplier) VALUES (?,?,?,?,?)',
      [name, unit, quantity || 0, min_quantity || 0, supplier || '']
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// PATCH /api/inventory/:id — e.g. adjust stock after a delivery or a sale
router.patch('/:id', async (req, res) => {
  try {
    const fields = ['name','unit','quantity','min_quantity','supplier'];
    const updates = [], values = [];
    fields.forEach(f => { if (req.body[f] !== undefined) { updates.push(`${f} = ?`); values.push(req.body[f]); } });
    if (!updates.length) return res.status(400).json({ error: 'no fields to update' });
    values.push(req.params.id);
    await pool.query(`UPDATE inventory SET ${updates.join(', ')} WHERE id = ?`, values);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete('/:id', async (req, res) => {
  try { await pool.query('DELETE FROM inventory WHERE id = ?', [req.params.id]); res.json({ success: true }); }
  catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
