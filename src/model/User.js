const db = require('../config/db-config');

const User = function(user) {
    this.userID = User.userID;
    this.surname = User.surname;
    this.forename = User.forename;
    this.gender = User.gender;
    this.dateOfBirth = User.dateOfBirth;
    this.email = User.email;
    this.phoneNumber = User.phoneNumber;
    this.idNumber = User.idNumber;
    this.address = User.address;
    this.job = User.job;
    this.description = User.description;
    this.avatar = User.avatar;		
}

User.getAllUsers = function getAllUsers(results) {
    db.query("SELECT * FROM USER", function(err, res) {

        if(err){
            console.log("error: ", err);
            results(null, err);
        }
        else{
            console.log("user: ", res);
            results(null, res);
        }
    });
};

User.addUser = function addUser(newUser, results) {
    db.query("INSERT INTO USER SET ?", newUser, function(err, res) {

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

User.updateUser = function updateUser(updatedUser, userID, results) {
    db.query("UPDATE USER SET surname = ?, forename = ?, gender = ?, dateOfBirth = ?, email = ?, " +
            "phoneNumber = ?, idNumber = ?, address = ?, job = ?, description = ? " +
            "WHERE userID = ?", [updatedUser.surname, updatedUser.forename, updatedUser.gender, updatedUser.dateOfBirth, updatedUser.email, updatedUser.phoneNumber, updatedUser.idNumber, updatedUser.address, updatedUser.job, updatedUser.description, userID], function(err, res) {

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

User.deleteUser= function deleteUser(userID, results) {
    db.query("DELETE FROM USER WHERE userID = ?", userID, function(err, res) {

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

User.getUserSortedByName = function getUserSortedByName(userName, results) {
    db.query("SELECT * FROM USER where userName like ?", ["%" + userName + "%"], function(err, res) {
        if(err){
            console.log("error: ", userName);
            results(null, err);
        }
        else{
            console.log("user: ", res);
            results(null, res);
        }
    });
};

User.uploadAvatar = function uploadAvatar(avatarLink, userID, results) {
    db.query("UPDATE USER SET avatar = ? WHERE userID = ?", [avatarLink, userID], function(err, res) {

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

module.exports = User;