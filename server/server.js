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





