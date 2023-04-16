const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController')

router.get('/findAll', userController.listAllUsers);
router.post('/addUser', userController.addUser);
router.put('/updateUser/:userID', userController.updateUser);
router.delete('/deleteUser/:userID', userController.deleteUser);
router.get('/getUserSortedByName/:userName', userController.getUserSortedByName);
router.put('/uploadAvatar/:userID', userController.uploadAvatar);

module.exports = router;