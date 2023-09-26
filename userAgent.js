const mongoose = require('mongoose');

const userAgentSchema = new mongoose.Schema({
  browserName: String,
  browserVersion: String,
  osName: String,
  deviceType: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('UserAgent', userAgentSchema);
