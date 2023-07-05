const db = require('../config/db-config');

const ProjectFile = function(projectFile) {
    this.fileID = ProjectFile.fileID;
    this.projectID = ProjectFile.projectID;
    this.file = ProjectFile.file;
}

ProjectFile.getAllFiles = function getAllFiles(projectID, results) {
    db.query("SELECT projectfile.* FROM citrosweb.projectfile where projectID = ?;", projectID, function(err, res) {

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

ProjectFile.addProjectFile = function addProjectFile(file, projectID, results) {
    db.query("INSERT INTO PROJECTFILE (projectID, file) VALUES (?, ?);", [projectID, file], function(err, res) {

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

ProjectFile.updateProjectFile = function updateProjectFile(fileLink, fileID, results) {
    db.query("UPDATE PROJECTFILE SET file = ? where fileID = ?;", [fileLink, fileID], function(err, res) {

        if(err){
            ////console.log("error: ", err);
            results(err, null);
        }
        else{
            ////console.log(res.insertId);
            results(null, res.insertId);
        }
    });
};

ProjectFile.deleteProjectFile= function deleteProjectFile(fileID, results) {
    db.query("DELETE FROM PROJECTFILE WHERE fileID = ?", fileID, function(err, res) {

        if(err){
            ////console.log("error: ", err);
            results(err, null);
        }
        else{
            ////console.log(res.insertId);
            results(null, res.insertId);
        }
    });
};

module.exports = ProjectFile;