const express = require('express');
const getAllUsers = require('../controllers/adminController'); // Adjust the path
const router = express.Router();

// GET all users excluding password
router.get('/usersdata', getAllUsers);

module.exports = router;
