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
            return res.send({
                status: 400,
                message: "Username required!"
            });
        }
        if (!password) {
            return res.send({
                status: 400,
                message: "Password required!"
            });
        }
        models.Employer.find({
            where: {username: username}
        }).then(function(employers, err) {
            if (err) {
                return res.send({
                    status: 400,
                    message: "",
                    error: err
                });
            }
            if (employers) {
                return res.send({
                    status: 400,
                    message: "Username has exist!"
                });
            } else {
                password = md5(password);
                models.Employer.create({
                    id: uuid(),
                    username: username,
                    password: password
                }).then(function(employer, err) {
                    if (err) {
                        return res.send({
                            status: 400,
                            message: "",
                            error: err
                        });
                    }
                    return res.send({
                        status: 200
                    });
                });
            }
        })
    },
    signin: function(req, res) {
        var username = req.body.username;
        var password = req.body.password;
        if (!username) {
            return res.send({
                status: 400,
                message: "Username required!"
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
                "password",
                "level",
                "info",
                "fullname",
                "address",
                "phone",
                "image",
            ]
        }).then(function(employer, err) {
            if (err) {
                return res.send({
                    status: 400,
                    message: "",
                    error: err
                });
            }

            if (!employer) {
                return res.send({
                    status: 400,
                    message: "Username not exist!"
                });
            }

            delete employer["password"];
            res.send({
                employer: employer,
                token: jwt.sign({
                    "employer": employer
                }, config.secret)
            })
        });
    }
};
