const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const AdminConfig = require('../models/adminConfig'); // create this model

// POST /api/admin/verify-key
router.post('/verify-key', async (req, res) => {
  const { key } = req.body;
  if (!key) return res.status(400).json({ error: 'Key required' });

  const config = await AdminConfig.findOne();
  if (!config || config.adminKey !== key) {
    return res.status(401).json({ error: 'Invalid admin key' });
  }

  // Generate a random token (could use JWT if you want)
  const token = crypto.randomBytes(32).toString('hex');
  // Optionally, store the token in DB for session tracking

  res.json({ token });
});

// (Optional) POST /api/admin/set-key
router.post('/set-key', async (req, res) => {
  const { key } = req.body;
  if (!key) return res.status(400).json({ error: 'Key required' });
  let config = await AdminConfig.findOne();
  if (!config) config = new AdminConfig();
  config.adminKey = key;
  await config.save();
  res.json({ success: true });
});

// GET /api/admin/key-exists
router.get('/key-exists', async (req, res) => {
  const config = await AdminConfig.findOne();
  res.json({ exists: !!(config && config.adminKey) });
});

module.exports = router;
