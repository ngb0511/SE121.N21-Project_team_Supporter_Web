const express = require('express');
const router = express.Router();
const projectController = require('../controllers/ProjectController')

router.get('/findAll', projectController.listAllProjects);
router.get('/getNumberOfProjects', projectController.getNumberOfProjects);
router.get('/getProjectsAfterYear', projectController.getProjectsAfterYear);
router.get('/getNumberOfUnfinishedProjects', projectController.getNumberOfUnfinishedProjects);
router.get('/getNumberOfFinishedProjects', projectController.getNumberOfFinishedProjects);
router.get('/getNumberOfProjectsInYear/:year', projectController.getNumberOfProjectsInYear);
router.get('/getNumberOfUnfinishedProjectsInYear/:year', projectController.getNumberOfUnfinishedProjectsInYear);
router.get('/getNumberOfFinishedProjectsInYear/:year', projectController.getNumberOfFinishedProjectsInYear);
router.get('/getAllFinishedProjects', projectController.getAllFinishedProjects);
router.get('/getAllFinishedProjectsSortedByName/:projectName', projectController.getAllFinishedProjectsSortedByName);
router.get('/getAllUnfinishedProjects', projectController.getAllUnfinishedProjects);
router.get('/getAllUnfinishedProjectsSortedByName/:projectName', projectController.getAllUnfinishedProjectsSortedByName);
router.get('/getMaxProjectID', projectController.getMaxProjectID);
router.get('/getAllRegistrants/:projectID', projectController.getAllRegistrants);
router.get('/getAllProjectMajors/:projectID', projectController.getAllProjectMajors);
router.get('/getProjectSortedByName/:projectName', projectController.getProjectSortedByName);
router.get('/getProjectSortedByNameAndDateASC/:projectName', projectController.getProjectSortedByNameAndDateASC);
router.get('/getProjectSortedByNameAndDateDESC/:projectName', projectController.getProjectSortedByNameAndDateDESC);
router.get('/getProjectSortedByID/:projectID', projectController.getProjectSortedByID);
router.get('/getMatchedProject/:userID', projectController.getMatchedProject);
router.get('/getNumberOfProjectsOwned/:userID', projectController.getNumberOfProjectsOwned);
router.get('/getStarredProject/:userID', projectController.getStarredProject);
router.get('/getProjectSortedByDateASC', projectController.getProjectSortedByDateASC);
router.get('/getProjectSortedByDateDESC', projectController.getProjectSortedByDateDESC);
router.get('/getOwnedProject/:userID', projectController.getOwnedProject);
router.get('/getNumberOfLikedProjects/:projectID', projectController.getNumberOfLikedProjects);

router.post('/addProject', projectController.addProject);
router.post('/addStarredProject/:userID', projectController.addStarredProject);
router.post('/checkExistedStarred/:userID', projectController.checkExistedStarred);
router.post('/addParticipate/:userID', projectController.addParticipate);
router.post('/addParticipateWhenCreateProject', projectController.addParticipateWhenCreateProject);
router.post('/deleteStarredProject/:userID', projectController.deleteStarredProject);
router.post('/deleteParticipate/:userID', projectController.deleteParticipate);

router.put('/updateProject/:projectID', projectController.updateProject);
router.put('/updateProjectOwner/:userID', projectController.updateProjectOwner);

router.delete('/deleteProject/:projectID', projectController.deleteProject);
router.delete('/deleteAllStarredProjectOfUser/:userID', projectController.deleteAllStarredProjectOfUser);
router.delete('/deleteAllParticipateOfUser/:userID', projectController.deleteAllParticipateOfUser);
router.delete('/deleteAllParticipateOfProject/:projectID', projectController.deleteAllParticipateOfProject);



module.exports = router;