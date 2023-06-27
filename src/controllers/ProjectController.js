const db = require('../config/db-config');
const Project = require('../model/Project');

class ProjectController {
    listAllProjects(req, res) {
        Project.getAllProjects((err, project) => {
            if (err) {
                res.send(err);
            }
            res.send(project);
        })
    }

    getAllFinishedProjects(req, res) {
        Project.getAllFinishedProjects((err, project) => {
            if (err) {
                res.send(err);
            }
            res.send(project);
        })
    }

    getAllFinishedProjectsSortedByName(req, res) {       
        const filters = req.params.projectName;
        //console.log(filters);
        Project.getAllFinishedProjectsSortedByName(filters, function (err, project)  {
            if (err) {
                res.send(err);
            }
            //console.log(registrant)
            res.json(project);
        })
        
    }

    getAllUnfinishedProjects(req, res) {
        Project.getAllUnfinishedProjects((err, project) => {
            if (err) {
                res.send(err);
            }
            res.send(project);
        })
    }

    getAllUnfinishedProjectsSortedByName(req, res) {       
        const filters = req.params.projectName;
        //console.log(filters);
        Project.getAllUnfinishedProjectsSortedByName(filters, function (err, project)  {
            if (err) {
                res.send(err);
            }
            //console.log(registrant)
            res.json(project);
        })
        
    }

    getMaxProjectID(req, res) {
        Project.getMaxProjectID((err, projectID) => {
            if (err) {
                res.send(err);
            }
            res.send(projectID);
        })
    }  

    getAllRegistrants(req, res) {       
        const filters = req.params.projectID;
        //console.log(filters);
        Project.getAllRegistrants(filters, function (err, registrant)  {
            if (err) {
                res.send(err);
            }
            //console.log(registrant)
            res.json(registrant);
        })
        
    }

    getAllProjectMajors(req, res) {       
        const filters = req.params.projectID;
        //console.log(filters);
        Project.getAllProjectMajors(filters, function (err, major)  {
            if (err) {
                res.send(err);
            }
            //console.log(major)
            res.json(major);
        })
        
    }

    addProject(req, res) {
        var newProject = new Project();
        Object.assign(newProject, req.body);
        //console.log(newProject);
        if (newProject.projectID == null) {

            res.status(400).send({ error: true, message: 'Please provide project' });
        }
        else {
            newProject.projectStatus = 'Chưa hoàn thành';
            Project.addProject(newProject, function (err, id) {
                if (err) {
                    res.send(err);
                }
                res.json(id);
            })
        }
    }

    addStarredProject(req, res) {
        var newProject = new Project();
        Object.assign(newProject, req.body);

        const userID = req.params.userID;
        //console.log(newProject);
        if (newProject.projectID == null) {

            res.status(400).send({ error: true, message: 'Please provide project' });
        }
        else {
            Project.addStarredProject(userID, newProject.projectID, function (err, project) {
                if (err) {
                    res.send(err);
                }
                res.json(project);
            })
        }
    }

    checkExistedStarred(req, res) {
        var newProject = new Project();
        Object.assign(newProject, req.body);

        const userID = req.params.userID;
        Project.checkExistedStarred(userID, newProject.projectID, function (err, checkExist)  {
            if (err) {
                res.send(err);
            }
            //console.log(checkExist)
            res.json(checkExist);
        })
    }

    deleteStarredProject(req, res) {
        var newProject = new Project();
        Object.assign(newProject, req.body);
        var userID = req.params.userID;
        //console.log(newProject);

        Project.deleteStarredProject(userID, newProject.projectID, function (err, project) {
            if (err) {
                res.send(err);
            }
            res.json(project);
        })
    }

    deleteAllStarredProjectOfUser(req, res) {
        var userID = req.params.userID;
        //console.log(newProject);

        Project.deleteAllStarredProjectOfUser(userID, function (err, project) {
            if (err) {
                res.send(err);
            }
            res.json(project);
        })
    }

    addParticipate(req, res) {
        var newProject = new Project();
        Object.assign(newProject, req.body);
        var userID = req.params.userID;
        //console.log(newProject);

        if (newProject.projectID == null) {

            res.status(400).send({ error: true, message: 'Please provide project' });
        }
        else {
            Project.addParticipate(userID, newProject.projectID, function (err, participate) {
                if (err) {
                    res.send(err);
                }
                res.json(participate);
            })
        }
    }
    
    deleteParticipate(req, res) {
        var newProject = new Project();
        Object.assign(newProject, req.body);
        var userID = req.params.userID;
        //console.log(newProject);

        Project.deleteParticipate(userID, newProject.projectID, function (err, participate) {
            if (err) {
                res.send(err);
            }
            res.json(participate);
        })
    }

    deleteAllParticipateOfUser(req, res) {
        var userID = req.params.userID;
        //console.log(newProject);

        Project.deleteAllParticipateOfUser(userID, function (err, participate) {
            if (err) {
                res.send(err);
            }
            res.json(participate);
        })
    }

    deleteAllParticipateOfProject(req, res) {
        var projectID = req.params.projectID;
        //console.log(newProject);

        Project.deleteAllParticipateOfProject(projectID, function (err, participate) {
            if (err) {
                res.send(err);
            }
            res.json(participate);
        })
    }

    addParticipateWhenCreateProject(req, res) {
        var newProject = new Project();
        Object.assign(newProject, req.body);
        //console.log(newProject);

        if (newProject.projectID == null) {

            res.status(400).send({ error: true, message: 'Please provide project' });
        }
        else {
            Project.addParticipateWhenCreateProject(newProject.projectOwner, newProject.projectID, function (err, project) {
                if (err) {
                    res.send(err);
                }
                res.json(project);
            })
        }
    }

    updateProject(req, res) {
        var newProject = new Project();
        Object.assign(newProject, req.body);
        var projectID = req.params.projectID;
        //console.log(newProject);
        Project.updateProject(newProject, projectID, function (err, project) {
            if (err) {
                res.send(err);
            }
            res.json(project);
        })
    }

    updateProjectOwner(req, res) {
        var userID = req.params.userID;
        //console.log(newProject);
        Project.updateProjectOwner(userID, function (err, id) {
            if (err) {
                res.send(err);
            }
            res.json(id);
        })
    }

    deleteProject(req, res) {
        var projectID = req.params.projectID;
        Project.deleteProject(projectID, function (err, project) {
            if (err) {
                res.send(err);
            }
            res.json(project);
        })
    }

    getProjectSortedByName(req, res) {       
        const filters = req.params.projectName;
        //console.log(filters);
        Project.getProjectSortedByName(filters, function (err, project)  {
            if (err) {
                res.send(err);
            }
            //console.log(project)
            res.json(project);
        })
        
    }

    getProjectSortedByID(req, res) {       
        const filters = req.params.projectID;
        //console.log(filters);
        Project.getProjectSortedByID(filters, function (err, project)  {
            if (err) {
                res.send(err);
            }
            //console.log(project)
            res.json(project);
        })
        
    }

    getMatchedProject(req, res) {       
        const filters = req.params.userID;
        //console.log(filters);
        Project.getMatchedProject(filters, function (err, project)  {
            if (err) {
                res.send(err);
            }
            //console.log(project)
            res.json(project);
        })
        
    }

    getStarredProject(req, res) {       
        const filters = req.params.userID;
        //console.log(filters);
        Project.getStarredProject(filters, function (err, project)  {
            if (err) {
                res.send(err);
            }
            //console.log(project)
            res.json(project);
        })
        
    }

    getProjectSortedByNameAndDateASC(req, res) {       
        const filters = req.params.projectName;
        //console.log(filters);
        Project.getProjectSortedByNameAndDateASC(filters, function (err, project)  {
            if (err) {
                res.send(err);
            }
            //console.log(project)
            res.json(project);
        })
        
    }

    getProjectSortedByNameAndDateDESC(req, res) {       
        const filters = req.params.projectName;
        //console.log(filters);
        Project.getProjectSortedByNameAndDateDESC(filters, function (err, project)  {
            if (err) {
                res.send(err);
            }
            //console.log(project)
            res.json(project);
        })
        
    }

    getProjectSortedByDateASC(req, res) {
        Project.getProjectSortedByDateASC((err, project) => {
            if (err) {
                res.send(err);
            }
            res.send(project);
        })
    }

    getProjectSortedByDateDESC(req, res) {
        Project.getProjectSortedByDateDESC((err, project) => {
            if (err) {
                res.send(err);
            }
            res.send(project);
        })
    }    

    getOwnedProject(req, res) {       
        const filters = req.params.userID;
        //console.log(filters);
        Project.getOwnedProject(filters, function (err, project)  {
            if (err) {
                res.send(err);
            }
            //console.log(project)
            res.json(project);
        })
        
    }

    getNumberOfProjectsOwned(req, res) {       
        const filters = req.params.userID;
        //console.log(filters);
        Project.getNumberOfProjectsOwned(filters, function (err, project)  {
            if (err) {
                res.send(err);
            }
            //console.log(project)
            res.json(project);
        })
        
    }

    getAllRegistrants(req, res) {       
        const filters = req.params.projectID;
        //console.log(filters);
        Project.getAllRegistrants(filters, function (err, registrant)  {
            if (err) {
                res.send(err);
            }
            //console.log(registrant)
            res.json(registrant);
        })
        
    }

    getNumberOfProjects(req, res) {
        Project.getNumberOfProjects((err, total) => {
            if (err) {
                res.send(err);
            }
            res.send(total);
        })
    }

    getProjectsAfterYear(req, res) {
        Project.getProjectsAfterYear((err, total) => {
            if (err) {
                res.send(err);
            }
            res.send(total);
        })
    }

    getNumberOfProjectsInYear(req, res) {
        const filters = req.params.year;

        Project.getNumberOfProjectsInYear(filters, (err, total) => {
            if (err) {
                res.send(err);
            }
            res.send(total);
        })
    }

    getNumberOfUnfinishedProjects(req, res) {
        Project.getNumberOfUnfinishedProjects((err, inprogress) => {
            if (err) {
                res.send(err);
            }
            res.send(inprogress);
        })
    }

    getNumberOfUnfinishedProjectsInYear(req, res) {
        const filters = req.params.year;

        Project.getNumberOfUnfinishedProjectsInYear(filters, (err, inprogress) => {
            if (err) {
                res.send(err);
            }
            res.send(inprogress);
        })
    }

    getNumberOfFinishedProjects(req, res) {
        Project.getNumberOfFinishedProjects((err, completed) => {
            if (err) {
                res.send(err);
            }
            res.send(completed);
        })
    }

    getNumberOfFinishedProjectsInYear(req, res) {
        const filters = req.params.year;

        Project.getNumberOfFinishedProjectsInYear(filters, (err, completed) => {
            if (err) {
                res.send(err);
            }
            res.send(completed);
        })
    }

    getNumberOfLikedProjects(req, res) {       
        const filters = req.params.projectID;
        //console.log(filters);
        Project.getNumberOfLikedProjects(filters, function (err, liked)  {
            if (err) {
                res.send(err);
            }
            //console.log(participate)
            res.json(liked);
        })
        
    }
    
}

module.exports = new ProjectController();