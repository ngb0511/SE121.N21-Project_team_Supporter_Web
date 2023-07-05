const express = require('express');
const router = express.Router();
const contactInfoController = require('../controllers/ContactInforController')

router.get('/findAll', contactInfoController.listAllContactInfo);
router.get('/getContactInfoSortedByName/:userName', contactInfoController.getContactInfoSortedByName);
router.get('/getContactInfoSortedByID/:userID', contactInfoController.getContactInfoSortedByID);

router.post('/addContactInfo', contactInfoController.addContactInfo);

router.put('/updateContactInfo/:contactInfoID', contactInfoController.updateContactInfo);

router.delete('/deleteContactInfo/:contactInfoID', contactInfoController.deleteContactInfo);


module.exports = router;