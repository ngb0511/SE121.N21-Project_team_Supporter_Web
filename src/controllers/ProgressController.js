const db = require('../config/db-config');
const Progress = require('../model/Progress');

class ProgressController {
    listAllProgress(req, res) {
        const filters = req.params.projectID;
        //console.log(filters);
        Progress.getAllProgress(filters, function (err, progress)  {
            if (err) {
                res.send(err);
            }
            //console.log(progress)
            res.json(progress);
        })
    }

    addProgress(req, res) {
        var newProgress = new Progress();
        Object.assign(newProgress, req.body);
        var projectID = req.params.projectID;
        //console.log(newProgress);
        if (newProgress.progressID == null) {

            res.status(400).send({ error: true, message: 'Please provide project' });
        }
        else {
            Progress.addProgress(projectID, newProgress, function (err, progress) {
                if (err) {
                    res.send(err);
                }
                res.json(progress);
            })
        }
    }

    updateProgress(req, res) {
        var newProgress = new Progress();
        Object.assign(newProgress, req.body);
        var progressID = req.params.progressID;
        //console.log(newProgress);
        Progress.updateProgress(newProgress, progressID, function (err, progress) {
            if (err) {
                res.send(err);
            }
            res.json(progress);
        })
    }

    updateProgressUser(req, res) {
        var userID = req.params.userID;
        //console.log(newProgress);
        Progress.updateProgressUser(userID, function (err, progress) {
            if (err) {
                res.send(err);
            }
            res.json(progress);
        })
    }

    deleteProgress(req, res) {
        var progressID = req.params.progressID;
        Progress.deleteProgress(progressID, function (err, progress) {
            if (err) {
                res.send(err);
            }
            res.json(progress);
        })
    }

    getProgressSortedByName(req, res) {       
        const filters = req.params.projectName;
        //console.log(filters);
        Progress.getProgressSortedByName(filters, function (err, progress)  {
            if (err) {
                res.send(err);
            }
            //console.log(progress)
            res.json(progress);
        })
        
    }

    getProgressSortedByID(req, res) {       
        const filters = req.params.progressID;
        //console.log(filters);
        Progress.getProgressSortedByID(filters, function (err, progress)  {
            if (err) {
                res.send(err);
            }
            //console.log(progress)
            res.json(progress);
        })
        
    }

    getDoneTasks(req, res) {       
        const filters = req.params.projectID;
        //console.log(filters);
        Progress.getDoneTasks(filters, function (err, progress)  {
            if (err) {
                res.send(err);
            }
            //console.log(progress)
            res.json(progress);
        })
        
    }

    getUndoneTasks(req, res) {       
        const filters = req.params.projectID;
        //console.log(filters);
        Progress.getUndoneTasks(filters, function (err, progress)  {
            if (err) {
                res.send(err);
            }
            //console.log(progress)
            res.json(progress);
        })
        
    }

    getDelayedTasks(req, res) {       
        const filters = req.params.projectID;
        //console.log(filters);
        Progress.getDelayedTasks(filters, function (err, progress)  {
            if (err) {
                res.send(err);
            }
            //console.log(progress)
            res.json(progress);
        })
        
    }

    getProgressSortedByID(req, res) {       
        const filters = req.params.progressID;
        //console.log(filters);
        Progress.getProgressSortedByID(filters, function (err, progress)  {
            if (err) {
                res.send(err);
            }
            //console.log(progress)
            res.json(progress);
        })
        
    }

    getProgressSortedByNameAndDateASC(req, res) {       
        const filters = req.params.projectName;
        //console.log(filters);
        Progress.getProgressSortedByNameAndDateASC(filters, function (err, progress)  {
            if (err) {
                res.send(err);
            }
            //console.log(progress)
            res.json(progress);
        })
        
    }

    getProgressSortedByNameAndDateDESC(req, res) {       
        const filters = req.params.projectName;
        //console.log(filters);
        Progress.getProgressSortedByNameAndDateDESC(filters, function (err, progress)  {
            if (err) {
                res.send(err);
            }
            //console.log(progress)
            res.json(progress);
        })
        
    }

    getProgressSortedByDateASC(req, res) {
        Progress.getProgressSortedByDateASC((err, progress) => {
            if (err) {
                res.send(err);
            }
            res.send(progress);
        })
    }

    getProgressSortedByDateDESC(req, res) {
        Progress.getProgressSortedByDateDESC((err, progress) => {
            if (err) {
                res.send(err);
            }
            res.send(progress);
        })
    }
}

module.exports = new ProgressController();