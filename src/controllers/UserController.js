const db = require('../config/db-config');
const User = require('../model/User');
const multer  = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../citrosBackend/src/images');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const fileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../citrosBackend/src/files');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

class UserController {
    listAllUsers(req, res) {
        User.getAllUsers((err, user) => {
            if (err) {
                res.send(err);
            }
            res.send(user);
        })
    }

    addUser(req, res) {
        var newUser = new User();
        Object.assign(newUser, req.body);
        //console.log(newUser);
        if (newUser.email == null) {

            res.status(400).send({ error: true, message: 'Please provide email' });
        }
        else {
            User.addUser(newUser, function (err, user) {
                if (err) {
                    res.send(err);
                }
                res.json(user);
            })
        }
    }

    updateUser(req, res) {
        var newUser = new User();
        //console.log(req.body);
        Object.assign(newUser, req.body);
        var userID = req.params.userID;
        console.log(newUser);
        User.updateUser(newUser, userID, function (err, user) {
            if (err) {
                res.send(err);
            }
            res.json(user);
        })
    }

    deleteUser(req, res) {
        var userID = req.params.userID;
        User.deleteUser(userID, function (err, user) {
            if (err) {
                res.send(err);
            }
            res.json(user);
        })
    }

    getUserSortedByID(req, res) {       
        const filters = req.params.userID;
        //console.log(filters);
        User.getUserSortedByID(filters, function (err, user)  {
            if (err) {
                res.send(err);
            }
            //console.log(user)
            res.json(user);
        })
        
    }

    getUserByID(req, res) {       
        const filters = req.params.userID;
        //console.log(filters);
        User.getUserByID(filters, function (err, user)  {
            if (err) {
                res.send(err);
            }
            //console.log(user)
            res.json(user);
        })
        
    }

    addAvatar(req, res) {
        const userID = req.params.userID;

        const upload = multer({ storage: storage }).single('image');

        upload(req, res, function (err) {
           if (err instanceof multer.MulterError) {
              res.send(err);
           } else if (err) {
            res.send(err);
            } else {
            User.addAvatar(req.file.path, userID, function(err, avatar) {
               //res.render('upload-form',{alertMsg:data})
               if (err) {
                    res.send(err);
                }
                res.json(avatar);
             })
           }
           
        })
    }

    addCV(req, res) {
        const userID = req.params.userID;

        const upload = multer({ storage: fileStorage }).single('CV');

        upload(req, res, function (err) {
           if (err instanceof multer.MulterError) {
              res.send(err);
           } else if (err) {
            res.send(err);
            } else {
                //console.log(req.file.path);
            User.addCV(req.file.path, userID, function(err, file) {
               //res.render('upload-form',{alertMsg:data})
               if (err) {
                    res.send(err);
                }
                res.json(file);
             })
           }
           
        })
    }

    getAvatarSortedByUserID(req, res) {
        const filters = req.params.userID;
        //console.log(filters);
        User.getAvatarSortedByUserID(filters, function (err, avatar)  {
            if (err) {
                res.send(err);
            }
            
            ////console.log()
            res.json(avatar);
        })
        
    }

    getCVSortedByUserID(req, res) {
        const filters = req.params.userID;
        //console.log(filters);
        User.getCVSortedByUserID(filters, function (err, CV)  {
            if (err) {
                res.send(err);
            }
            
            ////console.log()
            res.json(CV);
        })
        
    }
    
}

module.exports = new UserController();