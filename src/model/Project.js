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
}

Project.getAllProjects = function getAllProjects(results) {
    db.query("SELECT * FROM PROJECT", function(err, res) {

        if(err){
            console.log("error: ", err);
            results(null, err);
        }
        else{
            console.log("project: ", res);
            results(null, res);
        }
    });
};

Project.addProject = function addProject(newProject, results) {
    db.query("INSERT INTO PROJECT SET ?", newProject, function(err, res) {

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

Project.updateProject = function updateProject(updatedProject, projectID, results) {
    db.query("UPDATE PROJECT SET projectName = ?, projectOwner = ?, description = ?, startTime = ?, endTime = ?, " +
            "maxParticipantAmount = ?, gitHubLink = ?", [updatedProject.projectName, updatedProject.projectOwner, updatedProject.description, updatedProject.startTime, updatedProject.endTime, updatedProject.maxParticipantAmount, updatedProject.gitHubLink, projectID], function(err, res) {

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

Project.deleteProject= function deleteProject(projectID, results) {
    db.query("DELETE FROM PROJECT WHERE projectID = ?", projectID, function(err, res) {

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

Project.getProjectSortedByName = function getProjectSortedByName(projectName, results) {
    db.query("SELECT * FROM PROJECT where projectName like ?", ["%" + projectName + "%"], function(err, res) {

        if(err){
            console.log("error: ", projectName);
            results(null, err);
        }
        else{
            console.log("project: ", res);
            results(null, res);
        }
    });
};

Project.getProjectSortedByID = function getProjectSortedByID(projectID, results) {
    db.query("SELECT * FROM PROJECT where projectID = ?", projectID, function(err, res) {

        if(err){
            console.log("error: ", projectID);
            results(null, err);
        }
        else{
            console.log("project: ", res);
            results(null, res);
        }
    });
};

module.exports = Project;