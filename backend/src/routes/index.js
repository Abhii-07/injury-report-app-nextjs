const express = require('express');
const router = express.Router();

// Import your route modules
const apiRoutes = require('./api');
// Add more route modules as needed

// Define the routes for each module
router.use('/api', apiRoutes);
// Add more modules as needed

module.exports = router;
