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

function getMenu(cb, res) {
    models.Category.findAll()
    .then(function(listMenu, err) {
        if (err) {
            return res.status(400).send({
                error: err
            });
        } 
        cb(listMenu);
    });
}
function getListChildrenMenu(type, menus) {
    var listRet = [];
    listRet.push(type);
    _.forEach(menus, function(menu) {
        if (menu.parent === type) {
            listRet.push(menu.id);
        }
    });
    return listRet;
}
module.exports = {
    getTotalProduct: function(req, res) {
        getMenu(function(listMenu) {
            var type = req.param("type");

            var condition = "";
            var query = "SELECT count(*) as total FROM products ";
            if (!_.isEmpty(type)) {
                type = parseInt(type);
                if (type !== 1) {
                    var listType = getListChildrenMenu(type, listMenu);
                    var typeArray = "(" + listType.toString() + ")";
                    query = "SELECT count(DISTINCT(p.id)) as total FROM products p, categories c, products_category pc ";
                    condition = " WHERE p.id = pc.product and pc.category = c.id and c.id IN " + typeArray;
                }
            }
            query += condition;
            models.sequelize.query(query)
            .spread(function(total, err) {
                return res.status(200).send({
                    data: total[0].total
                });
            })
        })
        
    },
    getListProduct: function(req, res) {
        getMenu(function(listMenu) {
            var type = req.param("type");
            var quantity  = +req.param("quantity");
            var page = +req.param("page");
            var start = (page - 1) * quantity;
            var condition = "";
            var orderBy = "";
            var query = "SELECT * FROM products ";
            if (!_.isEmpty(type)) {
                type = parseInt(type);
                if (type === 1) { //newest
                    orderBy = " ORDER BY createdAt DESC";
                } else { // promotion
                    // get list type if type have children
                    var listType = getListChildrenMenu(type, listMenu);
                    var typeArray = "(" + listType.toString() + ")";
                    query = "SELECT DISTINCT(p.id), p.* FROM products p, categories c, products_category pc ";
                    condition = " WHERE p.id = pc.product and pc.category = c.id and c.id IN " + typeArray;
                }
            }
            var limit = " LIMIT " + start + " , " + quantity;
            query += condition + orderBy + limit;
            models.sequelize.query(query)
            .spread(function(rows, err) {
                return res.status(200).send({
                    data: rows
                });
            })
        });

    },
    createProduct: function(req, res) {
        var product = req.body.product;
        var gallerys = req.body.gallerys;
        var category_name = "product";
        product.thumbnail = createImageOnDisk("thumbnail", product.thumbnail_data);
        models.Product.find({
            where: {
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
                var listCategory = product.category.split(",");
                // save category 
                _.forEach(listCategory, function(cate) {
                    cate = +cate;
                    models.ProductCategory.create({
                        category: cate,
                        product: prod.id
                    }).then(function(gal, err) {

                    })
                })
                // save image to disk and gallery
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
