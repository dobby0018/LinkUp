const User = require('../models/userModel'); // Adjust the path as per your structure

// Directly exporting the getAllUsers function
module.exports = async (req, res) => {
  try {
    // Find all users and exclude the password field
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
