const User = require('../models/user');

const validateOtp = async (req, res, next) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && user.otp === otp) {
      next();
    } else {
      return res.status(400).json({ error: 'Invalid OTP' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Error validating OTP' });
  }
};

module.exports = validateOtp;
