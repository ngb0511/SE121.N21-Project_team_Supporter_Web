const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController')

router.get('/findAll', userController.listAllUsers);
router.get('/getUserSortedByID/:userID', userController.getUserSortedByID);
router.get('/getUserByID/:userID', userController.getUserByID);
router.get('/getAvatarSortedByUserID/:userID', userController.getAvatarSortedByUserID);
router.get('/getCVSortedByUserID/:userID', userController.getCVSortedByUserID);

router.post('/addUser', userController.addUser);

router.put('/updateUser/:userID', userController.updateUser);
router.put('/addAvatar/:userID', userController.addAvatar);
router.put('/addCV/:userID', userController.addCV);

router.delete('/deleteUser/:userID', userController.deleteUser);


module.exports = router;