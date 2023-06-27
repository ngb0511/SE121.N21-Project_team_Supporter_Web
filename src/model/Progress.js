const db = require('../config/db-config');

const Progress = function(progress) {
    this.progressID = Progress.progressID;
    this.projectID = Progress.projectID;
    this.userID = Progress.userID;
    this.task = Progress.task;
    this.startTime = Progress.startTime;
    this.endTime = Progress.endTime;
    this.taskStatus = Progress.taskStatus;	
    this.notice = Progress.notice;	
}

Progress.getAllProgress = function getAllProgress(projectID, results) {
    db.query("SELECT progress.progressID, progress.projectID, progress.userID, progress.task, DATE_FORMAT(progress.startTime, '%Y-%m-%d') AS startTime, DATE_FORMAT(progress.endTime, '%Y-%m-%d') AS endTime, taskStatus, notice, project.projectName, CONCAT(user.surname, ' ', user.forename) AS user FROM citrosweb.project, citrosweb.progress, citrosweb.user where project.projectID = progress.projectID and progress.userID = user.userID and progress.projectID = ? order by progressID;", projectID, function(err, res) {

        if(err){
            //console.log("error: ", err);
            results(null, err);
        }
        else{
            //console.log("progress: ", res);
            results(null, res);
        }
    });
};

Progress.addProgress = function addProgress(projectID, newProgress, results) {
    db.query("INSERT INTO PROGRESS (projectID, userID, task, startTime, endTime, taskStatus, notice) VALUES (?, ?, ?, ?, ?, ?, ?)", [projectID, newProgress.userID, newProgress.task, newProgress.startTime, newProgress.endTime, newProgress.taskStatus, newProgress.notice], function(err, res) {

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

Progress.updateProgress = function updateProgress(updatedProgress, progressID, results) {
    db.query("UPDATE PROGRESS SET userID = ?, task = ?, startTime = ?, endTime = ? , taskStatus = ?, notice = ? where progressID = ?;", [updatedProgress.userID,updatedProgress.task, updatedProgress.startTime, updatedProgress.endTime, updatedProgress.taskStatus, updatedProgress.notice, progressID], function(err, res) {

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

Progress.updateProgressUser = function updateProgressUser(userID, results) {
    db.query("UPDATE PROGRESS SET userID = '1' where userID = ?;", userID, function(err, res) {

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


Progress.deleteProgress= function deleteProgress(progressID, results) {
    db.query("DELETE FROM PROGRESS WHERE progressID = ?", progressID, function(err, res) {

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

Progress.getProgressSortedByName = function getProgressSortedByName(projectName, results) {   
    db.query("SELECT progress.progressID, progress.projectID, progress.userID, progress.task, DATE_FORMAT(progress.startTime, '%Y-%m-%d') AS startTime, DATE_FORMAT(progress.endTime, '%Y-%m-%d') AS endTime, taskStatus, notice, project.projectName, CONCAT(user.surname, ' ', user.forename) AS user FROM citrosweb.project, citrosweb.progress, citrosweb.user where project.projectID = progress.projectID and progress.userID = user.userID and project.projectName like ? order by progressID;", ["%" + projectName + "%"], function(err, res) {

        if(err){
            //console.log("error: ", projectName);
            results(null, err);
        }
        else{
            //console.log("progress: ", res);
            results(null, res);
        }
    });
};

Progress.getProgressSortedByID = function getProgressSortedByID(progressID, results) {   
    db.query("SELECT progress.progressID, progress.projectID, progress.userID, progress.task, DATE_FORMAT(progress.startTime, '%Y-%m-%d') AS startTime, DATE_FORMAT(progress.endTime, '%Y-%m-%d') AS endTime, taskStatus, notice, project.projectName, CONCAT(user.surname, ' ', user.forename) AS user FROM citrosweb.project, citrosweb.progress, citrosweb.user where project.projectID = progress.projectID and progress.userID = user.userID and progress.progressID = ? order by progressID;", progressID, function(err, res) {

        if(err){
            //console.log("error: ", progressID);
            results(null, err);
        }
        else{
            //console.log("progress: ", res);
            results(null, res);
        }
    });
};

Progress.getDoneTasks = function getDoneTasks(projectID, results) {   
    db.query("SELECT progress.progressID, progress.projectID, progress.userID, progress.task, DATE_FORMAT(progress.startTime, '%Y-%m-%d') AS startTime, DATE_FORMAT(progress.endTime, '%Y-%m-%d') AS endTime, taskStatus, notice, project.projectName, CONCAT(user.surname, ' ', user.forename) AS user FROM citrosweb.project, citrosweb.progress, citrosweb.user where project.projectID = progress.projectID and progress.userID = user.userID and progress.projectID = ? and taskStatus = 'Đã hoàn thành' order by progressID", projectID, function(err, res) {

        if(err){
            //console.log("error: ", projectID);
            results(null, err);
        }
        else{
            //console.log("progress: ", res);
            results(null, res);
        }
    });
};

Progress.getUndoneTasks = function getUndoneTasks(projectID, results) {   
    db.query("SELECT progress.progressID, progress.projectID, progress.userID, progress.task, DATE_FORMAT(progress.startTime, '%Y-%m-%d') AS startTime, DATE_FORMAT(progress.endTime, '%Y-%m-%d') AS endTime, taskStatus, notice, project.projectName, CONCAT(user.surname, ' ', user.forename) AS user FROM citrosweb.project, citrosweb.progress, citrosweb.user where project.projectID = progress.projectID and progress.userID = user.userID and progress.projectID = ? and taskStatus = 'Chưa hoàn thành' order by progressID", projectID, function(err, res) {

        if(err){
            //console.log("error: ", projectID);
            results(null, err);
        }
        else{
            //console.log("progress: ", res);
            results(null, res);
        }
    });
};

Progress.getDelayedTasks = function getDelayedTasks(projectID, results) {   
    db.query("SELECT progress.progressID, progress.projectID, progress.userID, progress.task, DATE_FORMAT(progress.startTime, '%Y-%m-%d') AS startTime, DATE_FORMAT(progress.endTime, '%Y-%m-%d') AS endTime, taskStatus, notice, project.projectName, CONCAT(user.surname, ' ', user.forename) AS user FROM citrosweb.project, citrosweb.progress, citrosweb.user where project.projectID = progress.projectID and progress.userID = user.userID and progress.projectID = ? and taskStatus = 'Hoãn' order by progressID", projectID, function(err, res) {

        if(err){
            //console.log("error: ", projectID);
            results(null, err);
        }
        else{
            //console.log("progress: ", res);
            results(null, res);
        }
    });
};

Progress.getProgressSortedByID = function getProgressSortedByID(progressID, results) {
    db.query("SELECT progress.progressID, progress.projectID, progress.userID, progress.task, DATE_FORMAT(progress.startTime, '%Y-%m-%d') AS startTime, DATE_FORMAT(progress.endTime, '%Y-%m-%d') AS endTime, taskStatus, notice, project.projectName, CONCAT(user.surname, ' ', user.forename) AS user FROM citrosweb.project, citrosweb.progress, citrosweb.user where project.projectID = progress.projectID and progress.userID = user.userID and progressID = ? order by progressID", progressID, function(err, res) {

        if(err){
            //console.log("error: ", progressID);
            results(null, err);
        }
        else{
            //console.log("progress: ", res);
            results(null, res);
        }
    });
};

Progress.getProgressSortedByNameAndDateASC = function getProgressSortedByNameAndDateASC(progressName, results) {
    db.query("SELECT progress.progressID, progress.projectID, progress.userID, progress.task, DATE_FORMAT(progress.startTime, '%Y-%m-%d') AS startTime, DATE_FORMAT(progress.endTime, '%Y-%m-%d') AS endTime, progres, taskStatus, notice, project.projectName, CONCAT(user.surname, ' ', user.forename) AS user FROM citrosweb.project, citrosweb.progress, citrosweb.user where project.projectID = progress.projectID and progress.userID = user.userID and project.projectName like ? order by startTime asc", ["%" + progressName + "%"], function(err, res) {

        if(err){
            //console.log("error: ", progressName);
            results(null, err);
        }
        else{
            //console.log("progress: ", res);
            results(null, res);
        }
    });
};

Progress.getProgressSortedByDateASC = function getProgressSortedByDateASC(results) {
    db.query("SELECT progress.progressID, progress.projectID, progress.userID, progress.task, DATE_FORMAT(progress.startTime, '%Y-%m-%d') AS startTime, DATE_FORMAT(progress.endTime, '%Y-%m-%d') AS endTime, progres, taskStatus, notice, project.projectName, CONCAT(user.surname, ' ', user.forename) AS user FROM citrosweb.project, citrosweb.progress, citrosweb.user where project.projectID = progress.projectID and progress.userID = user.userID order by startTime asc", function(err, res) {

        if(err){
            //console.log("error: ", progressName);
            results(null, err);
        }
        else{
            //console.log("progress: ", res);
            results(null, res);
        }
    });
};

Progress.getProgressSortedByNameAndDateDESC = function getProgressSortedByNameAndDateDESC(progressName, results) {
    db.query("SELECT progress.progressID, progress.projectID, progress.userID, progress.task, DATE_FORMAT(progress.startTime, '%Y-%m-%d') AS startTime, DATE_FORMAT(progress.endTime, '%Y-%m-%d') AS endTime, progres, taskStatus, notice, project.projectName, CONCAT(user.surname, ' ', user.forename) AS user FROM citrosweb.project, citrosweb.progress, citrosweb.user where project.projectID = progress.projectID and progress.userID = user.userID and project.projectName like ? order by startTime desc", ["%" + progressName + "%"], function(err, res) {

        if(err){
            //console.log("error: ", progressName);
            results(null, err);
        }
        else{
            //console.log("progress: ", res);
            results(null, res);
        }
    });
};

Progress.getProgressSortedByDateDESC = function getProgressSortedByDateDESC(results) {
    db.query("SELECT progress.progressID, progress.projectID, progress.userID, progress.task, DATE_FORMAT(progress.startTime, '%Y-%m-%d') AS startTime, DATE_FORMAT(progress.endTime, '%Y-%m-%d') AS endTime, progres, taskStatus, notice, project.projectName, CONCAT(user.surname, ' ', user.forename) AS user FROM citrosweb.project, citrosweb.progress, citrosweb.user where project.projectID = progress.projectID and progress.userID = user.userID order by startTime desc", function(err, res) {

        if(err){
            //console.log("error: ", progressName);
            results(null, err);
        }
        else{
            //console.log("progress: ", res);
            results(null, res);
        }
    });
};

module.exports = Progress;