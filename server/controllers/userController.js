const User = require('../models/userModel');
const OTP = require('../models/otp');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const secret = 'my$uper$ecretK3y!'; // Replace with your own secret key
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'abhinavlotlikar48@gmail.com',
    pass: 'buhflomjrgmhqjwb',
  },
});
// Register a new user
exports.registerUser = async (req, res) => {
    try {
      const otp = crypto.randomBytes(3).toString('hex').toUpperCase();
      const { firstName,lastName, email, password ,accountType} = req.body;
 

      console.log(`OTP sent to ${email}: ${otp}`);
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists with this email' });
      }
  
      const otpRecord = await OTP.create({ email, otp });
      console.log('OTP record saved:', otpRecord);
  
      const mailOptions = {
        from: 'abhinavlotlikar48@gmail.com',
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}`,
      };
  
      await transporter.sendMail(mailOptions);
  
      res.status(200).json({ message: 'OTP sent successfully' });
      
      // const user = new User({ firstName,lastName, email, password });
      // await user.save();
      // res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error registering user' });
    }
  };
  exports.verifyOTP = async (req, res) => {
    const { firstName, lastName, email, password, accountType, otp } = req.body;
  
    console.log(`Verifying OTP for ${email}: ${otp}`);
  
    try {
      // Retrieve OTP from the database
      const otpRecord = await OTP.findOne({ email });
  
      if (!otpRecord) {
        return res.status(400).json({ error: 'Invalid OTP' });
      }
  
      // Check if the OTP matches the one entered by the user
      if (otpRecord.otp !== otp) {
        return res.status(400).json({ error: 'Invalid OTP' });
      }
  
      // Clear the OTP from the database
      await OTP.deleteOne({ email });
  
      // Create a new user
      const user = new User({ firstName, lastName, email, password ,accountType});
      await user.save();
  
      // Send success response
      res.status(200).json({ message: 'OTP verified and user registered successfully' });
    } catch (error) {
      console.error('Error in verifyOTP:', error);
      res.status(500).json({ error: 'Failed to verify OTP' });
    }
  };
  
  exports.resendOTP = async (req, res) => {
    const { email } = req.body;
    const otp = crypto.randomBytes(3).toString('hex').toUpperCase();
  
    console.log(`Resending OTP to ${email}: ${otp}`);
  
    try {
      // Update OTP in the database
      const otpRecord = await OTP.findOneAndUpdate({ email }, { otp }, { upsert: true });
      console.log('OTP record updated:', otpRecord);
  
      const mailOptions = {
        from: 'abhinavlotlikar48@gmail.com',
        to: email,
        subject: 'Your OTP Code (Resent)',
        text: `Your new OTP code is ${otp}`,
      };
  
      await transporter.sendMail(mailOptions);
  
      res.status(200).json({ message: 'OTP resent successfully' });
    } catch (error) {
      console.error('Error in resendOTP:', error);
      res.status(500).json({ error: 'Failed to resend OTP' });
    }
  };
// Login user and generate JWT
exports.loginUser = async (req, res) => {
  const { email, password, loginAs } = req.body;

  try {
    // Check if the user exists by email
    const user = await User.findOne({ email });
    
    // Email check
    if (!user) {
      return res.status(400).json({
        error: {
          email: 'Invalid email address',
          message: 'Login failed due to incorrect email or password.'
        }
      });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        error: {
          password: 'Incorrect password',
          message: 'Login failed due to incorrect email or password.'
        }
      });
    }

    // Check if the selected role matches the user's role
    if (user.accountType !== loginAs) {
      return res.status(400).json({
        error: {
          loginAs: 'Role selection does not match credentials',
          message: 'Role mismatch. Please select the correct role.'
        }
      });
    }

    // Generate JWT and return success response
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.accountType },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    console.log('Generated Token:', token); // Add this line for debugging
    
    return res.status(200).json({
      message: 'Login successful',
      token,  // Ensure token is sent in the response
    });
    
  } catch (error) {
    return res.status(500).json({
      error: {
        message: 'An error occurred during login. Please try again later.',
      },
    });
  }
};
exports.getUserData = (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: 'Token not provided' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Extract user data from the decoded token
    const { userId, email, role } = decoded;
    console.log(role);
    // Send a response with the user data
    res.json({
      message: 'User data retrieved successfully',
      userData: {role, email },
    });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Protected route example
exports.getProtectedData = (req, res) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, secret);
    res.status(200).json({ message: 'Protected data accessed', userId: decoded.userId });
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

