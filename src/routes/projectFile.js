const express = require('express');
const router = express.Router();
const projectFileController = require('../controllers/ProjectFileController')

router.get('/getAllFiles/:projectID', projectFileController.getAllFiles);

router.post('/addProjectFile/:projectID', projectFileController.addProjectFile);
router.post('/deleteProjectFile/:fileID', projectFileController.deleteProjectFile);

router.put('/updateProjectFile/:fileID', projectFileController.updateProjectFile);


module.exports = router;