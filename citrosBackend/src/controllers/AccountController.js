const db = require('../config/db-config');
const Account = require('../model/Account');

const nodemailer = require("nodemailer"); // Dùng để gửi mail

const bcrypt = require('bcrypt'); // Mã hóa mk
const saltRounds = 10;

class AccountController {
    getAllUserAccounts(req, res) {
        Account.getAllUserAccounts((err, account) => {
            if (err) {
                res.send(err);
            }
            res.send(account);
        })
    }

    getUserNumber(req, res) {
        Account.getUserNumber((err, userNum) => {
            if (err) {
                res.send(err);
            }
            res.send(userNum);
        })
    }

    getAllAdminAccounts(req, res) {  
        Account.getAllAdminAccounts((err, account) => {
            if (err) {
                res.send(err);
            }
            res.send(account);
        })
    }

    addAccount(req, res) {
        var newAccount = new Account();
        Object.assign(newAccount, req.body);

        try {
            //console.log(newAccount);
            if (newAccount.accountID == null) {
    
                res.status(400).send({ error: true, message: 'Please provide account' });
            }
            else {
                bcrypt.genSalt(saltRounds, function(err, salt) {
                    bcrypt.hash(newAccount.password, salt, function(err, hash) {
                        //console.log(hash);
                        newAccount.password = hash;
            
                        Account.addAccount(newAccount, function (err, account) {
                            if (err) {
                                res.send(err);
                            }
                            newAccount.accountID = account;
                            ////console.log();
                            res.json(newAccount.accountID);
                        })
                    });
                });
                
            }
        }
        catch (err) { }
    }

    createAdminAccount(req, res) {
        var newAccount = new Account();
        Object.assign(newAccount, req.body);

        try {
            //console.log(newAccount);
            if (newAccount.accountID == null) {
    
                res.status(400).send({ error: true, message: 'Please provide account' });
            }
            else {
                bcrypt.genSalt(saltRounds, function(err, salt) {
                    bcrypt.hash(newAccount.password, salt, function(err, hash) {
                        //console.log(hash);
                        newAccount.password = hash;
            
                        Account.createAdminAccount(newAccount, function (err, account) {
                            if (err) {
                                res.send(err);
                            }
                            newAccount.accountID = account;
                            ////console.log();
                            res.json(newAccount.accountID);
                        })
                    });
                });
                
            }
        }
        catch (err) { }
    }

    checkAccount(req, res) {
        var newAccount = new Account();
        Object.assign(newAccount, req.body);

        try {
            //console.log(newAccount);
            if (newAccount.accountID == null) {
    
                res.status(400).send({ error: true, message: 'Please provide account' });
            }
            else {
                Account.getAccountSortedByEmail(newAccount.email, function (err, account) {
                    if (err) {
                        res.send(err);
                    }
                    
                    bcrypt.compare(newAccount.password, account[0].password, function(err, result) {
                        if (err) {
                            res.send(err);
                        }
                        else {
                            ////console.log(result);
                            res.json(result);
                        }
                    });
                })
            }
        }
        catch (err) { }
    }

    updateAccount(req, res) {
        var newAccount = new Account();
        Object.assign(newAccount, req.body);
        var accountID = req.params.accountID;

        try {
            //console.log(newAccount);
            Account.updateAccount(newAccount, accountID, function (err, account) {
                if (err) {
                    res.send(err);
                }
                res.json(account);
            })
        }
        catch (err) { }
    }

    changePassword(req, res) {
        var newAccount = new Account();
        Object.assign(newAccount, req.body);
        //console.log(newAccount);
        var accountID = req.params.accountID;

        try {
            if (accountID == null) {
    
                res.status(400).send({ error: true, message: 'Please provide account' });
            }
            else {
                bcrypt.genSalt(saltRounds, function(err, salt) {
                    bcrypt.hash(newAccount.password, salt, function(err, hash) {
                        //console.log(hash);
                        newAccount.password = hash;
                        //console.log(newAccount.password);
            
                        Account.changePassword(newAccount.password, accountID, function (err, account) {
                            if (err) {
                                res.send(err);
                            }
                            newAccount.accountID = account;
                            ////console.log();
                            res.json(newAccount.accountID);
                        })
                    });
                });
                
            }
        }
        catch (err) { }
    }
    
    updateVerifiedAccount(req, res) {
        var newAccount = new Account();
        Object.assign(newAccount, req.body);
        var userID = req.params.userID;

        try {
            //console.log(newAccount);
            Account.updateVerifiedAccount(newAccount.accountID, userID, function (err, account) {
                if (err) {
                    res.send(err);
                }
                res.json(account);
            })
        }
        catch (err) { }
    }

    async updateVerificationCode(req, res) {
        var verificationCode = Math.floor(Math.random() * 1000000) + 100000;

        var newAccount = new Account();
        Object.assign(newAccount, req.body);
        var accountID = req.params.accountID;

        try {
            Account.updateVerificationCode(verificationCode, accountID, function (err, account) {
                if (err) {
                    res.send(err);
                }
                //res.json(verificationCode);
            })
    
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
                to: `${newAccount.email}`, // list of receivers
                subject: "Verification code for Citros Web", // Subject line
                text: "Verification code", // plain text body
                html: `<b>Your verification code is: ${verificationCode}</b>`, // html body
            }, (err) => {
                if (err) {
                    res.send(err);
                }
                //res.json(verificationCode);
            });
        }
        catch (err) { }
    }

    checkVerificationCode(req, res) {
        var newAccount = new Account();
        Object.assign(newAccount, req.body);
    
        var verificationCode = req.params.verificationCode;

        try {
            //console.log(newAccount);
            Account.checkVerificationCode(verificationCode, newAccount.email, function (err, check) {
                if (err) {
                    res.send(err);
                }
                res.send(check);
            })    
        }
        catch (err) { }
    }

    deleteAccount(req, res) {
        var accountID = req.params.accountID;

        try {
            Account.deleteAccount(accountID, function (err, account) {
                if (err) {
                    res.send(err);
                }
                res.json(account);
            })
        }
        catch (err) { }
    }

    async deleteAccountByEmail(req, res) {
        var email = req.params.email;

        try {
            Account.deleteAccountByEmail(email, function (err, account) {
                if (err) {
                    res.send(err);
                }
                res.json(account);
            })
    
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
                subject: "Verification code for Citros Web", // Subject line
                text: "Verification code", // plain text body
                html: `<b>Your account has been deleted by admin!</b>`, // html body
            }, (err) => {
                if (err) {
                    res.send(err);
                }
               //res.json(verificationCode);
            });
        }
        catch (err) { }
    }

    deleteUnverifiedAccount(req, res) {
        try {
            Account.deleteUnverifiedAccount(function (err, account) {
                if (err) {
                    res.send(err);
                }
                res.json(account);
            })
        }
        catch (err) { }
    }

    getAccountSortedByEmail(req, res) { 
        const filters = req.params.email;
        //console.log(filters);
        Account.getAccountSortedByEmail(filters, function (err, account)  {
            if (err) {
                res.send(err);
            }
            //console.log(account)
            res.json(account);
        })
    }

    getAccountAndUserSortedByEmail(req, res) { 
        const filters = req.params.email;
            //console.log(filters);
        Account.getAccountAndUserSortedByEmail(filters, function (err, account)  {
            if (err) {
                res.send(err);
            }
            //console.log(account)
            res.json(account);
        })
    }

    getAccountSortedByID(req, res) {       
        const filters = req.params.accountID;
        //console.log(filters);
        Account.getAccountSortedByID(filters, function (err, account)  {
            if (err) {
                res.send(err);
            }
            //console.log(account)
            res.json(account);
        })
    }

    getAccountSortedByUserID(req, res) {       
        const filters = req.params.userID;
        //console.log(filters);
        Account.getAccountSortedByUserID(filters, function (err, account)  {
            if (err) {
                res.send(err);
            }
            //console.log(account)
            res.json(account);
        })
    }

    checkExistedAccount(req, res) {       
        const filters = req.params.email;
        //console.log(filters);
        Account.checkExistedAccount(filters, function (err, checkExist)  {
            if (err) {
                res.send(err);
            }
            //console.log(checkExist)
            res.json(checkExist);
        })
    }

    checkCreatedAccount(req, res) {       
        const filters = req.params.email;
        //console.log(filters);
        Account.checkCreatedAccount(filters, function (err, checkExist)  {
            if (err) {
                res.send(err);
            }
            //console.log(checkExist)
            res.json(checkExist);
        })
    }

    
    // checkExistedAccount(req, res) {       
    //     const filters = req.params.email;
    //     //console.log(filters);
    //     var check = Account.checkExistedAccount(filters);
    //     if(check == true) {
    //         res.json("ok")
    //     } else {
    //         res.json("loi checkExistedAccount") 
    //     }
        
    //     //return check;
    // }
}

module.exports = new AccountController();