const express = require('express');
const router = express.Router();
const majorController = require('../controllers/MajorController')

router.get('/findAll', majorController.listAllMajors);
router.post('/addMajor', majorController.addMajor);
//router.get('/getRoleSortByName/:roleName', majorController.getRoleSortByName);

module.exports = router;