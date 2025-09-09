const mongoose = require('mongoose');

const adminConfigSchema = new mongoose.Schema({
  adminKey: { type: String, required: true }
});

module.exports = mongoose.model('AdminConfig', adminConfigSchema);
