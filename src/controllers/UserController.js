const db = require('../config/db-config');
const User = require('../model/User');

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
        console.log(newUser);
        if (newUser.userID == null) {

            res.status(400).send({ error: true, message: 'Please provide user' });
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

    getUserSortedByName(req, res) {       
        const filters = req.params.userName;
        console.log(filters);
        User.getUserSortedByName(filters, function (err, user)  {
            if (err) {
                res.send(err);
            }
            console.log(user)
            res.json(user);
        })
        
    }

    uploadAvatar(req, res) {
        var newUser = req.body;
        Object.assign(newUser, req.body);
        var userID = req.params.userID;
        console.log(newUser);
        User.uploadAvatar(newUser.avatar, userID, function (err, user) {
            if (err) {
                res.send(err);
            }
            res.json(user);
        })
    }
}

module.exports = new UserController();