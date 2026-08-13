const router = require('express').Router();
const pool = require('../db/pool');

// GET /api/menu — list all dishes (optionally ?category=Pizza)
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const [rows] = category
      ? await pool.query('SELECT * FROM menu_items WHERE category = ? ORDER BY created_at DESC', [category])
      : await pool.query('SELECT * FROM menu_items ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error('GET /api/menu error:', err);
    res.status(500).json({ error: err.message || String(err) });
  }
});

// POST /api/menu — add a dish
router.post('/', async (req, res) => {
  try {
    const { name, category, description, price, image_url } = req.body;
    if (!name || !category || !price) return res.status(400).json({ error: 'name, category, price are required' });
    const [result] = await pool.query(
      'INSERT INTO menu_items (name, category, description, price, image_url) VALUES (?,?,?,?,?)',
      [name, category, description || '', price, image_url || '']
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error('POST /api/menu error:', err);
    res.status(500).json({ error: err.message || String(err) });
  }
});

// PATCH /api/menu/:id — update availability, price, etc.
router.patch('/:id', async (req, res) => {
  try {
    const fields = ['name','category','description','price','image_url','is_popular','is_new','discount_percent','is_available'];
    const updates = [], values = [];
    fields.forEach(f => { if (req.body[f] !== undefined) { updates.push(`${f} = ?`); values.push(req.body[f]); } });
    if (!updates.length) return res.status(400).json({ error: 'no fields to update' });
    values.push(req.params.id);
    await pool.query(`UPDATE menu_items SET ${updates.join(', ')} WHERE id = ?`, values);
    res.json({ success: true });
  } catch (err) {
    console.error('PATCH /api/menu error:', err);
    res.status(500).json({ error: err.message || String(err) });
  }
});

// DELETE /api/menu/:id
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM menu_items WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    console.error('DELETE /api/menu error:', err);
    res.status(500).json({ error: err.message || String(err) });
  }
});

module.exports = router;