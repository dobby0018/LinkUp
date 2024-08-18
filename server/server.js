const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const port = 5000;
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const corsOptions = {
  origin: 'http://localhost:5173', // Replace with your frontend URL
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  credentials:true,
};
app.use(cors(corsOptions));
// Middleware
app.use(express.json());
const mongoURI = process.env.MONGODB_URI;
// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));



app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
app.use('/api/users', userRoutes);

// const express = require('express');
// const nodemailer = require('nodemailer');
// const crypto = require('crypto');
// const app = express();

// app.use(express.json());

// app.post('/send-otp', (req, res) => {
// const { email } = req.body;

// // Generate a 6-digit OTP
// const otp = crypto.randomInt(100000, 999999);

// // Set up Nodemailer transporter
// let transporter = nodemailer.createTransport({
// service: 'gmail',
// auth: {
// user: 'abhinavlotlikar48@gmail.com', // replace with your email
// pass: 'buhflomjrgmhqjwb', // replace with your password
// },
// });

// // Set up email options
// let mailOptions = {
// from: 'abhinavlotlikar48@gmail.com', // replace with your email
// to: email,
// subject: 'Your OTP Code',
// text: `Your OTP code is ${otp}`,
// };

// // Send the email
// transporter.sendMail(mailOptions, (error, info) => {
// if (error) {
// return res.status(500).json({ error: 'Failed to send OTP' });
// }
// res.status(200).json({ otp }); // For demo purposes, return the OTP in the response
// });
// });

// app.listen(3001, () => {
// console.log('Server is running on port 3001');
// }); 


