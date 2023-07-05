const db = require('../config/db-config');

const Report = function(report) {
    this.reportID = Report.reportID;
    this.userID = Report.userID;
    this.projectID = Report.projectID;
    this.reason = Report.reason;
}

Report.getAllReports = function getAllReports(results) {
    db.query("SELECT report.*, projectName FROM citrosweb.report, citrosweb.project where report.projectID = project.projectID;", function(err, res) {

        if(err){
            //console.log("error: ", err);
            results(null, err);
        }
        else{
            //console.log("Major: ", res);
            results(null, res);
        }
    });
};

Report.addReport = function addReport(newReport, results) {
    db.query("INSERT INTO REPORT (userID, projectID, reason) VALUES (?, ?, ?)", [newReport.userID, newReport.projectID, newReport.reason], function(err, res) {

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

Report.deleteReport = function deleteReport(reportID, results) {
    db.query("DELETE FROM REPORT WHERE reportID = ?", reportID, function(err, res) {

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

module.exports = Report;