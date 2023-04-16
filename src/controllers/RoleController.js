const db = require('../config/db-config');
const Role = require('../model/Role');

class RoleController {
    listAllRoles(req, res) {
        Role.getAllRole((err, role) => {
            if (err) {
                res.send(err);
            }
            res.send(role);
        })
    }

    addRole(req, res) {
        var newRole = new Role();
        Object.assign(newRole, req.body);
        console.log(newRole);
        Role.addRole(newRole, function (err, role) {
            if (err) {
                res.send(err);
            }
            res.json(role);
        })
    }

    updateRole(req, res) {
        var newRole = new Role();
        Object.assign(newRole, req.body);
        var roleID = req.params.roleID;
        console.log(newRole);
        Role.updateRole(newRole, roleID, function (err, role) {
            if (err) {
                res.send(err);
            }
            res.json(role);
        })
    }

    deleteRole(req, res) {
        var roleID = req.params.roleID;
        Role.deleteRole(roleID, function (err, role) {
            if (err) {
                res.send(err);
            }
            res.json(role);
        })
    }

    getRoleSortedByName(req, res) {
        const filters = req.params.roleName;
        console.log(filters);
        Role.getRoleSortedByName(filters, function (err, role)  {
            if (err) {
                res.send(err);
            }
            console.log(role)
            res.json(role);
        })
        
    }
}

module.exports = new RoleController();