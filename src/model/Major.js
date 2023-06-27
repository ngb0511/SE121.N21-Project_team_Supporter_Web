const db = require('../config/db-config');

const Major = function(major) {
    this.majorID = Major.majorID;
    this.majorName = Major.majorName;
    this.description = Major.description;
}

Major.getAllMajors = function getAllMajors(results) {
    db.query("SELECT * FROM MAJOR", function(err, res) {

        if(err){
            console.log("error: ", err);
            results(null, err);
        }
        else{
            console.log("Major: ", res);
            results(null, res);
        }
    });
};

Major.addMajor = function addMajor(newMajor, results) {
    db.query("INSERT INTO MAJOR SET ?", newMajor, function(err, res) {

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

Major.deleteMajor = function deleteMajor(majorID, results) {
    db.query("DELETE FROM MAJOR WHERE majorID = ?", majorID, function(err, res) {

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

Major.checkExistedMajor = function checkExistedMajor(major, results) {
    db.query("SELECT EXISTS(SELECT major.* FROM MAJOR where major.majorName = ?) AS checkExist;" , major, function(err, res) {

        if(err){
            //console.log("error: ", userID);
            results(null, err);
        }
        else{
            console.log("result: ", res);
            results(null, res);
        }
    });
};

module.exports = Major;