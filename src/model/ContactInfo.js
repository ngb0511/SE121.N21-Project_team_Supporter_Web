const db = require('../config/db-config');

const ContactInfo = function(contactInfo) {
    this.contactInfoID = ContactInfo.contactInfoID;
    this.userID = ContactInfo.userID;
    this.platform = ContactInfo.platform;
    this.link = ContactInfo.link; 
}

ContactInfo.getAllContactInfo = function getAllContactInfo(results) {
    db.query("SELECT contact_info.*, CONCAT(user.surname, ' ', user.forename) AS user FROM citrosweb.contact_info, citrosweb.user where contact_info.userID = user.userID;", function(err, res) {

        if(err){
            console.log("error: ", err);
            results(null, err);
        }
        else{
            console.log("contact_info: ", res);
            results(null, res);
        }
    });
};

ContactInfo.addContactInfo = function addContactInfo(newContactInfo, results) {
    db.query("INSERT INTO CONTACT_INFO SET ?", newContactInfo, function(err, res) {

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

ContactInfo.updateContactInfo = function updateContactInfo(updatedContactInfo, contactInfoID, results) {
    db.query("UPDATE ACCOUNT SET userID = ?, platform = ?, link = ? where contactInfoID = ?", [updatedContactInfo.userID, updatedContactInfo.platform, updatedContactInfo.link, contactInfoID], function(err, res) {

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

ContactInfo.deleteContactInfo = function deleteContactInfo(contactInfoID, results) {
    db.query("DELETE FROM CONTACT_INFO WHERE contactInfoID = ?", contactInfoID, function(err, res) {

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

ContactInfo.getContactInfoSortedByName = function getContactInfoSortedByName(userName, results) {
    if (userName == " ")
    {
        userName = "";
    }
    
    db.query("SELECT contact_info.*, CONCAT(user.surname, ' ', user.forename) AS user FROM citrosweb.contact_info, citrosweb.user where contact_info.userID = user.userID and CONCAT(user.surname, ' ', user.forename) like ?", ["%" + userName + "%"], function(err, res) {

        if(err){
            console.log("error: ", userName);
            results(null, err);
        }
        else{
            console.log("account: ", res);
            results(null, res);
        }
    });
};

ContactInfo.getContactInfoSortedByID = function getContactInfoSortedByID(userID, results) {
    db.query("SELECT contact_info.*, CONCAT(user.surname, ' ', user.forename) AS user FROM citrosweb.contact_info, citrosweb.user where contact_info.userID = user.userID and userID = ?", userID, function(err, res) {

        if(err){
            console.log("error: ", accountID);
            results(null, err);
        }
        else{
            console.log("contact_info: ", res);
            results(null, res);
        }
    });
};

module.exports = ContactInfo;