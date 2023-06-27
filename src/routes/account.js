const express = require('express');
const router = express.Router();
const accountController = require('../controllers/AccountController')

router.get('/getAllUserAccounts', accountController.getAllUserAccounts);
router.get('/getUserNumber', accountController.getUserNumber);
router.get('/getAllAdminAccounts', accountController.getAllAdminAccounts);
router.get('/getAccountSortedByEmail/:email', accountController.getAccountSortedByEmail);
router.get('/getAccountSortedByID/:accountID', accountController.getAccountSortedByID);
router.get('/getAccountSortedByUserID/:userID', accountController.getAccountSortedByUserID);
router.get('/getAccountAndUserSortedByEmail/:accountID', accountController.getAccountAndUserSortedByEmail);
router.get('/checkExistedAccount/:email', accountController.checkExistedAccount);
router.get('/checkCreatedAccount/:email', accountController.checkCreatedAccount);

router.post('/addAccount', accountController.addAccount);
router.post('/createAdminAccount', accountController.createAdminAccount);
router.post('/checkAccount', accountController.checkAccount);

router.put('/updateAccount/:accountID', accountController.updateAccount);
router.put('/changePassword/:accountID', accountController.changePassword);
router.put('/updateVerifiedAccount/:userID', accountController.updateVerifiedAccount);
router.put('/updateVerificationCode/:accountID', accountController.updateVerificationCode);
router.put('/checkVerificationCode/:verificationCode', accountController.checkVerificationCode);

router.delete('/deleteAccount/:accountID', accountController.deleteAccount);
router.delete('/deleteAccountByEmail/:email', accountController.deleteAccountByEmail);
router.delete('/deleteUnverifiedAccount', accountController.deleteUnverifiedAccount);

//router.post('/createUser', accountController.createUser);
//router.post('/sendVerificationCode/:verificationCode', accountController.sendVerificationCode);
// router.put('/updateVerifiedAccount/:accountID', accountController.updateVerifiedAccount);

module.exports = router;