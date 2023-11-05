// routes/api.js
const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

// Define your API routes here
router.get('/reports', reportController.getAllReports);
router.post('/reports', reportController.createReport);
router.delete('/reports/:id', reportController.deleteReport);
router.put('/reports/:id', reportController.editReport);

module.exports = router;
