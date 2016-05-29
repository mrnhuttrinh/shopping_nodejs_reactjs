var models = require("../../models");
var logger = require("../../logger");
var _ = require("lodash");
var Q = require("q");
module.exports = {
    getList: function(req, res) {
        var query = "SELECT id, title, main_image, show_on_top FROM news WHERE status = 1 OR show_on_top = 1 ";
        models.sequelize.query(query)
        .then(function(listNews) {
            console.log(listNews)
            return res.status(200).send({
                data: listNews[0]
            });
        }).catch(function(err) {
            logger("ERROR", err);
            return res.status(400).send({
                error: err
            });
        });
    }
}