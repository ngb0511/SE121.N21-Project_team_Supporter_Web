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
    this.degree = User.degree;
    this.experience = User.experience;
    this.avatar = User.avatar;
    this.CV = User.CV;
    this.description = User.description;	
    this.majorID = User.majorID;
}

User.getAllUsers = function getAllUsers(results) {
    db.query("SELECT user.userID, user.surname, user.forename, user.gender, DATE_FORMAT(user.dateOfBirth, '%Y-%m-%d') AS dateOfBirth, user.email, user.phoneNumber, user.idNumber, user.address, user.majorID, user.job, user.degree, user.experience, user.avatar, user.description, CONCAT(user.surname, ' ', user.forename) AS fullName FROM citrosweb.user;", function(err, res) {

        if(err){
            //console.log("error: ", err);
            results(null, err);
        }
        else{
            //console.log("user: ", res);
            results(null, res);
        }
    });
};

User.addUser = function addUser(newUser, results) {
    db.query("INSERT INTO USER (email, surname, forename) VALUES (?, ?, ?)", [newUser.email, newUser.surname, newUser.forename], function(err, res) {

        if(err){
            //console.log("error: ", err);
            results(err, null);
        }
        else{
            //console.log(res.insertId);
            results(null, res.insertId);
        }
    });
};

User.updateUser = function updateUser(updatedUser, userID, results) {
    db.query("UPDATE USER SET surname = ?, forename = ?, gender = ?, dateOfBirth = ?, email = ?, " +
            "phoneNumber = ?, idNumber = ?, address = ?, degree = ?, experience = ?, description = ?, majorID = ? " +
            "WHERE userID = ?", [updatedUser.surname, updatedUser.forename, updatedUser.gender, updatedUser.dateOfBirth, updatedUser.email, updatedUser.phoneNumber, updatedUser.idNumber, updatedUser.address, updatedUser.degree, updatedUser.experience, updatedUser.description, updatedUser.majorID, userID], function(err, res) {

        if(err){
            //console.log("error: ", err);
            results(err, null);
        }
        else{
            //console.log(res.insertId);
            results(null, res.insertId);
        }
    });
};

User.deleteUser= function deleteUser(userID, results) {
    db.query("DELETE FROM USER WHERE userID = ?", userID, function(err, res) {

        if(err){
            //console.log("error: ", err);
            results(err, null);
        }
        else{
            //console.log(res.insertId);
            results(null, res.insertId);
        }
    });
};

User.getUserSortedByID = function getUserSortedByID(userID, results) {
    db.query("SELECT user.userID, user.surname, user.forename, user.gender, DATE_FORMAT(user.dateOfBirth, '%Y-%m-%d') AS dateOfBirth, user.email, user.phoneNumber, user.idNumber, user.address, user.job, user.degree, user.experience, user.avatar, user.majorID, user.description, CONCAT(user.surname, ' ', user.forename) AS fullName, majorName FROM citrosweb.user, citrosweb.major where major.majorID = user.majorID and userID = ?", userID, function(err, res) {
        if(err){
            //console.log("error: ", userID);
            results(null, err);
        }
        else{
            //console.log("user: ", res);
            results(null, res);
        }
    });
};

User.getUserByID = function getUserByID(userID, results) {
    db.query("SELECT user.userID, user.surname, user.forename, user.gender, DATE_FORMAT(user.dateOfBirth, '%Y-%m-%d') AS dateOfBirth, user.email, user.phoneNumber, user.idNumber, user.address, user.job, user.degree, user.experience, user.avatar, user.majorID, user.description, CONCAT(user.surname, ' ', user.forename) AS fullName FROM citrosweb.user where userID = ?", userID, function(err, res) {
        if(err){
            //console.log("error: ", userID);
            results(null, err);
        }
        else{
            //console.log("user: ", res);
            results(null, res);
        }
    });
};

User.addAvatar = function addAvatar(avatar, userID, results) {
    db.query("UPDATE USER SET avatar = ? WHERE userID = ?", [avatar, userID], function(err, res) {

        if(err){
            //console.log("error: ", err);
            results(err, null);
        }
        else{
            //console.log(res.insertId);
            results(null, res.insertId);
        }
    });
};

User.addCV = function addCV(CV, userID, results) {
    db.query("UPDATE USER SET CV = ? WHERE userID = ?", [CV, userID], function(err, res) {

        if(err){
            //console.log("error: ", err);
            results(err, null);
        }
        else{
            //console.log(res.insertId);
            results(null, res.insertId);
        }
    });
};

User.getAvatarSortedByUserID = function getAvatarSortedByUserID(userID, results) {
    db.query("SELECT avatar FROM USER where userID = ?",  userID, function(err, res) {

        if(err){
            //console.log("error: ", userID);
            results(null, err);
        }
        else{
            
            ////console.log("Avatar: ", avatarName);
            results(null, res);
        }
    });
};

User.getCVSortedByUserID = function getCVSortedByUserID(userID, results) {
    db.query("SELECT CV FROM USER where userID = ?",  userID, function(err, res) {

        if(err){
            //console.log("error: ", userID);
            results(null, err);
        }
        else{
            
            ////console.log("Avatar: ", avatarName);
            results(null, res);
        }
    });
};

module.exports = User;