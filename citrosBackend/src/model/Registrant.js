const db = require('../config/db-config');

const Registrant = function(registrant) {
    this.registrantID = Registrant.registrantID;
    this.userID = Registrant.userID;
    this.projectID = Registrant.projectID;
    this.projectName = Registrant.projectName;
    //this.user = Project.leader;	
}

Registrant.getAllRegistrants = function getAllRegistrants(projectID, results) {
    db.query("SELECT registrant.*, CONCAT(user.surname, ' ', user.forename) AS user FROM citrosweb.registrant, citrosweb.user where registrant.userID = user.userID and projectID = ?;", projectID, function(err, res) {

        if(err){
            //console.log("error: ", err);
            results(null, err);
        }
        else{
            //console.log("registrant: ", res);
            results(null, res);
        }
    });
};

Registrant.addRegistrant = function addRegistrant(newRegistrant, results) {
    db.query("INSERT INTO REGISTRANT (userID, projectID, projectName) VALUES (?, ?, ?)", [newRegistrant.userID, newRegistrant.projectID, newRegistrant.projectName], function(err, res) {

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

// Registrant.updateRegistrant = function updateRegistrant(updatedRegistrant, registrantID, results) {
//     db.query("UPDATE REGISTRANT SET majorID = ? where registrantID = ?", [updatedRegistrant.majorID, registrantID], function(err, res) {

//         if(err){
//             //console.log("error: ", err);
//             results(err, null);
//         }
//         else{
//             //console.log(res.insertId);
//             results(null, res.insertId);
//         }
//     });
// };

// Registrant.updateIsAcceptedRegistrant = function updateIsAcceptedRegistrant(isAccepted, registrantID, results) {
//     db.query("UPDATE REGISTRANT SET isAccepted = ? where registrantID = ?", [isAccepted, registrantID], function(err, res) {

//         if(err){
//             //console.log("error: ", err);
//             results(err, null);
//         }
//         else{
//             //console.log(res.insertId);
//             results(null, res.insertId);
//         }
//     });
// };

Registrant.deleteRegistrant = function deleteRegistrant(userID, projectID, results) {
    db.query("DELETE FROM REGISTRANT WHERE userID = ? and projectID = ?", [userID, projectID], function(err, res) {

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

Registrant.deleteAllRegistrantOfUser = function deleteAllRegistrantOfUser(userID, results) {
    db.query("DELETE FROM REGISTRANT WHERE userID = ?", userID, function(err, res) {

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

// Registrant.getRegistrantSortedByMajor = function getRegistrantSortedByMajor(projectID, majorID, results) {
//     db.query("SELECT registrant.*, major.majorName, CONCAT(user.surname, ' ', user.forename) AS user FROM citrosweb.registrant, citrosweb.user, citrosweb.major where registrant.userID = user.userID and registrant.majorID = major.majorID and projectID = ? and majorID = ?;", [projectID, majorID], function(err, res) {

//         if(err){
//             //console.log("error: ", projectID);
//             results(null, err);
//         }
//         else{
//             //console.log("registrant: ", res);
//             results(null, res);
//         }
//     });
// };

Registrant.checkExistedRegistrant = function checkExistedRegistrant(registrant, results) {
    db.query("SELECT EXISTS(SELECT registrant.* FROM REGISTRANT where registrant.userID = ? and registrant.projectID = ?) AS checkExist;" , [registrant.userID, registrant.projectID], function(err, res) {

        if(err){
            ////console.log("error: ", userID);
            results(null, err);
        }
        else{
            //console.log("result: ", res);
            results(null, res);
        }
    });
};

module.exports = Registrant;