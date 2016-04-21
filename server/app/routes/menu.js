var models = require("../models");
module.exports = {
    get: function(req, res) {
        models.Category.findAll()
        .then(function(listMenu, err) {
            if (err) {
                return res.status(400).send({
                    error: err
                });
            } 
            return res.status(200).send({
                data: listMenu
            });
        });
    }
};
