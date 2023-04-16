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

module.exports = Major;