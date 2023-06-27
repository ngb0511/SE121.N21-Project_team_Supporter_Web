const db = require('../config/db-config');
const ProjectFile = require('../model/ProjectFile');
const multer  = require('multer');
const fs = require('fs');
const path = require('path');

const fileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../citrosBackend/src/files');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

class ProjectFileController {
    getAllFiles(req, res) { 
        const filters = req.params.projectID;
        //console.log(filters);
        ProjectFile.getAllFiles(filters, function (err, files)  {
            if (err) {
                res.send(err);
            }
            //console.log(account)
            res.json(files);
        })
        
    }

    addProjectFile(req, res) {
        // var newFile = new ProjectFile();
        // Object.assign(newFile, req.body);
        const projectID = req.params.projectID;

        const upload = multer({ storage: fileStorage }).single('file');

        upload(req, res, function (err) {
           if (err instanceof multer.MulterError) {
              res.send(err);
           } else if (err) {
            res.send(err);
            } else {
                //console.log(req.file.path);
                ProjectFile.addProjectFile(req.file.path, projectID, function(err, file) {
               //res.render('upload-form',{alertMsg:data})
               if (err) {
                    res.send(err);
                }
                res.json(file);
             })
           }
           
        })
    }

    updateProjectFile(req, res) {
        // var newFile = new ProjectFile();
        // Object.assign(newFile, req.body);

        const fileID = req.params.fileID;

        const upload = multer({ storage: fileStorage }).single('file');

        upload(req, res, function (err) {
           if (err instanceof multer.MulterError) {
              res.send(err);
           } else if (err) {
            res.send(err);
            } else {
                //console.log(req.file.path);
                //newFile.fileLink = req.file.path;
                ProjectFile.updateProjectFile(req.file.path, fileID, function(err, file) {
               //res.render('upload-form',{alertMsg:data})
               if (err) {
                    res.send(err);
                }
                res.json(file);
             })
           }
           
        })
    }

    deleteProjectFile(req, res) {
        var newFile = new ProjectFile();
        Object.assign(newFile, req.body);

        var fileID = req.params.fileID;

        try {
            fs.unlinkSync(newFile.file);
        } catch (error){}

        // ProjectFile.deleteProjectFile(fileID, function (err, file) {
        //     if (err) {
        //         res.send(err);
        //     }
        //     res.json(file);
        // })
    }
    
}

module.exports = new ProjectFileController();