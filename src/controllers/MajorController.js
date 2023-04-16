const db = require('../config/db-config');
const Major = require('../model/Major');

class MajorController {
    listAllMajors(req, res) {
        Major.getAllMajor((err, major) => {
            if (err) {
                res.send(err);
            }
            res.send(major);
        })
    }

    addMajor(req, res) {
        var newMajor = new Major();
        Object.assign(newMajor, req.body);
        console.log(newMajor);
        Major.addMajor(newMajor, function (err, major) {
            if (err) {
                res.send(err);
            }
            res.json(major);
        })
    }
}

module.exports = new MajorController();