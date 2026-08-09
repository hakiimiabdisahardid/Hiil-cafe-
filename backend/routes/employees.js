const router = require('express').Router();
const pool = require('../db/pool');

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, name, role, phone, status, salary, created_at FROM employees ORDER BY name');
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', async (req, res) => {
  try {
    const { name, role, phone, salary } = req.body;
    if (!name || !role) return res.status(400).json({ error: 'name and role are required' });
    const [result] = await pool.query(
      'INSERT INTO employees (name, role, phone, salary) VALUES (?,?,?,?)', [name, role, phone || '', salary || null]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// PATCH /api/employees/:id/shift — toggle on_shift / off
router.patch('/:id/shift', async (req, res) => {
  try {
    const { status } = req.body;
    if (!['on_shift','off'].includes(status)) return res.status(400).json({ error: 'invalid status' });
    await pool.query('UPDATE employees SET status = ? WHERE id = ?', [status, req.params.id]);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.patch('/:id', async (req, res) => {
  try {
    const fields = ['name','role','phone','salary'];
    const updates = [], values = [];
    fields.forEach(f => { if (req.body[f] !== undefined) { updates.push(`${f} = ?`); values.push(req.body[f]); } });
    if (!updates.length) return res.status(400).json({ error: 'no fields to update' });
    values.push(req.params.id);
    await pool.query(`UPDATE employees SET ${updates.join(', ')} WHERE id = ?`, values);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete('/:id', async (req, res) => {
  try { await pool.query('DELETE FROM employees WHERE id = ?', [req.params.id]); res.json({ success: true }); }
  catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
