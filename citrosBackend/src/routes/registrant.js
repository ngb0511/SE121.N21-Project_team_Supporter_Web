const express = require('express');
const router = express.Router();
const registrantController = require('../controllers/RegistrantController')

router.get('/findAll/:projectID', registrantController.listAllRegistrants);

router.post('/addRegistrant', registrantController.addRegistrant);
router.post('/sendAcceptedEmail/:email', registrantController.sendAcceptedEmail);
router.post('/checkExistedRegistrant', registrantController.checkExistedRegistrant);
router.post('/deleteRegistrant/:userID', registrantController.deleteRegistrant);

router.delete('/deleteAllRegistrantOfUser/:userID', registrantController.deleteAllRegistrantOfUser);

//router.get('/getRegistrantSortedByMajor/:projectID', registrantController.getRegistrantSortedByMajor);
//router.post('/sendRejectedEmail/:email', registrantController.sendRejectedEmail);
//router.put('/updateRegistrant/:registrantID', registrantController.updateRegistrant);
//router.put('/updateIsAcceptedRegistrant/:registrantID', registrantController.updateIsAcceptedRegistrant);

module.exports = router;