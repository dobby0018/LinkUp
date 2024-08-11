const { z } = require('zod');
const { registerSchema, loginSchema } = require('../schemas/userSchemas');

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

module.exports = { validateRegister, validateLogin };