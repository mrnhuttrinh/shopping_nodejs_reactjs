var jwt = require("jsonwebtoken");
var md5 = require('md5');
var uuid = require("../utils/uuid");
var config = require("../config");
var toImage = require("../utils/toImage");
var logger = require("../logger")
var models = require("../models");

module.exports = {
    uploadEmployerPhoto: function(req, res) {
        var empl = req.userToken.employer;
        var image = req.body.image;
        var dataImage = image.split(";");
        var imageType = (dataImage[0]).split("/")[1];
        var imageFilePath = config.adminImage + empl.id + "." + imageType;
        toImage(dataImage[1], imageFilePath, config.adminPath)
        models.Employer.update({
            image: imageFilePath
        }, {
            where: {
                id: empl.id
            }
        }).then(function(suc) {
            return res.status(200).send();
        }).catch(function(err) {
            logger("ERROR", err);
            return res.status(400).send({
                error: err
            });
        });
    },
    create: function(req, res) {
        var newuser = req.body.newuser;
        if (!newuser.username) {
            return res.status(400).send({
                error: {
                    message: "Username required!"
                }
            });
        }
        if (!newuser.password) {
            return res.status(400).send({
                error: {
                    message: "Password required!"
                }
            });
        }
        models.Employer.find({
            where: {username: newuser.username}
        }).then(function(employers) {
            if (employers) {
                return res.status(400).send({
                    error: {
                        message: "Username has exist!"
                    }
                });
            } else {
                password = md5(newuser.password);
                models.Employer.create({
                    id: uuid(),
                    username: newuser.username,
                    password: newuser.password,
                    fullname: newuser.fullname,
                    email: newuser.email,
                    phone: newuser.phone,
                    address: newuser.address,
                    level: newuser.level
                }).then(function(employer, err) {
                    if (err) {
                        logger("ERROR", err);
                        return res.status(400).send({
                            error: err
                        });
                    }
                    return res.status(200).send({
                        data: employer
                    });
                });
            }
        }).catch(function(err) {
            logger("ERROR", err);
            return res.status(400).send({
                error: err
            });
        });
    },
    signin: function(req, res) {
        var username = req.body.username;
        var password = req.body.password;
        var checked = req.body.checked;
        if (!username) {
            return res.status(400).send({
                error: {
                    message: "Username required!"
                }
            });
        }
        models.Employer.find({
            where: {
                username: username,
                password: md5(password),
                status: 1
            },
            attributes: [
                "id",
                "username",
                "email",
                "level",
                "info",
                "fullname",
                "address",
                "phone",
                "image",
            ]
        }).then(function(employer) {
            if (!employer) {
                return res.status(400).send({
                    error: {
                        message: "Username not exist!"
                    }
                });
            }

            if (checked) {
                res.status(200).send({
                    data: {
                        token: jwt.sign({
                            "employer": employer
                        }, config.secret)
                    }
                })
            } else {
                res.status(200).send({
                    data: {
                        token: jwt.sign({
                            "employer": employer
                        }, config.secret, {
                            expiresIn: 86400 // expires in 24 hours
                        })
                    }
                })
            }
        }).catch(function(err) {
            logger("ERROR", err);
            return res.status(400).send({
                error: err
            });
        });
    },
    me: function(req, res) {
        var empl = req.userToken.employer;
        models.Employer.find({
            where: {
                id: empl.id
            },
            attributes: [
                "id",
                "username",
                "email",
                "level",
                "info",
                "fullname",
                "address",
                "phone",
                "image",
            ]
        }).then(function(employer) {
            return res.status(200).send({
                data: employer
            })
        }).catch(function(err) {
            logger("ERROR", err);
            return res.status(400).send({
                error: err
            });
        });
    },
    updateUser: function(req, res) {
        models.Employer.find({
            where: {
                id: req.body.id
            }
        }).then(function(employer) {
            return res.status(200).send({
                data: employer
            });
        }).catch(function(err) {
            logger("ERROR", err);
            return res.status(400).send({
                error: err
            });
        });
    },
    getUser: function(req, res) {
        models.Employer.find({
            where: {
                id: req.body.id
            }
        }).then(function(employer) {
            return res.status(200).send({
                data: employer
            });
        }).catch(function(err) {
            logger("ERROR", err);
            return res.status(400).send({
                error: err
            });
        });
    },
    getAllUser: function(req, res) {
        console.log(JSON.stringify(req.decoded))
        models.Employer.findAll().then(function(employers) {
            return res.status(200).send({
                data: employers
            });
        }).catch(function(err) {
            logger("ERROR", err);
            return res.status(400).send({
                error: err
            });
        });
    }
};
