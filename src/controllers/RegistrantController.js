const db = require('../config/db-config');
const Registrant = require('../model/Registrant');
const nodemailer = require("nodemailer"); // Dùng để gửi mail

class RegistrantController {
    listAllRegistrants(req, res) {
        var projectID = req.params.projectID;
        Registrant.getAllRegistrants(projectID, function (err, registrant) {
            if (err) {
                res.send(err);
            }
            res.send(registrant);
        })
    }

    addRegistrant(req, res) {
        var newRegistrant = new Registrant();
        Object.assign(newRegistrant, req.body);
        //console.log(newRegistrant);
        if (newRegistrant.userID == null) {

            res.status(400).send({ error: true, message: 'Please provide user' });
        }
        else {
            Registrant.addRegistrant(newRegistrant, function (err, registrant) {
                if (err) {
                    res.send(err);
                }
                res.json(registrant);
            })
        }
    }

    // updateRegistrant(req, res) {
    //     var newRegistrant = new Registrant();
    //     //console.log(req.body);
    //     Object.assign(newRegistrant, req.body);
    //     var registrantID = req.params.registrantID;
    //     //console.log(newRegistrant);
    //     Registrant.updateRegistrant(newRegistrant, registrantID, function (err, registrant) {
    //         if (err) {
    //             res.send(err);
    //         }
    //         res.json(registrant);
    //     })
    // }

    // updateIsAcceptedRegistrant(req, res) {
    //     var newRegistrant = new Registrant();
    //     //console.log(req.body);
    //     Object.assign(newRegistrant, req.body);
    //     var registrantID = req.params.registrantID;
    //     //console.log(newRegistrant);
    //     Registrant.updateIsAcceptedRegistrant(newRegistrant.isAccepted, registrantID, function (err, registrant) {
    //         if (err) {
    //             res.send(err);
    //         }
    //         res.json(registrant);
    //     })
    // }

    async sendAcceptedEmail(req, res) {
        var newRegistrant = new Registrant();
        Object.assign(newRegistrant, req.body);
        var email = req.params.email;

        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "citrosweb@gmail.com", // generated ethereal user
              pass: "kfslqqgxvfhjbqwj", // generated ethereal password
            },
          });
        
          // send mail with defined transport object
          await transporter.sendMail({
            from: '"citrosweb@gmail.com', // sender address
            to: `${email}`, // list of receivers
            subject: "Application result notification", // Subject line
            text: "Application result notification", // plain text body
            html: `<b>Your registrant to project [${newRegistrant[0].projectName}] has been accepted!</b>`, // html body
          }, (err) => {
            if (err) {
                res.send(err);
            }
            //res.json(verificationCode);
          });
    }

    // async sendRejectedEmail(req, res) {
    //     var newProject = new Project();
    //     Object.assign(newUser, req.body);
    //     var email = req.params.email;

    //     let transporter = nodemailer.createTransport({
    //         service: "gmail",
    //         auth: {
    //           user: "citrosweb@gmail.com", // generated ethereal user
    //           pass: "kfslqqgxvfhjbqwj", // generated ethereal password
    //         },
    //       });
        
    //       // send mail with defined transport object
    //       await transporter.sendMail({
    //         from: '"citrosweb@gmail.com', // sender address
    //         to: `${email}`, // list of receivers
    //         subject: "Application result notification", // Subject line
    //         text: "Application result notification", // plain text body
    //         html: `<b>Your registrant to project ${newProject.projectName} has been rejected!</b>`, // html body
    //       }, (err) => {
    //         if (err) {
    //             res.send(err);
    //         }
    //         //res.json(verificationCode);
    //       });
    // }

    deleteRegistrant(req, res) {
        var newRegistrant = new Registrant();
        Object.assign(newRegistrant, req.body);
        const userID = req.params.userID;

        Registrant.deleteRegistrant(userID, newRegistrant.projectID, function (err, registrant) {
            if (err) {
                res.send(err);
            }
            res.json(registrant);
        })
    }

    deleteAllRegistrantOfUser(req, res) {
        const userID = req.params.userID;

        Registrant.deleteAllRegistrantOfUser(userID, function (err, registrant) {
            if (err) {
                res.send(err);
            }
            res.json(registrant);
        })
    }

    // getRegistrantSortedByMajor(req, res) {       
    //     var newRegistrant = new Registrant();
    //     //console.log(req.body);
    //     Object.assign(newRegistrant, req.body);
    //     var projectID = req.params.projectID;
    //     //console.log(newRegistrant);

    //     Registrant.getRegistrantSortedByMajor(projectID, newRegistrant.majorID, function (err, registrant)  {
    //         if (err) {
    //             res.send(err);
    //         }
    //         //console.log(registrant)
    //         res.json(registrant);
    //     })
        
    // }

    checkExistedRegistrant(req, res) {       
        var newRegistrant = new Registrant();
        Object.assign(newRegistrant, req.body);

        //console.log(filters);
        Registrant.checkExistedRegistrant(newRegistrant, function (err, checkExist)  {
            if (err) {
                res.send(err);
            }
            //console.log(checkExist)
            res.json(checkExist);
        })
        
    }
}

module.exports = new RegistrantController();