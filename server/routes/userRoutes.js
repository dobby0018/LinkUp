
// const express = require('express');
// const router = express.Router();
// const userController = require('../controllers/userController');

// // User routes
// router.post('/register', userController.registerUser);
// router.post('/login', userController.loginUser);
// router.get('/protected', userController.getProtectedData);

// module.exports = router;
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

const { z } = require('zod');

// Define a schema for user registration
const registerSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

// Define a schema for user login
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

// Middleware to validate user registration
const validateRegister = async (req, res, next) => {
    try {
      await registerSchema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map((error) => {
          return `${error.path[0]}: ${error.message}`;
        });
        res.status(400).json({ error: errorMessages.join(', ') });
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  };
  
  const validateLogin = async (req, res, next) => {
    try {
      await loginSchema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map((error) => {
          return `${error.path[0]}: ${error.message}`;
        });
        res.status(400).json({ error: errorMessages.join(', ') });
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  };

// Middleware to handle errors
const handleError = (err, req, res, next) => {
  res.status(500).json({ error: 'Internal Server Error' });
};

// User routes
router.post('/register', validateRegister, userController.registerUser, handleError);
router.post('/login', validateLogin, userController.loginUser, handleError);

module.exports = router;