const express = require('express');
const router = express.Router();
const projectController = require('../controllers/ProjectController')

router.get('/findAll', projectController.listAllProjects);
router.post('/addProject', projectController.addProject);
router.put('/updateProject/:projectID', projectController.updateProject);
router.delete('/deleteProject/:projectID', projectController.deleteProject);
router.get('/getProjectSortedByName/:projectName', projectController.getProjectSortedByName);
router.get('/getProjectSortedByID/:projectID', projectController.getProjectSortedByName);

module.exports = router;