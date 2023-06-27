const db = require('../config/db-config');
const Report = require('../model/Report');

class ReportController {
    getAllReports(req, res) {
        Report.getAllReports((err, report) => {
            if (err) {
                res.send(err);
            }
            res.send(report);
        })
    }

    addReport(req, res) {
        var newReport = new Report();
        Object.assign(newReport, req.body);
        //console.log(newReport);
        Report.addReport(newReport, function (err, report) {
            if (err) {
                res.send(err);
            }
            res.json(report);
        })
    }

    deleteReport(req, res) {
        var reportID = req.params.reportID;
        Report.deleteReport(reportID, function (err, report) {
            if (err) {
                res.send(err);
            }
            res.json(report);
        })
    }
}

module.exports = new ReportController();