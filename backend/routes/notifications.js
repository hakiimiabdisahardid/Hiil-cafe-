const router = require('express').Router();
const nodemailer = require('nodemailer');

router.post('/manager', async (req, res) => {
  try {
    const { subject, message, recipient = process.env.MANAGER_EMAIL || 'manager@hiilcafe.com' } = req.body;
    if (!subject || !message) return res.status(400).json({ error: 'subject and message are required' });

    if (process.env.SMTP_HOST) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: process.env.SMTP_SECURE === 'true',
        auth: process.env.SMTP_USER ? {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        } : undefined
      });

      await transporter.sendMail({
        from: process.env.SMTP_FROM || 'hiilcafe@localhost',
        to: recipient,
        subject,
        text: message
      });

      return res.json({ ok: true, sent: true, recipient });
    }

    console.log(`[manager-notification] ${subject}\n${message}`);
    return res.json({ ok: true, sent: false, recipient, fallback: 'logged' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
