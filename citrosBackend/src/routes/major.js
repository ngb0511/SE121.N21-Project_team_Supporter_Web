const express = require('express');
const router = express.Router();
const majorController = require('../controllers/MajorController')

router.get('/findAll', majorController.getAllMajors);

router.post('/addMajor', majorController.addMajor);
router.post('/checkExistedMajor', majorController.checkExistedMajor);

router.delete('/deleteMajor/:majorID', majorController.deleteMajor);

module.exports = router;