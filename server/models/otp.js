const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: '15m' }, // expires after 15 minutes
});

const OTP = mongoose.model('OTP', otpSchema);

// Create a TTL index on the createdAt field
// 15 minutes in seconds

module.exports = OTP;