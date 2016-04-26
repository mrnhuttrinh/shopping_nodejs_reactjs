var models = require("../models");
var logger = require("../logger")
module.exports = {
    get: function(req, res) {
        models.Category.findAll()
        .then(function(listMenu) {
            return res.status(200).send({
                data: listMenu
            });
        }).catch(function(err) {
            logger("ERROR", err);
            return res.status(400).send({
                error: err
            });
        });
    }
};
