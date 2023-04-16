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

    addProject(req, res) {
        var newProject = new Project();
        Object.assign(newProject, req.body);
        console.log(newProject);
        if (newProject.ProjectID == null) {

            res.status(400).send({ error: true, message: 'Please provide project' });
        }
        else {
            User.addUser(newProject, function (err, project) {
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
        console.log(newProject);
        Project.updateProject(newProject, projectID, function (err, project) {
            if (err) {
                res.send(err);
            }
            res.json(project);
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
        console.log(filters);
        Project.getProjectSortedByName(filters, function (err, project)  {
            if (err) {
                res.send(err);
            }
            console.log(project)
            res.json(project);
        })
        
    }

    getProjectSortedByID(req, res) {       
        const filters = req.params.projectID;
        console.log(filters);
        Project.getProjectSortedByID(filters, function (err, project)  {
            if (err) {
                res.send(err);
            }
            console.log(project)
            res.json(project);
        })
        
    }
}

module.exports = new ProjectController();