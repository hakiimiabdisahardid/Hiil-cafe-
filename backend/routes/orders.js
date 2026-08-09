const router = require('express').Router();
const pool = require('../db/pool');

// GET /api/orders — list all (optionally ?status=New)
router.get('/', async (req, res) => {
  try {
    const { status } = req.query;
    const [orders] = status
      ? await pool.query('SELECT * FROM orders WHERE status = ? ORDER BY created_at DESC', [status])
      : await pool.query('SELECT * FROM orders ORDER BY created_at DESC');
    for (const o of orders) {
      const [items] = await pool.query(
        `SELECT oi.quantity, oi.unit_price, mi.name FROM order_items oi
         JOIN menu_items mi ON mi.id = oi.menu_item_id WHERE oi.order_id = ?`, [o.id]);
      o.items = items;
    }
    res.json(orders);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// POST /api/orders — place a new order (this is what the QR order page calls)
// body: { table_number, items: [{ menu_item_id, quantity }], tax_percent }
router.post('/', async (req, res) => {
  const conn = await pool.getConnection();
  try {
    const { table_number, items, tax_percent = 5 } = req.body;
    if (!items || !items.length) return res.status(400).json({ error: 'items required' });

    await conn.beginTransaction();

    const [[table]] = await conn.query('SELECT id FROM restaurant_tables WHERE number = ?', [table_number]);
    const tableId = table ? table.id : null;

    let subtotal = 0;
    const priced = [];
    for (const it of items) {
      const [[menuItem]] = await conn.query('SELECT price FROM menu_items WHERE id = ?', [it.menu_item_id]);
      if (!menuItem) throw new Error('Invalid menu item ' + it.menu_item_id);
      subtotal += menuItem.price * it.quantity;
      priced.push({ ...it, unit_price: menuItem.price });
    }
    const tax = subtotal * (tax_percent / 100);
    const total = subtotal + tax;
    const orderNo = 'HC-' + Date.now().toString().slice(-6);

    const [orderResult] = await conn.query(
      'INSERT INTO orders (order_no, table_id, status, subtotal, tax, total) VALUES (?,?,?,?,?,?)',
      [orderNo, tableId, 'New', subtotal, tax, total]
    );
    const orderId = orderResult.insertId;

    for (const it of priced) {
      await conn.query(
        'INSERT INTO order_items (order_id, menu_item_id, quantity, unit_price) VALUES (?,?,?,?)',
        [orderId, it.menu_item_id, it.quantity, it.unit_price]
      );
    }

    await conn.commit();
    res.status(201).json({ id: orderId, order_no: orderNo, total });
  } catch (err) {
    await conn.rollback();
    res.status(500).json({ error: err.message });
  } finally {
    conn.release();
  }
});

// PATCH /api/orders/:id/status — kitchen updates order status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const valid = ['New', 'Preparing', 'Ready', 'Served', 'Cancelled'];
    if (!valid.includes(status)) return res.status(400).json({ error: 'invalid status' });
    await pool.query('UPDATE orders SET status = ? WHERE id = ?', [status, req.params.id]);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
