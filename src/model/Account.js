const db = require('../config/db-config');

const Account = function(account) {
    this.accountID = Account.accountID;
    this.email = Account.email;
    this.password = Account.password;
    this.permission = Account.permission;
    this.userID = Account.userID;
    this.verificationCode = Account.verificationCode;
    this.isVerified = Account.isVerified;
}

Account.getAllUserAccounts = function getAllUserAccounts(results) {
    db.query("SELECT account.*, user.gender, DATE_FORMAT(user.dateOfBirth, '%Y-%m-%d') AS dateOfBirth, user.email, user.phoneNumber, user.idNumber, user.address, user.majorID, user.job, user.degree, CONCAT(user.surname, ' ', user.forename) AS user FROM citrosweb.account, citrosweb.user where account.userID = user.userID and permission = 'user';", function(err, res) {

        if(err){
            console.log("error: ", err);
            results(null, err);
        }
        else{
            console.log("account: ", res);
            results(null, res);
        }
    });
};

Account.getUserNumber = function getUserNumber(results) {
    db.query("SELECT COUNT(distinct account.userID) as userNum FROM citrosweb.account where permission = 'user';", function(err, res) {

        if(err){
            console.log("error: ", err);
            results(null, err);
        }
        else{
            console.log("userNum: ", res);
            results(null, res);
        }
    });
};

Account.getAllAdminAccounts = function getAllAdminAccounts(results) {
    db.query("SELECT account.* FROM citrosweb.account where permission = 'admin';", function(err, res) {

        if(err){
            console.log("error: ", err);
            results(null, err);
        }
        else{
            console.log("account: ", res);
            results(null, res);
        }
    });
};

Account.addAccount = function addAccount(newAccount, results) {
    db.query("INSERT INTO ACCOUNT (email, password, permission, isVerified) VALUES (?, ?, 'user', 0)", [newAccount.email, newAccount.password], function(err, res) {

        if(err){
            console.log("error: ", err);
            results(err, null);
        }
        else{
            console.log(res.insertId);
            //console.log(newAccount);
            results(null, res.insertId);
        }
    });
};

Account.createAdminAccount = function createAdminAccount(newAccount, results) {
    db.query("INSERT INTO ACCOUNT (email, password, permission, isVerified) VALUES (?, ?, 'admin', 1)", [newAccount.email, newAccount.password], function(err, res) {

        if(err){
            console.log("error: ", err);
            results(err, null);
        }
        else{
            console.log(res.insertId);
            //console.log(newAccount);
            results(null, res.insertId);
        }
    });
};

// Account.checkAccount = function checkAccount(email, results) {
//     db.query("SELECT account.*, CONCAT(user.surname, ' ', user.forename) AS user FROM citrosweb.account, citrosweb.user where account.userID = user.userID and account.email = ? limit 1;", email, function(err, res) {

//         if(err){
//             console.log("error: ", err);
//             results(null, err);
//         }
//         else{
//             console.log("account: ", res);
//             results(null, res);
//         }
//     });
// };

Account.updateAccount = function updateAccount(updatedAccount, accountID, results) {
    db.query("UPDATE ACCOUNT SET email = ?, permission = ?, userID = ? where accountID = ?", [updatedAccount.email, updatedAccount.permission, updatedAccount.userID, accountID], function(err, res) {

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

Account.changePassword = function changePassword(newPassword, accountID, results) {
    db.query("UPDATE ACCOUNT SET password = ? where accountID = ?", [newPassword, accountID], function(err, res) {

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

Account.updateVerifiedAccount = function updateVerifiedAccount(accountID, userID, results) {
    db.query("UPDATE ACCOUNT SET userID = ?, isVerified = 1 where accountID = ?", [userID, accountID], function(err, res) {

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

// Account.updateVerifiedAccount = function updateVerifiedAccount(accountID, results) {
//     db.query("UPDATE ACCOUNT SET isVerified = true where accountID = ?",  accountID, function(err, res) {

//         if(err){
//             console.log("error: ", err);
//             results(err, null);
//         }
//         else{
//             console.log(res.insertId);
//             results(null, res.insertId);
//         }
//     });
// };

Account.updateVerificationCode = function updateVerificationCode(verificationCode, accountID, results) {
    db.query("UPDATE ACCOUNT SET verificationCode = ? where accountID = ?", [verificationCode, accountID], function(err, res) {

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

Account.checkVerificationCode = function checkVerificationCode(verificationCode, email, results) {
    // console.log(verificationCode);
    // console.log(email);
    db.query("SELECT EXISTS(SELECT account.* FROM ACCOUNT where account.verificationCode = ? and account.email = ?) AS checkVerificationCode;", [verificationCode, email], function(err, res) {

        if(err){
            console.log("error: ", email);
            results(null, err);
        }
        else{
            
            console.log("result: ", res);
            results(null, res);
        }
    });
};

Account.deleteAccount = function deleteAccount(accountID, results) {
    db.query("DELETE FROM ACCOUNT WHERE accountID = ?", accountID, function(err, res) {

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

Account.deleteAccountByEmail = function deleteAccountByEmail(email, results) {
    db.query("DELETE FROM ACCOUNT WHERE email = ?", email, function(err, res) {

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

Account.deleteUnverifiedAccount = function deleteUnverifiedAccount(results) {
    db.query("DELETE FROM ACCOUNT WHERE isVerified = 0", function(err, res) {

        if(err){
            console.log("error: ", err);
            results(err, null);
        }
        else{
            results(null, res.insertId);
        }
    });
};

Account.getAccountSortedByEmail = function getAccountSortedByEmail(email, results) {   
    db.query("SELECT account.* FROM citrosweb.account where account.email = ? limit 1;", email, function(err, res) {

        if(err){
            console.log("error: ", email);
            results(null, err);
        }
        else{
            console.log("account: ", res);
            results(null, res);
        }
    });
};

Account.getAccountAndUserSortedByEmail = function getAccountSortedByEmail(email, results) {   
    db.query("SELECT account.*, CONCAT(user.surname, ' ', user.forename) AS user FROM citrosweb.account, citrosweb.user where account.userID = user.userID and account.email = ? limit 1;", email, function(err, res) {

        if(err){
            console.log("error: ", email);
            results(null, err);
        }
        else{
            console.log("account: ", res);
            results(null, res);
        }
    });
};

Account.getAccountSortedByID = function getAccountSortedByID(accountID, results) {
    db.query("SELECT account.*, CONCAT(user.surname, ' ', user.forename) AS user FROM citrosweb.account, citrosweb.user where account.userID = user.userID and accountID = ?", accountID, function(err, res) {

        if(err){
            console.log("error: ", accountID);
            results(null, err);
        }
        else{
            console.log("account: ", res);
            results(null, res);
        }
    });
};

Account.getAccountSortedByUserID = function getAccountSortedByUserID(userID, results) {
    db.query("SELECT account.*, CONCAT(user.surname, ' ', user.forename) AS user FROM citrosweb.account, citrosweb.user where account.userID = user.userID and account.userID = ?", userID, function(err, res) {

        if(err){
            console.log("error: ", userID);
            results(null, err);
        }
        else{
            console.log("account: ", res);
            results(null, res);
        }
    });
};

Account.checkExistedAccount = function checkExistedAccount(email, results) {
    db.query("SELECT EXISTS(SELECT account.* FROM ACCOUNT where account.email = ? and account.isVerified = true) AS checkExist;" , email, function(err, res) {

        if(err){
            console.log("error: ", accountID);
            results(null, err);
        }
        else{
            console.log("result: ", res);
            results(null, res);
        }
    });
};

Account.checkCreatedAccount = function checkCreatedAccount(email, results) {
    db.query("SELECT EXISTS(SELECT account.* FROM ACCOUNT where account.email = ? and account.isVerified = false) AS checkExist;" , email, function(err, res) {

        if(err){
            console.log("error: ", accountID);
            results(null, err);
        }
        else{
            console.log("result: ", res);
            results(null, res);
        }
    });
};

module.exports = Account;