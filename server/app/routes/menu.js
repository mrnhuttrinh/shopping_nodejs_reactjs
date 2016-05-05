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
    },
    getGalleryByMenuId: function(req, res) {
        var id = req.param("id");
        var query = "SELECT * FROM category_galleries WHERE category_id=" + id;
        models.sequelize.query(query)
        .spread(function(listResutl) {
            return res.status(200).send({
                data: listResutl
            });
        })
        .catch(function(err) {
            logger("ERROR", err);
            return res.status(400).send({
                error: err
            })
        })
    }
};
