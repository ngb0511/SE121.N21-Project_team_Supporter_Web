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
        
        try {
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
        catch (err) {
            
        }
    }

    updateUser(req, res) {
        var newUser = new User();
        //console.log(req.body);
        Object.assign(newUser, req.body);
        var userID = req.params.userID;
        //console.log(newUser);
        
        try {
            User.updateUser(newUser, userID, function (err, user) {
                if (err) {
                    res.send(err);
                }
                res.json(user);
            })
        }
        catch (err) {
            
        }
    }

    deleteUser(req, res) {
        var userID = req.params.userID;

        try {
            User.deleteUser(userID, function (err, user) {
                if (err) {
                    res.send(err);
                }
                res.json(user);
            })
        }
        catch (err) {
            
        }
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

        try {
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
        catch (err) {
            
        }
    }

    addCV(req, res) {
        const userID = req.params.userID;

        const upload = multer({ storage: fileStorage }).single('CV');

        try {
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
        catch (err) {
            
        }
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