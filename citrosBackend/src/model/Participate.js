const db = require('../config/db-config');

const Participate = function(participate) {
    this.userID = Participate.userID;
    this.projectID = Participate.projectID;
    //this.majorID = Participate.majorID;
    this.rate = Participate.rate;
}

Participate.getAllParticipant = function getAllParticipant(projectID, results) {
    db.query("SELECT participate.*, CONCAT(user.surname, ' ', user.forename) AS user FROM citrosweb.participate, citrosweb.user where participate.userID = user.userID and participate.projectID = ?;", projectID, function(err, res) {

        if(err){
            //console.log("error: ", err);
            results(null, err);
        }
        else{
            //console.log("projectID: ", res);
            results(null, res);
        }
    });
};

Participate.getAllJoinedProject = function getAllJoinedProject(userID, results) {
    db.query("SELECT project.projectID, project.projectName, project.projectOwner, project.description, DATE_FORMAT(project.startTime, '%Y-%m-%d') AS startTime, DATE_FORMAT(project.endTime, '%Y-%m-%d') AS endTime, project.maxParticipantAmount, project.gitHubLink, projectStatus, project.majorID, majorName, CONCAT(user.surname, ' ', user.forename) AS user, COUNT(PARTICIPATE.userID) AS NumberOfUsers FROM citrosweb.project, citrosweb.user, citrosweb.major, citrosweb.participate where project.projectOwner = user.userID and major.majorID = project.majorID and participate.projectID = project.projectID and participate.userID = ? group by project.projectID", userID, function(err, res) {

        if(err){
            //console.log("error: ", err);
            results(null, err);
        }
        else{
            //console.log("projectID: ", res);
            results(null, res);
        }
    });
};

Participate.getFinishedProject = function getFinishedProject(userID, results) {
    db.query("SELECT project.projectID, project.projectName, project.projectOwner, project.description, DATE_FORMAT(project.startTime, '%Y-%m-%d') AS startTime, DATE_FORMAT(project.endTime, '%Y-%m-%d') AS endTime, project.maxParticipantAmount, project.gitHubLink, projectStatus, project.majorID, majorName, CONCAT(user.surname, ' ', user.forename) AS user, COUNT(PARTICIPATE.userID) AS NumberOfUsers FROM citrosweb.project, citrosweb.user, citrosweb.major, citrosweb.participate where project.projectOwner = user.userID and major.majorID = project.majorID and participate.projectID = project.projectID and participate.userID = ? and projectStatus = 'Đã hoàn thành' group by project.projectID", userID, function(err, res) {

        if(err){
            //console.log("error: ", err);
            results(null, err);
        }
        else{
            //console.log("projectID: ", res);
            results(null, res);
        }
    });
};

Participate.getUnfinishedProject = function getUnfinishedProject(userID, results) {
    db.query("SELECT project.projectID, project.projectName, project.projectOwner, project.description, DATE_FORMAT(project.startTime, '%Y-%m-%d') AS startTime, DATE_FORMAT(project.endTime, '%Y-%m-%d') AS endTime, project.maxParticipantAmount, project.gitHubLink, projectStatus, project.majorID, majorName, CONCAT(user.surname, ' ', user.forename) AS user, COUNT(PARTICIPATE.userID) AS NumberOfUsers FROM citrosweb.project, citrosweb.user, citrosweb.major, citrosweb.participate where project.projectOwner = user.userID and major.majorID = project.majorID and participate.projectID = project.projectID and participate.userID = ? and projectStatus = 'Chưa hoàn thành' group by project.projectID", userID, function(err, res) {

        if(err){
            //console.log("error: ", err);
            results(null, err);
        }
        else{
            //console.log("projectID: ", res);
            results(null, res);
        }
    });
};

Participate.addParticipate = function addParticipate(userID, newParticipate, results) {
    db.query("INSERT INTO PARTICIPATE (userID, projectID) VALUES(?, ?)", [userID, newParticipate.projectID], function(err, res) {

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

Participate.deleteParticipate = function deleteParticipate(userID, results) {
    db.query("DELETE FROM PARTICIPATE WHERE userID = ?", userID, function(err, res) {

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

Participate.updateRate = function updateRate(newParticipate, results) {
    db.query("UPDATE PARTICIPATE SET rate = ? WHERE userID = ? and projectID = ?;", [newParticipate.rate, newParticipate.userID, newParticipate.projectID], function(err, res) {

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

Participate.checkExistedParticipate = function checkExistedParticipate(participate, results) {
    db.query("SELECT EXISTS(SELECT participate.* FROM PARTICIPATE where participate.userID = ? and participate.projectID = ?) AS checkExist;" , [participate.userID, participate.projectID], function(err, res) {

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

Participate.getNumberOfProjects = function getNumberOfProjects(userID, results) {
    db.query("SELECT year(startTime) as year, COUNT(distinct project.projectID) AS total FROM citrosweb.project, citrosweb.participate where project.projectID = participate.projectID and participate.userID = ? group by year(startTime);", userID, function(err, res) {

        if(err){
            //console.log("error: ", err);
            results(null, err);
        }
        else{
            //console.log("project: ", res);
            results(null, res);
        }
    });
};

Participate.getTotalNumberOfProjectJoined = function getTotalNumberOfProjectJoined(userID, results) {
    db.query("SELECT COUNT(distinct participate.projectID) AS total FROM citrosweb.project, citrosweb.participate where project.projectID = participate.projectID and participate.userID = ?;", userID, function(err, res) {

        if(err){
            //console.log("error: ", err);
            results(null, err);
        }
        else{
            //console.log("project: ", res);
            results(null, res);
        }
    });
};

Participate.getNumberOfUnfinishedProjectsInYear = function getNumberOfUnfinishedProjectsInYear(year, userID, results) {
    db.query("SELECT COUNT(distinct PARTICIPATE.projectID) AS inprogress FROM citrosweb.user, citrosweb.participate, citrosweb.project where project.projectID = participate.projectID and year(startTime) = ? and participate.userID = ? and projectStatus = 'Chưa hoàn thành';", [year, userID], function(err, res) {

        if(err){
            //console.log("error: ", err);
            results(null, err);
        }
        else{
            //console.log("project: ", res);
            results(null, res);
        }
    });
};

Participate.getNumberOfFinishedProjectsInYear = function getNumberOfFinishedProjectsInYear(year, userID, results) {
    db.query("SELECT COUNT(distinct PARTICIPATE.projectID) AS completed FROM citrosweb.user, citrosweb.participate, citrosweb.project where project.projectID = participate.projectID and year(startTime) = ? and participate.userID = ? and projectStatus = 'Đã hoàn thành';", [year, userID], function(err, res) {

        if(err){
            //console.log("error: ", err);
            results(null, err);
        }
        else{
            //console.log("project: ", res);
            results(null, res);
        }
    });
};

Participate.getNumberOfUnfinishedProjects = function getNumberOfUnfinishedProjects(userID, results) {
    db.query("SELECT COUNT(distinct PARTICIPATE.projectID) AS inprogress FROM citrosweb.user, citrosweb.participate, citrosweb.project where project.projectID = participate.projectID and participate.userID = ? and projectStatus = 'Chưa hoàn thành';", userID, function(err, res) {

        if(err){
            //console.log("error: ", err);
            results(null, err);
        }
        else{
            //console.log("project: ", res);
            results(null, res);
        }
    });
};

Participate.getNumberOfFinishedProjects = function getNumberOfFinishedProjects(userID, results) {
    db.query("SELECT COUNT(distinct PARTICIPATE.projectID) AS completed FROM citrosweb.user, citrosweb.participate, citrosweb.project where project.projectID = participate.projectID and participate.userID = ? and projectStatus = 'Đã hoàn thành';", userID, function(err, res) {

        if(err){
            //console.log("error: ", err);
            results(null, err);
        }
        else{
            //console.log("project: ", res);
            results(null, res);
        }
    });
};


module.exports = Participate;