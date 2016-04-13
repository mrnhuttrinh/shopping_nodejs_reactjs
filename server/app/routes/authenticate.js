var jwt = require("jsonwebtoken");
var config = require("../config");

var models = require("../models");

module.exports = {
    signin: function(req, res) {
        res.json({
            token: jwt.sign({
                "username": "user1"
            }, config.secret)
        });
    },
    me: function(req, res) {
        // models.User.findAll({
        //     include: [ models.Task ]
        // }).then(function(users) {
        //     res.send({
        //         title: 'Express',
        //         users: users
        //     });
        // });
        res.send({
            "user": "user",
            "message": "login success"
        })
    }
};
