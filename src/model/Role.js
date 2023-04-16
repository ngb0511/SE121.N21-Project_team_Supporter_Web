const db = require('../config/db-config');

const Role = function(role) {
    this.roleID = Role.roleID;
    this.roleName = Role.roleName;
}

Role.getAllRoles = function getAllRoles(results) {
    db.query("SELECT * FROM role", function(err, res) {

        if(err){
            console.log("error: ", err);
            results(null, err);
        }
        else{
            console.log("role: ", res);
            results(null, res);
        }
    });
};

Role.addRole = function addRole(newRole, results) {
    db.query("INSERT INTO role SET ?", newRole, function(err, res) {

        if(err){
            console.log("error: ", err);
            results(err, null);
        }
        else{
            console.log(res.insertId);
            results(null, res.insertId);
        }
    });
};

Role.updateRole = function updateRole(updatedRole, roleID, results) {
    db.query("UPDATE role SET roleName = ? WHERE roleID = ?", [updatedRole.roleName, roleID], function(err, res) {

        if(err){
            console.log("error: ", err);
            results(err, null);
        }
        else{
            console.log(res.insertId);
            results(null, res.insertId);
        }
    });
};

Role.deleteRole = function deleteRole(roleID, results) {
    db.query("DELETE FROM role WHERE roleID = ?", roleID, function(err, res) {

        if(err){
            console.log("error: ", err);
            results(err, null);
        }
        else{
            console.log(res.insertId);
            results(null, res.insertId);
        }
    });
};

Role.getRoleSortedByName = function getRoleSortedByName(roleName, results) {
    db.query("SELECT * FROM role where roleName like ?", ["%" + roleName + "%"], function(err, res) {

        if(err){
            console.log("error: ", roleName);
            results(null, err);
        }
        else{
            console.log("role: ", res);
            results(null, res);
        }
    });
};

module.exports = Role;