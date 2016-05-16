var models = require("../../models");
var logger = require("../../logger")
var config = require("../../config");
var toImage = require("../../utils/toImage");
var uuid = require("../../utils/uuid");
var _ = require("lodash");

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
        });
    },
    getGalleries: function(req, res) {
        var query = "SELECT * FROM category_galleries WHERE status=1";
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
        });
    },
    addMorePicture: function(req, res) {
        var data = req.body.data;
        var dataImage = data.image.split(";");
        var imageType = (dataImage[0]).split("/")[1];
        var imageFilePath = config.productImage + uuid() + "." + imageType;
        toImage(dataImage[1], imageFilePath, config.adminPath);
        models.CategoryGallery.create({
            image: imageFilePath,
            category_id: data.category_id,
            link: data.link
        }).then(function(result) {
            return res.status(200).send({
                data: result
            })
        }).catch(function(err) {
            logger("ERROR", err);
            return res.status(400).send({
                error: err
            })
        })
    },
    deleteGallery: function(req, res) {
        var id = req.body.id;
        var query = "UPDATE category_galleries SET status = 0 WHERE id =" + id;
        models.sequelize.query(query)
        .spread(function() {
            return res.status(200).send({});
        })
        .catch(function(err) {
            logger("ERROR", err);
            return res.status(400).send({
                error: err
            })
        })
    },
    editGallery: function(req, res) {
        var data = req.body.data;
        var link = data.link;
        var imageData = data.imageData;
        var image = data.image;
        var query = "";
        if (!_.isEmpty(dataImage)) {
            var dataImage = imageData.split(";");
            var imageType = (dataImage[0]).split("/")[1];
            var imageFilePath = config.productImage + uuid() + "." + imageType;
            image = imageFilePath;
            toImage(dataImage[1], imageFilePath, config.adminPath);
        }
        query = "UPDATE category_galleries SET image='" + image + "', link='" + link + "' WHERE id =" + id;
        models.sequelize.query(query)
        .spread(function() {
            return res.status(200).send({});
        })
        .catch(function(err) {
            logger("ERROR", err);
            return res.status(400).send({
                error: err
            })
        })
    }, 
    updateLogoImage: function(req, res) {
        var data = req.body.data;
        var imageData = data.imageData;
        var id = data.id;
        var query = "";

        var dataImage = imageData.split(";");
        var imageType = (dataImage[0]).split("/")[1];
        var imageFilePath = config.productImage + data.link + "." + imageType;
        data.logo_image = imageFilePath;
        toImage(dataImage[1], imageFilePath, config.adminPath);

        query = "UPDATE categories SET logo_image='" + data.logo_image + "' WHERE id =" + id;
        models.sequelize.query(query)
        .spread(function() {
            return res.status(200).send({});
        })
        .catch(function(err) {
            logger("ERROR", err);
            return res.status(400).send({
                error: err
            });
        });
    }
};
