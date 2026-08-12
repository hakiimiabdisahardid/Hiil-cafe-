const express = require('express');
const crypto = require('crypto');
const pool = require('../db/pool');
const router = express.Router();

/* ============================================================
   WaafiPay — taageera ZAAD iyo EVC Plus labadaba isku endpoint ah
   (iyo SAHAL). paymentMethod: MWALLET_ACCOUNT wuxuu automatic u
   kala saaraa taleefanka wallet-kiisa (Zaad ama EVC).
   Docs: https://docs.waafipay.com/purchase-api
   ============================================================ */

const WAAFI_BASE = process.env.WAAFI_ENV === 'production'
  ? 'https://api.waafipay.net/asm'
  : 'https://sandbox.waafipay.com/asm';

router.post('/waafipay', async (req, res) => {
  const { phone, orderId } = req.body;

  if (!phone || !orderId) {
    return res.status(400).json({ error: 'phone iyo orderId waa loo baahan yihiin' });
  }

  const conn = await pool.getConnection();
  try {
    const [[order]] = await conn.query('SELECT id, total, payment_status FROM orders WHERE id = ?', [orderId]);
    if (!order) return res.status(404).json({ error: 'Order lama helin' });
    if (order.payment_status === 'paid') return res.status(400).json({ error: 'Order-kan horeba waa la bixiyay' });

    const amount = Number(order.total);

    const [paymentResult] = await conn.query(
      'INSERT INTO payments (order_id, provider, phone, amount, status) VALUES (?,?,?,?,?)',
      [orderId, 'waafipay', phone, amount, 'pending']
    );
    const paymentId = paymentResult.insertId;

    const payload = {
      schemaVersion: '1.0',
      requestId: crypto.randomUUID(),
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 23),
      channelName: 'WEB',
      serviceName: 'API_PURCHASE',
      serviceParams: {
        merchantUid: process.env.WAAFI_MERCHANT_UID,
        apiUserId: process.env.WAAFI_API_USER_ID,
        apiKey: process.env.WAAFI_API_KEY,
        paymentMethod: 'MWALLET_ACCOUNT',
        payerInfo: { accountNo: phone },
        transactionInfo: {
          referenceId: String(orderId),
          invoiceId: String(orderId),
          amount: amount.toFixed(2),
          currency: 'USD',
          description: 'HIIL CAFE order #' + orderId
        }
      }
    };

    const response = await fetch(WAAFI_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await response.json();

    const success = data.responseCode === '2001' && data.params?.state === 'APPROVED';
    const newStatus = success ? 'success' : 'failed';

    await conn.query(
      'UPDATE payments SET status = ?, transaction_id = ?, raw_response = ? WHERE id = ?',
      [newStatus, data.params?.transactionId || null, JSON.stringify(data), paymentId]
    );

    if (success) {
      await conn.query('UPDATE orders SET payment_status = ? WHERE id = ?', ['paid', orderId]);
    }

    res.json({
      success,
      paymentId,
      transactionId: data.params?.transactionId || null,
      message: data.responseMsg || 'Unknown response'
    });
  } catch (err) {
    console.error('WaafiPay payment error:', err);
    res.status(500).json({ error: 'Lacag bixinta (Zaad/EVC) way fashilantay, isku day mar kale' });
  } finally {
    conn.release();
  }
});

/* ============================================================
   eDahab
   Docs: https://docs.edahab.net/purchase
   Hash = SHA256(JSON body + API Secret) hex
   ============================================================ */

const EDAHAB_BASE = 'https://edahab.net/api/api/';

function edahabHash(body) {
  const text = JSON.stringify(body) + process.env.EDAHAB_API_SECRET;
  return crypto.createHash('sha256').update(text).digest('hex');
}

router.post('/edahab', async (req, res) => {
  const { phone, orderId } = req.body;

  if (!phone || !orderId) {
    return res.status(400).json({ error: 'phone iyo orderId waa loo baahan yihiin' });
  }

  const conn = await pool.getConnection();
  try {
    const [[order]] = await conn.query('SELECT id, total, payment_status FROM orders WHERE id = ?', [orderId]);
    if (!order) return res.status(404).json({ error: 'Order lama helin' });
    if (order.payment_status === 'paid') return res.status(400).json({ error: 'Order-kan horeba waa la bixiyay' });

    const amount = Number(order.total);

    const [paymentResult] = await conn.query(
      'INSERT INTO payments (order_id, provider, phone, amount, status) VALUES (?,?,?,?,?)',
      [orderId, 'edahab', phone, amount, 'pending']
    );
    const paymentId = paymentResult.insertId;

    const body = {
      apiKey: process.env.EDAHAB_API_KEY,
      edahabNumber: phone,
      amount,
      agentCode: process.env.EDAHAB_AGENT_CODE,
      currency: 'USD'
    };
    const hash = edahabHash(body);

    const response = await fetch(`${EDAHAB_BASE}Issueinvoice?hash=${hash}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const data = await response.json();

    const success = data.StatusCode === 0 && data.InvoiceStatus === 'Paid';
    const newStatus = success ? 'success' : 'failed';

    await conn.query(
      'UPDATE payments SET status = ?, transaction_id = ?, raw_response = ? WHERE id = ?',
      [newStatus, data.TransactionId || null, JSON.stringify(data), paymentId]
    );

    if (success) {
      await conn.query('UPDATE orders SET payment_status = ? WHERE id = ?', ['paid', orderId]);
    }

    res.json({
      success,
      paymentId,
      invoiceId: data.invoiceId || null,
      transactionId: data.TransactionId || null,
      status: data.InvoiceStatus
    });
  } catch (err) {
    console.error('eDahab payment error:', err);
    res.status(500).json({ error: 'Lacag bixinta (eDahab) way fashilantay, isku day mar kale' });
  } finally {
    conn.release();
  }
});

module.exports = router;