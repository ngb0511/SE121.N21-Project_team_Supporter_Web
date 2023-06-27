const express = require('express');
const router = express.Router();
const reportController = require('../controllers/ReportController')

router.get('/findAll', reportController.getAllReports);

router.post('/addReport', reportController.addReport);

router.delete('/deleteReport/:reportID', reportController.deleteReport);

module.exports = router;