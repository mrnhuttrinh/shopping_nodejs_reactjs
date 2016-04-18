var jwt = require("jsonwebtoken");
var uuid = require("../utils/uuid");
var config = require("../config");
var toImage = require("../utils/toImage");
var _ = require("lodash");

var models = require("../models");

function createImageOnDisk(prefix, dataImage) {
    var data = dataImage.split(";");
    var imageType = (data[0]).split("/")[1];
    var imageFilePath = config.productImage + prefix + "_" + uuid() + "." + imageType;
    toImage(data[1], imageFilePath, config.adminPath)
    return imageFilePath;
}

module.exports = {
    getTotalProduct: function(req, res) {
        var type = req.param("type");

        var condition = "";
        if (!_.isEmpty(type)) {
            condition = "WHERE products.category = " + type;
        }

        var query = "SELECT count(*) as total FROM products " + condition;
        models.sequelize.query(query)
        .spread(function(total, err) {
            return res.status(200).send({
                data: total[0].total
            });
        })
    },
    getListProduct: function(req, res) {
        var type = req.param("type");
        var quantity  = +req.param("quantity");
        var start = +req.param("start");

        var condition = "";
        if (!_.isEmpty(type)) {
            condition = "WHERE products.category = " + type;
        }

        var limit = " LIMIT " + start + " , " + quantity;
        var query = "SELECT * FROM products " + condition + limit;
        models.sequelize.query(query)
        .spread(function(rows, err) {
            return res.status(200).send({
                data: rows
            });
        })
    },
    createProduct: function(req, res) {
        var product = req.body.product;
        var gallerys = req.body.gallerys;
        var category_name = product.category_name;
        product.thumbnail = createImageOnDisk("thumbnail", product.thumbnail_data);
        models.Product.find({
            where: {
                category: product.category,
                code: product.code
            }
        }).then(function(productExist, err) {
            if (productExist) {
                return res.status(400).send({
                    error: {
                        message: "Mã Sản Phẩm Đã Tồn Tại"
                    }
                });
            }
            models.Product.create({
                category: product.category,
                name: product.name,
                code: product.code,
                thumbnail: product.thumbnail,
                price_retail: product.price_retail,
                price_retail_promotion: product.price_retail_promotion,
                price_wholesale: product.price_wholesale,
                price_wholesale_promotion: product.price_wholesale_promotion,
                sizeS: product.sizeS,
                sizeM: product.sizeM,
                sizeX: product.sizeX,
                color: product.color,
                trademark: product.trademark,
                description: product.description,
            }).then(function(prod, err) {
                if (err) {
                    return res.status(400).send({
                        error: err
                    });
                }
                _.forEach(gallerys, function(gallery) {
                    var galleryName = createImageOnDisk(category_name, gallery.data);
                    models.ProductGallery.create({
                        product_id: prod.id,
                        image: galleryName
                    }).then(function(gal, err) {

                    })
                })
                return res.status(200).send({
                    data: prod
                });
            });
        })
        
    }
};
