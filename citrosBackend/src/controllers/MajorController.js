const db = require('../config/db-config');
const Major = require('../model/Major');

class MajorController {
    getAllMajors(req, res) {
        Major.getAllMajors((err, major) => {
            if (err) {
                res.send(err);
            }
            res.send(major);
        })
    }

    addMajor(req, res) {
        var newMajor = new Major();
        Object.assign(newMajor, req.body);

        try {
            //console.log(newMajor);
            Major.addMajor(newMajor, function (err, major) {
                if (err) {
                    res.send(err);
                }
                res.json(major);
            })
        }
        catch (err) {

        }
    }

    deleteMajor(req, res) {
        var majorID = req.params.majorID;
        
        try {
            Major.deleteMajor(majorID, function (err, major) {
                if (err) {
                    res.send(err);
                }
                res.json(major);
            })
        }
        catch (err) {
            
        }
    }

    checkExistedMajor(req, res) {       
        var newMajor = new Major();
        Object.assign(newMajor, req.body);

        //console.log(filters);
        Major.checkExistedMajor(newMajor.majorName, function (err, checkExist)  {
            if (err) {
                res.send(err);
            }
            //console.log(checkExist)
            res.json(checkExist);
        })
        
    }
}

module.exports = new MajorController();