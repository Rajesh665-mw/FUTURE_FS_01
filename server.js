// backend/server.js
// Contact form backend — Node.js + Express + Nodemailer
// Run: npm run dev

require('dotenv').config();
const express    = require('express');
const cors       = require('cors');
const nodemailer = require('nodemailer');
const { body, validationResult } = require('express-validator');

const app  = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ──────────────────────────────────────────
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || '*',
  methods: ['GET', 'POST'],
}));

// ── Nodemailer transporter ─────────────────────────────
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,   // Gmail App Password (not your login password)
  },
});

// Verify connection on startup
transporter.verify((err) => {
  if (err) console.error('❌ Mailer config error:', err.message);
  else     console.log('✅ Mailer ready');
});

// ── Rate limiter (simple in-memory) ───────────────────
const rateLimitMap = new Map();
function rateLimit(ip) {
  const now    = Date.now();
  const record = rateLimitMap.get(ip) || { count: 0, start: now };
  if (now - record.start > 60_000) { record.count = 0; record.start = now; }
  record.count++;
  rateLimitMap.set(ip, record);
  return record.count > 5; // max 5 requests/min per IP
}

// ── POST /api/contact ─────────────────────────────────
app.post(
  '/api/contact',
  [
    body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }),
    body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
    body('subject').optional().trim().isLength({ max: 200 }),
    body('message').trim().notEmpty().withMessage('Message is required').isLength({ max: 2000 }),
  ],
  async (req, res) => {
    // Rate limit
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    if (rateLimit(ip)) {
      return res.status(429).json({ success: false, error: 'Too many requests. Please wait a minute.' });
    }

    // Validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, email, subject, message } = req.body;

    // Email to you (the portfolio owner)
    const ownerMail = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.RECIPIENT_EMAIL || process.env.EMAIL_USER,
      replyTo: email,
      subject: `[Portfolio] ${subject || 'New Message'} — from ${name}`,
      html: `
        <div style="font-family:monospace;background:#020509;color:#c0dff0;padding:32px;border-radius:8px;max-width:600px;">
          <div style="color:#00d4ff;font-size:18px;font-weight:bold;margin-bottom:24px;letter-spacing:4px;">
            PORTFOLIO — NEW MESSAGE
          </div>
          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="color:#3d6a88;padding:8px 0;width:80px;">FROM</td>
              <td style="color:#c0dff0;padding:8px 0;">${name}</td>
            </tr>
            <tr>
              <td style="color:#3d6a88;padding:8px 0;">EMAIL</td>
              <td style="padding:8px 0;"><a href="mailto:${email}" style="color:#00d4ff;">${email}</a></td>
            </tr>
            <tr>
              <td style="color:#3d6a88;padding:8px 0;vertical-align:top;">SUBJECT</td>
              <td style="color:#c0dff0;padding:8px 0;">${subject || '(no subject)'}</td>
            </tr>
          </table>
          <hr style="border:none;border-top:1px solid #0d2035;margin:20px 0;">
          <div style="color:#3d6a88;font-size:12px;margin-bottom:8px;letter-spacing:2px;">MESSAGE</div>
          <div style="color:#c0dff0;line-height:1.8;white-space:pre-wrap;">${message}</div>
          <hr style="border:none;border-top:1px solid #0d2035;margin:20px 0;">
          <div style="color:#3d6a88;font-size:11px;">
            Received: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
          </div>
        </div>
      `,
    };

    // Auto-reply to sender
    const senderMail = {
      from: `"Rajesh" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Got your message, ${name}!`,
      html: `
        <div style="font-family:monospace;background:#020509;color:#c0dff0;padding:32px;border-radius:8px;max-width:600px;">
          <div style="color:#00d4ff;font-size:18px;font-weight:bold;margin-bottom:16px;letter-spacing:4px;">
            RAJESH.DEV
          </div>
          <p style="color:#c0dff0;line-height:1.8;">Hey ${name},</p>
          <p style="color:#c0dff0;line-height:1.8;margin-top:12px;">
            Thanks for reaching out! I've received your message and will get back to you
            within <span style="color:#00ff88;">24 hours</span>.
          </p>
          <p style="color:#3d6a88;line-height:1.8;margin-top:12px;font-size:13px;">
            — Rajesh · CS Engineer &amp; Developer · Vijayawada, AP
          </p>
          <hr style="border:none;border-top:1px solid #0d2035;margin:20px 0;">
          <p style="color:#3d6a88;font-size:11px;">
            This is an automated reply. Please do not reply directly to this email.
          </p>
        </div>
      `,
    };

    try {
      await transporter.sendMail(ownerMail);
      await transporter.sendMail(senderMail);
      console.log(`📬 Message from ${name} <${email}>`);
      res.json({ success: true, message: 'Message sent successfully!' });
    } catch (err) {
      console.error('Mail send error:', err);
      res.status(500).json({ success: false, error: 'Failed to send email. Please try again.' });
    }
  }
);

// ── Health check ───────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'online', timestamp: new Date().toISOString() });
});

// ── Start ──────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
