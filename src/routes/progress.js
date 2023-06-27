const express = require('express');
const router = express.Router();
const progressController = require('../controllers/ProgressController')

router.get('/findAll/:projectID', progressController.listAllProgress);
router.get('/getProgressSortedByName/:projectName', progressController.getProgressSortedByName);
router.get('/getDoneTasks/:projectID', progressController.getDoneTasks);
router.get('/getUndoneTasks/:projectID', progressController.getUndoneTasks);
router.get('/getDelayedTasks/:projectID', progressController.getDelayedTasks);
router.get('/getProgressSortedByNameAndDateASC/:projectName', progressController.getProgressSortedByNameAndDateASC);
router.get('/getProgressSortedByNameAndDateDESC/:projectName', progressController.getProgressSortedByNameAndDateDESC);
router.get('/getProgressSortedByName/:progressID', progressController.getProgressSortedByName);
router.get('/getProgressSortedByID/:progressID', progressController.getProgressSortedByID);
router.get('/getProgressSortedByDateASC', progressController.getProgressSortedByDateASC);
router.get('/getProgressSortedByDateDESC', progressController.getProgressSortedByDateDESC);

router.post('/addProgress/:projectID', progressController.addProgress);

router.put('/updateProgress/:progressID', progressController.updateProgress);
router.put('/updateProgressUser/:userID', progressController.updateProgressUser);

router.delete('/deleteProgress/:progressID', progressController.deleteProgress);


module.exports = router;