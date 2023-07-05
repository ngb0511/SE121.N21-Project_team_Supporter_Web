const express = require('express');
const router = express.Router();
const participateController = require('../controllers/ParticipateController')

router.get('/getAllParticipant/:projectID', participateController.getAllParticipant);
router.get('/getNumberOfProjects/:userID', participateController.getNumberOfProjects);
router.get('/getTotalNumberOfProjectJoined/:userID', participateController.getTotalNumberOfProjectJoined);
router.get('/getNumberOfUnfinishedProjects/:userID', participateController.getNumberOfUnfinishedProjects);
router.get('/getNumberOfFinishedProjects/:userID', participateController.getNumberOfFinishedProjects);
router.get('/getAllJoinedProject/:userID', participateController.getAllJoinedProject);
router.get('/getFinishedProject/:userID', participateController.getFinishedProject);
router.get('/getUnfinishedProject/:userID', participateController.getUnfinishedProject);

router.post('/getNumberOfUnfinishedProjectsInYear/:year', participateController.getNumberOfUnfinishedProjectsInYear);
router.post('/getNumberOfFinishedProjectsInYear/:year', participateController.getNumberOfFinishedProjectsInYear);
router.post('/addParticipate/:userID', participateController.addParticipate);
router.post('/checkExistedParticipate', participateController.checkExistedParticipate);

router.put('/updateRate', participateController.updateRate);

router.delete('/deleteParticipate/:userID', participateController.deleteParticipate);

module.exports = router;