const express = require('express');
const router = express.Router();
const roleController = require('../controllers/RoleController')

router.get('/findAll', roleController.listAllRoles);
router.post('/addRole', roleController.addRole);
router.get('/getRoleSortedByName/:roleName', roleController.getRoleSortedByName);
router.put('/updateRole/:roleID', roleController.updateRole);
router.delete('/deleteRole/:roleID', roleController.deleteRole);

module.exports = router;