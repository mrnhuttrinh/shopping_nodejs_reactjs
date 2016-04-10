var models = require("../models");

module.exports = {
    signin: function(req, res) {
        models.User.findAll({
            include: [ models.Task ]
        }).then(function(users) {
            res.send({
                title: 'Express',
                users: users
            });
        });
        // res.send({"user": "user"})
    }
};
