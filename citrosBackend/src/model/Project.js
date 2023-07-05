const db = require('../config/db-config');

const Project = function(project) {
    this.projectID = Project.projectID;
    this.projectName = Project.projectName;
    this.projectOwner = Project.projectOwner;
    this.description = Project.description;
    this.startTime = Project.startTime;
    this.endTime = Project.endTime;
    this.maxParticipantAmount = Project.maxParticipantAmount;
    this.gitHubLink = Project.gitHubLink;	
    this.projectStatus = Project.projectStatus;
    this.majorID = Project.majorID;
    
    //this.user = Project.user;	
}

Project.getAllProjects = function getAllProjects(results) {
    db.query("SELECT project.projectID, project.projectName, project.projectOwner, project.description, DATE_FORMAT(project.startTime, '%Y-%m-%d') AS startTime, DATE_FORMAT(project.endTime, '%Y-%m-%d') AS endTime, project.maxParticipantAmount, project.gitHubLink, projectStatus, major.majorID, major.majorName, CONCAT(user.surname, ' ', user.forename) AS user FROM citrosweb.project, citrosweb.user, citrosweb.major where project.projectOwner = user.userID and project.majorID = major.majorID group by project.projectID order by project.projectID;", function(err, res) {

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

Project.getMaxProjectID = function getMaxProjectID(results) {
    db.query("SELECT max(projectID) AS maxProjectID FROM citrosweb.project;", function(err, res) {

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

Project.getAllRegistrants = function getAllParticipant(projectID, results) {
    db.query("SELECT registrants.*, CONCAT(user.surname, ' ', user.forename) AS user FROM citrosweb.registrants, citrosweb.user where registrants.userID = user.userID and projectID = ?;", projectID, function(err, res) {

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

Project.getAllProjectMajors = function getAllProjectMajors(projectID, results) {
    db.query("SELECT major.majorID, major.majorName FROM citrosweb.project, citrosweb.major where major.majorID = project.majorID and projectID = ?;", projectID, function(err, res) {

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

Project.deleteRegistrant= function deleteRegistrant(userID, projectID, results) {
    db.query("DELETE FROM REGISTRANTS WHERE userID = ? and projectID = ?", [userID, projectID], function(err, res) {

        if(err){
            //console.log("error: ", err);
            results(err, null);
        }
        else{
            //console.log(res.userID);
            results(null, res.userID);
        }
    });
};

Project.addProject = function addProject(newProject, results) {
    db.query("INSERT INTO PROJECT (projectName, projectOwner, description, startTime, endTime, maxParticipantAmount, majorID, projectStatus) VALUES (?, ?, ?, ?, ?, ?, ?, 'Chưa hoàn thành')", [newProject.projectName, newProject.projectOwner, newProject.description, newProject.startTime, newProject.endTime, newProject.maxParticipantAmount, newProject.majorID], function(err, res) {

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

Project.addStarredProject = function addStarredProject(userID, projectID, results) {
    db.query("INSERT INTO STARREDPROJECT (userID, projectID) VALUES (?, ?);", [userID, projectID], function(err, res) {

        if(err){
            //console.log("error: ", err);
            results(err, null);
        }
        else{
            //console.log(res.userID);
            results(null, res.userID);
        }
    });
};

Project.checkExistedStarred = function checkExistedStarred(userID, projectID, results) {
    db.query("SELECT EXISTS(SELECT starredproject.* FROM STARREDPROJECT where starredproject.userID = ? and starredproject.projectID = ?) AS checkExist;" , [userID, projectID], function(err, res) {

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

Project.deleteStarredProject= function deleteStarredProject(userID, projectID, results) {
    db.query("DELETE FROM STARREDPROJECT WHERE userID = ? and projectID = ?", [userID, projectID], function(err, res) {

        if(err){
            //console.log("error: ", err);
            results(err, null);
        }
        else{
            //console.log(res.userID);
            results(null, res.userID);
        }
    });
};

Project.deleteParticipate= function deleteParticipate(userID, projectID, results) {
    db.query("DELETE FROM PARTICIPATE WHERE userID = ? and projectID = ?", [userID, projectID], function(err, res) {

        if(err){
            //console.log("error: ", err);
            results(err, null);
        }
        else{
            //console.log(res.userID);
            results(null, res.userID);
        }
    });
};

Project.deleteAllParticipateOfUser= function deleteAllParticipateOfUser(userID, results) {
    db.query("DELETE FROM PARTICIPATE WHERE userID = ?", userID, function(err, res) {

        if(err){
            //console.log("error: ", err);
            results(err, null);
        }
        else{
            //console.log(res.userID);
            results(null, res.userID);
        }
    });
};

Project.deleteAllParticipateOfProject= function deleteAllParticipateOfProject(projectID, results) {
    db.query("DELETE FROM PARTICIPATE WHERE projectID = ?", projectID, function(err, res) {

        if(err){
            //console.log("error: ", err);
            results(err, null);
        }
        else{
            //console.log(res.userID);
            results(null, res.userID);
        }
    });
};

Project.deleteAllStarredProjectOfUser= function deleteAllStarredProjectOfUser(userID, results) {
    db.query("DELETE FROM STARREDPROJECT WHERE userID = ?", userID, function(err, res) {

        if(err){
            //console.log("error: ", err);
            results(err, null);
        }
        else{
            //console.log(res.userID);
            results(null, res.userID);
        }
    });
};

Project.addParticipateWhenCreateProject = function addParticipateWhenCreateProject(projectOwner, projectID, results) {
    db.query("INSERT INTO PARTICIPATE (userID, projectID) VALUES(?, ?)", [projectOwner, projectID], function(err, res) {

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


Project.updateProject = function updateProject(updatedProject, projectID, results) {
    db.query("UPDATE PROJECT SET projectStatus = ?, description = ?, gitHubLink = ? where projectID = ?;", [updatedProject.projectStatus, updatedProject.description, updatedProject.gitHubLink, projectID], function(err, res) {

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

Project.updateProjectOwner= function updateProjectOwner(userID, results) {
    db.query("UPDATE PROJECT SET projectOwner = '1' where projectOwner = ?;", userID, function(err, res) {

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

Project.deleteProject= function deleteProject(projectID, results) {
    db.query("DELETE FROM PROJECT WHERE projectID = ?", projectID, function(err, res) {

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

Project.getProjectSortedByName = function getProjectSortedByName(projectName, results) {    
    db.query("SELECT project.projectID, project.projectName, project.projectOwner, project.description, DATE_FORMAT(project.startTime, '%Y-%m-%d') AS startTime, DATE_FORMAT(project.endTime, '%Y-%m-%d') AS endTime, project.maxParticipantAmount, project.gitHubLink, projectStatus, major.majorID, major.majorName, CONCAT(user.surname, ' ', user.forename) AS user FROM citrosweb.project, citrosweb.user, citrosweb.major where project.projectOwner = user.userID and project.majorID = major.majorID and project.projectName like ? group by project.projectID order by project.projectID;", ["%" + projectName + "%"], function(err, res) {

        if(err){
            //console.log("error: ", projectName);
            results(null, err);
        }
        else{
            //console.log("project: ", res);
            results(null, res);
        }
    });
};

Project.getProjectSortedByID = function getProjectSortedByID(projectID, results) {
    db.query("SELECT project.projectID, project.projectName, project.projectOwner, project.description, DATE_FORMAT(project.startTime, '%Y-%m-%d') AS startTime, DATE_FORMAT(project.endTime, '%Y-%m-%d') AS endTime, project.maxParticipantAmount, project.gitHubLink, project.majorID, projectStatus, CONCAT(user.surname, ' ', user.forename) AS user, COUNT(PARTICIPATE.userID) AS NumberOfUsers, majorName FROM citrosweb.project, citrosweb.user, citrosweb.participate, citrosweb.major where project.projectOwner = user.userID and participate.projectID = project.projectID and major.majorID = project.majorID and project.projectID = ? group by project.projectID", projectID, function(err, res) {

        if(err){
            //console.log("error: ", projectID);
            results(null, err);
        }
        else{
            //console.log("project: ", res);
            results(null, res);
        }
    });
};

Project.getMatchedProject = function getMatchedProject(userID, results) {
    db.query("SELECT project.projectID, project.projectName, project.projectOwner, project.description, DATE_FORMAT(project.startTime, '%Y-%m-%d') AS startTime, DATE_FORMAT(project.endTime, '%Y-%m-%d') AS endTime, project.maxParticipantAmount, project.gitHubLink, project.majorID, projectStatus, CONCAT(user.surname, ' ', user.forename) AS user, majorName FROM citrosweb.project, citrosweb.user, citrosweb.major where major.majorID = project.majorID and user.majorID = project.majorID and user.userID = ? group by project.projectID;", userID, function(err, res) {

        if(err){
            //console.log("error: ", userID);
            results(null, err);
        }
        else{
            //console.log("project: ", res);
            results(null, res);
        }
    });
};

Project.getStarredProject = function getStarredProject(userID, results) {
    db.query("SELECT starredproject.projectID, project.projectName, project.projectOwner, project.description, DATE_FORMAT(project.startTime, '%Y-%m-%d') AS startTime, DATE_FORMAT(project.endTime, '%Y-%m-%d') AS endTime, project.maxParticipantAmount, project.gitHubLink, project.majorID, projectStatus, CONCAT(user.surname, ' ', user.forename) AS user, majorName FROM citrosweb.project, citrosweb.starredproject, citrosweb.user, citrosweb.major where major.majorID = project.majorID and user.userID = starredproject.userID and starredproject.projectID = project.projectID and starredproject.userID = ?;", userID, function(err, res) {

        if(err){
            //console.log("error: ", userID);
            results(null, err);
        }
        else{
            //console.log("project: ", res);
            results(null, res);
        }
    });
};

// Project.getProjectSortedByUserID = function getProjectSortedByUserID(userID, results) {
//     db.query("SELECT project.projectID, project.projectName, project.projectOwner, project.description, DATE_FORMAT(project.startTime, '%Y-%m-%d') AS startTime, DATE_FORMAT(project.endTime, '%Y-%m-%d') AS endTime, project.maxParticipantAmount, project.gitHubLink, CONCAT(user.surname, ' ', user.forename) AS user, COUNT(PARTICIPATE.userID) AS NumberOfUsers FROM citrosweb.project, citrosweb.user, citrosweb.participate where project.projectOwner = user.userID and participate.projectID = project.projectID and participate.userID = ? group by participate.userID", projectID, function(err, res) {

//         if(err){
//             //console.log("error: ", projectID);
//             results(null, err);
//         }
//         else{
//             //console.log("project: ", res);
//             results(null, res);
//         }
//     });
// };

Project.getProjectSortedByNameAndDateASC = function getProjectSortedByNameAndDateASC(projectName, results) {
    db.query("SELECT project.projectID, project.projectName, project.projectOwner, project.description, DATE_FORMAT(project.startTime, '%Y-%m-%d') AS startTime, DATE_FORMAT(project.endTime, '%Y-%m-%d') AS endTime, project.maxParticipantAmount, project.gitHubLink, project.majorID, projectStatus, CONCAT(user.surname, ' ', user.forename) AS user, COUNT(PARTICIPATE.userID) AS NumberOfUsers, majorName FROM citrosweb.project, citrosweb.user, citrosweb.participate, citrosweb.major where project.projectOwner = user.userID and participate.projectID = project.projectID and major.majorID = project.majorID and projectName like ? group by project.projectID order by startTime asc", ["%" + projectName + "%"], function(err, res) {

        if(err){
            //console.log("error: ", projectName);
            results(null, err);
        }
        else{
            //console.log("project: ", res);
            results(null, res);
        }
    });
};

Project.getProjectSortedByDateASC = function getProjectSortedByDateASC(results) {
    db.query("SELECT project.projectID, project.projectName, project.projectOwner, project.description, DATE_FORMAT(project.startTime, '%Y-%m-%d') AS startTime, DATE_FORMAT(project.endTime, '%Y-%m-%d') AS endTime, project.maxParticipantAmount, project.gitHubLink, project.majorID, projectStatus, CONCAT(user.surname, ' ', user.forename) AS user, COUNT(PARTICIPATE.userID) AS NumberOfUsers, majorName FROM citrosweb.project, citrosweb.user, citrosweb.participate, citrosweb.major where project.projectOwner = user.userID and participate.projectID = project.projectID and major.majorID = project.majorID group by project.projectID order by startTime asc", function(err, res) {

        if(err){
            //console.log("error: ", projectName);
            results(null, err);
        }
        else{
            //console.log("project: ", res);
            results(null, res);
        }
    });
};

Project.getProjectSortedByNameAndDateDESC = function getProjectSortedByNameAndDateDESC(projectName, results) {
    db.query("SELECT project.projectID, project.projectName, project.projectOwner, project.description, DATE_FORMAT(project.startTime, '%Y-%m-%d') AS startTime, DATE_FORMAT(project.endTime, '%Y-%m-%d') AS endTime, project.maxParticipantAmount, project.gitHubLink, project.majorID, projectStatus, CONCAT(user.surname, ' ', user.forename) AS user, COUNT(PARTICIPATE.userID) AS NumberOfUsers, majorName FROM citrosweb.project, citrosweb.user, citrosweb.participate, citrosweb.major where project.projectOwner = user.userID and participate.projectID = project.projectID and major.majorID = project.majorID and projectName like ? group by project.projectID order by startTime desc", ["%" + projectName + "%"], function(err, res) {

        if(err){
            //console.log("error: ", projectName);
            results(null, err);
        }
        else{
            //console.log("project: ", res);
            results(null, res);
        }
    });
};

Project.getProjectSortedByDateDESC = function getProjectSortedByDateDESC(results) {
    db.query("SELECT project.projectID, project.projectName, project.projectOwner, project.description, DATE_FORMAT(project.startTime, '%Y-%m-%d') AS startTime, DATE_FORMAT(project.endTime, '%Y-%m-%d') AS endTime, project.maxParticipantAmount, project.gitHubLink, project.majorID, projectStatus, CONCAT(user.surname, ' ', user.forename) AS user, COUNT(PARTICIPATE.userID) AS NumberOfUsers, majorName FROM citrosweb.project, citrosweb.user, citrosweb.participate, citrosweb.major where project.projectOwner = user.userID and participate.projectID = project.projectID and major.majorID = project.majorID group by project.projectID order by startTime desc", function(err, res) {

        if(err){
            //console.log("error: ", projectName);
            results(null, err);
        }
        else{
            //console.log("project: ", res);
            results(null, res);
        }
    });
};

Project.getOwnedProject = function getOwnedProject(userID, results) {
    db.query("SELECT project.projectID, project.projectName, project.projectOwner, project.description, DATE_FORMAT(project.startTime, '%Y-%m-%d') AS startTime, DATE_FORMAT(project.endTime, '%Y-%m-%d') AS endTime, project.maxParticipantAmount, project.gitHubLink, project.majorID, projectStatus, CONCAT(user.surname, ' ', user.forename) AS user, COUNT(PARTICIPATE.userID) AS NumberOfUsers, majorName FROM citrosweb.project, citrosweb.user, citrosweb.participate, citrosweb.major where project.projectOwner = user.userID and participate.projectID = project.projectID and major.majorID = project.majorID and project.projectOwner = ? group by project.projectID;", userID, function(err, res) {

        if(err){
            //console.log("error: ", projectName);
            results(null, err);
        }
        else{
            //console.log("project: ", res);
            results(null, res);
        }
    });
};

Project.getAllFinishedProjects = function getAllFinishedProjects(results) {
    db.query("SELECT project.projectID, project.projectName, project.projectOwner, project.description, DATE_FORMAT(project.startTime, '%Y-%m-%d') AS startTime, DATE_FORMAT(project.endTime, '%Y-%m-%d') AS endTime, project.maxParticipantAmount, project.gitHubLink, projectStatus, major.majorID, major.majorName, CONCAT(user.surname, ' ', user.forename) AS user FROM citrosweb.project, citrosweb.user, citrosweb.major where project.projectOwner = user.userID and project.majorID = major.majorID and projectStatus = 'Đã hoàn thành' group by project.projectID order by project.projectID;", function(err, res) {

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

Project.getAllFinishedProjectsSortedByName = function getAllFinishedProjectsSortedByName(projectName, results) {
    db.query("SELECT project.projectID, project.projectName, project.projectOwner, project.description, DATE_FORMAT(project.startTime, '%Y-%m-%d') AS startTime, DATE_FORMAT(project.endTime, '%Y-%m-%d') AS endTime, project.maxParticipantAmount, project.gitHubLink, projectStatus, major.majorID, major.majorName, CONCAT(user.surname, ' ', user.forename) AS user FROM citrosweb.project, citrosweb.user, citrosweb.major where project.projectOwner = user.userID and project.majorID = major.majorID and projectStatus = 'Đã hoàn thành' and project.projectName like ? group by project.projectID order by project.projectID;", ["%" + projectName + "%"], function(err, res) {

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

Project.getAllUnfinishedProjects = function getAllUnfinishedProjects(results) {
    db.query("SELECT project.projectID, project.projectName, project.projectOwner, project.description, DATE_FORMAT(project.startTime, '%Y-%m-%d') AS startTime, DATE_FORMAT(project.endTime, '%Y-%m-%d') AS endTime, project.maxParticipantAmount, project.gitHubLink, projectStatus, major.majorID, major.majorName, CONCAT(user.surname, ' ', user.forename) AS user FROM citrosweb.project, citrosweb.user, citrosweb.major where project.projectOwner = user.userID and project.majorID = major.majorID and projectStatus = 'Chưa hoàn thành' group by project.projectID order by project.projectID;", function(err, res) {

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

Project.getAllUnfinishedProjectsSortedByName = function getAllUnfinishedProjectsSortedByName(projectName, results) {
    db.query("SELECT project.projectID, project.projectName, project.projectOwner, project.description, DATE_FORMAT(project.startTime, '%Y-%m-%d') AS startTime, DATE_FORMAT(project.endTime, '%Y-%m-%d') AS endTime, project.maxParticipantAmount, project.gitHubLink, projectStatus, major.majorID, major.majorName, CONCAT(user.surname, ' ', user.forename) AS user FROM citrosweb.project, citrosweb.user, citrosweb.major where project.projectOwner = user.userID and project.majorID = major.majorID and projectStatus = 'Chưa hoàn thành' and project.projectName like ? group by project.projectID order by project.projectID;", ["%" + projectName + "%"], function(err, res) {

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

Project.getNumberOfProjectsInYear = function getNumberOfProjectsInYear(year, results) {
    db.query("SELECT COUNT(distinct projectID) AS total FROM citrosweb.project where year(startTime) = ?;", year, function(err, res) {

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

Project.getNumberOfProjectsOwned = function getNumberOfProjectsOwned(userID, results) {
    db.query("SELECT COUNT(distinct projectID) AS total FROM citrosweb.project where project.projectOwner = ?;", userID, function(err, res) {

        if(err){
            //console.log("error: ", projectName);
            results(null, err);
        }
        else{
            //console.log("project: ", res);
            results(null, res);
        }
    });
};

Project.getNumberOfProjects = function getNumberOfProjects(results) {
    db.query("SELECT COUNT(distinct projectID) AS total FROM citrosweb.project;", function(err, res) {

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

Project.getProjectsAfterYear = function getProjectsAfterYear(results) {
    db.query("SELECT year(startTime) as year, COUNT(distinct projectID) AS total FROM citrosweb.project group by year(startTime);", function(err, res) {

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

Project.getNumberOfUnfinishedProjectsInYear = function getNumberOfUnfinishedProjectsInYear(year, results) {
    db.query("SELECT COUNT(distinct projectID) AS inprogress FROM citrosweb.project where projectStatus = 'Chưa hoàn thành' and year(startTime) = ?;", year, function(err, res) {

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

Project.getNumberOfUnfinishedProjects = function getNumberOfUnfinishedProjects(results) {
    db.query("SELECT COUNT(distinct projectID) AS inprogress FROM citrosweb.project where projectStatus = 'Chưa hoàn thành';", function(err, res) {

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

Project.getNumberOfFinishedProjectsInYear = function getNumberOfFinishedProjectsInYear(year, results) {
    db.query("SELECT COUNT(distinct projectID) AS completed FROM citrosweb.project where projectStatus = 'Đã hoàn thành' and year(startTime) = ?;", year, function(err, res) {

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

Project.getNumberOfFinishedProjects = function getNumberOfFinishedProjects(results) {
    db.query("SELECT COUNT(distinct projectID) AS completed FROM citrosweb.project where projectStatus = 'Đã hoàn thành';", function(err, res) {

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

Project.getNumberOfLikedProjects = function getNumberOfLikedProjects(projectID, results) {
    db.query("SELECT COUNT(distinct starredproject.userID) AS liked FROM citrosweb.starredproject, citrosweb.project where project.projectID = starredproject.projectID and project.projectID = ?;", projectID, function(err, res) {

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

module.exports = Project;