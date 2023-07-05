const db = require('../config/db-config');
const ContactInfo = require('../model/ContactInfo');

class ContactInfoController {
    listAllContactInfo(req, res) {
        ContactInfo.getAllContactInfo((err, contactInfo) => {
            if (err) {
                res.send(err);
            }
            res.send(contactInfo);
        })
    }

    addContactInfo(req, res) {
        var newContactInfo = new ContactInfo();
        Object.assign(newContactInfo, req.body);
        //console.log(newContactInfo);
        if (newContactInfo.contactInfoID == null) {

            res.status(400).send({ error: true, message: 'Please provide contactInfo' });
        }
        else {
            ContactInfo.addContactInfo(newContactInfo, function (err, contactInfo) {
                if (err) {
                    res.send(err);
                }
                res.json(contactInfo);
            })
        }
    }

    updateContactInfo(req, res) {
        var newContactInfo = new ContactInfo();
        Object.assign(newContactInfo, req.body);
        var contactInfoID = req.params.contactInfoID;
        //console.log(newContactInfo);
        ContactInfo.updateContactInfo(newContactInfo, contactInfoID, function (err, contactInfo) {
            if (err) {
                res.send(err);
            }
            res.json(contactInfo);
        })
    }

    deleteContactInfo(req, res) {
        var contactInfoID = req.params.contactInfoID;
        ContactInfo.deleteContactInfo(contactInfoID, function (err, contactInfo) {
            if (err) {
                res.send(err);
            }
            res.json(contactInfo);
        })
    }

    getContactInfoSortedByName(req, res) {       
        const filters = req.params.userName;
        //console.log(filters);
        ContactInfo.getContactInfoSortedByName(filters, function (err, contactInfo)  {
            if (err) {
                res.send(err);
            }
            //console.log(contactInfo)
            res.json(contactInfo);
        })
        
    }

    getContactInfoSortedByID(req, res) {       
        const filters = req.params.userID;
        //console.log(filters);
        ContactInfo.getContactInfoSortedByID(filters, function (err, contactInfo)  {
            if (err) {
                res.send(err);
            }
            //console.log(contactInfo)
            res.json(contactInfo);
        })
        
    }
}

module.exports = new ContactInfoController();