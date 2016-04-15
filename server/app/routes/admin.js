var jwt = require("jsonwebtoken");
var md5 = require('md5');
var uuid = require("../utils/uuid");
var config = require("../config");

var models = require("../models");

module.exports = {
    create: function(req, res) {
        var username = req.body.username;
        var password = req.body.password;
        if (!username) {
            return res.status(400).send({
                error: {
                    message: "Username required!"
                }
            });
        }
        if (!password) {
            return res.status(400).send({
                error: {
                    message: "Password required!"
                }
            });
        }
        models.Employer.find({
            where: {username: username}
        }).then(function(employers, err) {
            if (err) {
                return res.status(400).send({
                    error: err
                });
            }
            if (employers) {
                return res.status(400).send({
                    error: {
                        message: "Username has exist!"
                    }
                });
            } else {
                password = md5(password);
                models.Employer.create({
                    id: uuid(),
                    username: username,
                    password: password
                }).then(function(employer, err) {
                    if (err) {
                        return res.status(400).send({
                            error: err
                        });
                    }
                    return res.status(200).send({
                        data: employer
                    });
                });
            }
        })
    },
    signin: function(req, res) {
        var username = req.body.username;
        var password = req.body.password;
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
                password: md5(password)
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
        }).then(function(employer, err) {
            if (err) {
                return res.status(400).send({
                    error: err
                });
            }

            if (!employer) {
                return res.status(400).send({
                    error: {
                        message: "Username not exist!"
                    }
                });
            }

            res.status(200).send({
                data: {
                    token: jwt.sign({
                        "employer": employer
                    }, config.secret, {
                        expiresIn: 86400 // expires in 24 hours
                    })
                }
            })
        });
    },
    me: function(req, res) {
        res.status(200).send({
            data: req.userToken.employer
        })
    },
    updateUser: function(req, res) {
        models.Employer.find({
            where: {
                id: req.body.id
            }
        }).then(function(employer, err) {
            if (err) {
                return res.status(400).send({
                    error: err
                });
            }
            return res.status(200).send({
                data: employer
            });
        })
    },
    getUser: function(req, res) {
        models.Employer.find({
            where: {
                id: req.body.id
            }
        }).then(function(employer, err) {
            if (err) {
                return res.status(400).send({
                    error: err
                });
            }
            return res.status(200).send({
                data: employer
            });
        })
    },
    getAllUser: function(req, res) {
        console.log(JSON.stringify(req.decoded))
        models.Employer.findAll().then(function(employers, err) {
            if (err) {
                return res.status(400).send({
                    error: err
                });
            }
            return res.status(200).send({
                data: employers
            });
        })
    }
};
