const express = require('express');
const router = express.Router();
const { protect } = require('../Middleware/authMiddleware');
const { getDashboard } = require('../Controllers/patientController');
const {assignDoctor} = require("../Controllers/patientController");

router.get('/dashboard', protect, getDashboard);
router.patch('/assignDoctor', protect, assignDoctor);

module.exports = router;
