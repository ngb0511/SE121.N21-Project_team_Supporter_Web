const db = require('../config/db-config');
const Participate = require('../model/Participate');

class ParticipateController {
    getAllParticipant(req, res) {       
        const filters = req.params.projectID;
        //console.log(filters);
        Participate.getAllParticipant(filters, function (err, participate)  {
            if (err) {
                res.send(err);
            }
            //console.log(participate)
            res.json(participate);
        })
        
    }

    getAllJoinedProject(req, res) {       
        const filters = req.params.userID;
        //console.log(filters);
        Participate.getAllJoinedProject(filters, function (err, participate)  {
            if (err) {
                res.send(err);
            }
            //console.log(participate)
            res.json(participate);
        })
        
    }

    getFinishedProject(req, res) {       
        const filters = req.params.userID;
        //console.log(filters);
        Participate.getFinishedProject(filters, function (err, participate)  {
            if (err) {
                res.send(err);
            }
            //console.log(participate)
            res.json(participate);
        })
        
    }

    getUnfinishedProject(req, res) {       
        const filters = req.params.userID;
        //console.log(filters);
        Participate.getUnfinishedProject(filters, function (err, participate)  {
            if (err) {
                res.send(err);
            }
            //console.log(participate)
            res.json(participate);
        })
        
    }

    addParticipate(req, res) {
        var newParticipate = new Participate();
        Object.assign(newParticipate, req.body);
        const userID = req.params.userID;

        try {
            //console.log(newParticipate);
            if (newParticipate.userID == null) {
    
                res.status(400).send({ error: true, message: 'Please provide user' });
            }
            else {
                Participate.addParticipate(userID, newParticipate, function (err, participate) {
                    if (err) {
                        res.send(err);
                    }
                    res.json(participate);
                })
            }
        }
        catch (err) {
            
        }
    }

    deleteParticipate(req, res) {
        // var newParticipate = new Participate();
        // Object.assign(newParticipate, req.body);
        const userID = req.params.userID;

        try {
            Participate.deleteParticipate(userID, function (err, participate) {
                if (err) {
                    res.send(err);
                }
                res.json(participate);
            })
        }
        catch (err) {
            
        }
    }

    updateRate(req, res) {
        var newParticipate = new Participate();
        Object.assign(newParticipate, req.body);

        try {
            if (newParticipate.userID == null) {

                res.status(400).send({ error: true, message: 'Please provide user' });
            }
            else {
                Participate.updateRate(newParticipate, function (err, participate) {
                    if (err) {
                        res.send(err);
                    }
                    res.json(participate);
                })
            }
        }
        catch (err) {
            
        }
    }

    checkExistedParticipate(req, res) {       
        var newParticipate = new Participate();
        Object.assign(newParticipate, req.body);

        //console.log(filters);
        Participate.checkExistedParticipate(newParticipate, function (err, checkExist)  {
            if (err) {
                res.send(err);
            }
            //console.log(checkExist)
            res.json(checkExist);
        })
        
    }

    getNumberOfProjects(req, res) {       
        const filters = req.params.userID;
        //console.log(filters);
        Participate.getNumberOfProjects(filters, function (err, total)  {
            if (err) {
                res.send(err);
            }
            //console.log(participate)
            res.json(total);
        })
        
    }

    getTotalNumberOfProjectJoined(req, res) {       
        const filters = req.params.userID;
        //console.log(filters);
        Participate.getTotalNumberOfProjectJoined(filters, function (err, total)  {
            if (err) {
                res.send(err);
            }
            //console.log(participate)
            res.json(total);
        })
        
    }

    getNumberOfUnfinishedProjects(req, res) {       
        const filters = req.params.userID;
        //console.log(filters);
        Participate.getNumberOfUnfinishedProjects(filters, function (err, inprogress)  {
            if (err) {
                res.send(err);
            }
            //console.log(participate)
            res.json(inprogress);
        })
        
    }

    getNumberOfFinishedProjects(req, res) {       
        const filters = req.params.userID;
        //console.log(filters);
        Participate.getNumberOfFinishedProjects(filters, function (err, completed)  {
            if (err) {
                res.send(err);
            }
            //console.log(participate)
            res.json(completed);
        })
        
    }

    getNumberOfUnfinishedProjectsInYear(req, res) {       
        const filters = req.params.year;
        var newParticipate = new Participate();
        Object.assign(newParticipate, req.body);

        //console.log(filters);
        Participate.getNumberOfUnfinishedProjectsInYear(filters, newParticipate.userID, function (err, inprogress)  {
            if (err) {
                res.send(err);
            }
            //console.log(participate)
            res.json(inprogress);
        })
        
    }

    getNumberOfFinishedProjectsInYear(req, res) {       
        const filters = req.params.year;
        var newParticipate = new Participate();
        Object.assign(newParticipate, req.body);

        //console.log(filters);
        Participate.getNumberOfFinishedProjectsInYear(filters, newParticipate.userID, function (err, completed)  {
            if (err) {
                res.send(err);
            }
            //console.log(participate)
            res.json(completed);
        })
        
    }
}

module.exports = new ParticipateController();