var jwt = require("jsonwebtoken");
var md5 = require('md5');
var uuid = require("../../utils/uuid");
var config = require("../../config");
var toImage = require("../../utils/toImage");
var logger = require("../../logger");
var models = require("../../models");
var _ = require("lodash");

module.exports = {
    registerUser: function(req, res) {
        var newuser = req.body.newuser;
        if (!newuser.email) {
            return res.status(400).send({
                error: {
                    message: "Email required!"
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
        models.User.find({
            where: {email: newuser.email}
        }).then(function(userExist) {
            if (userExist) {
                return res.status(400).send({
                    error: {
                        message: "Email has exist!"
                    }
                });
            } else {
                password = md5(newuser.password);
                models.User.create({
                    id: uuid(),
                    password: password,
                    fullname: newuser.fullname,
                    email: newuser.email,
                    phone: newuser.phone,
                    birthdate: newuser.birthdate,
                    gender: parseInt(newuser.gender)
                }).then(function(user) {
                    return res.status(200).send({
                        data: user
                    });
                }).catch(function(err) {
                    logger("ERROR", err);
                    return res.status(400).send({
                        error: err
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
    loginUser: function(req, res) {
        var email = req.body.email;
        var password = req.body.password;
        if (!email) {
            return res.status(400).send({
                error: {
                    message: "Email required!"
                }
            });
        }
        models.User.find({
            where: {
                email: email,
                password: md5(password),
                status: 1
            }, attributes: [
                "id",
                "email",
                "fullname",
                "address",
                "phone",
                "birthdate"
            ]
        }).then(function(user) {
            if (!user) {
                return res.status(400).send({
                    error: {
                        message: "Email not exist!"
                    }
                });
            }

            res.status(200).send({
                data: user
            });
        }).catch(function(err) {
            logger("ERROR", err);
            return res.status(400).send({
                error: err
            });
        });
    }
}