var jwt = require("jsonwebtoken");
var uuid = require("../../utils/uuid");
var config = require("../../config");
var logger = require("../../logger")
var _ = require("lodash");
var Q = require("q");

var models = require("../../models");

function getMenu(cb, res) {
    models.Category.findAll()
    .then(function(listMenu) {
        cb(listMenu);
    }).catch(function(err) {
        logger("ERROR", err);
        return res.status(400).send({
            error: err
        });
    });
}

function getListChildrenMenu(type, menus , res) {
    var listRet = [];
    var currentMenu = _.find(menus, function(menu) {
        return menu.link === type;
    });
    if (currentMenu) {
        listRet.push(currentMenu.id);
        _.forEach(menus, function(menu) {
            if (menu.parent === currentMenu.id) {
                listRet.push(menu.id);
            }
        });
    return listRet;
    } else {
        return false;
    }
}

module.exports = {
    getListProductByCategory: function(req, res) {
        getMenu(function(listMenu) {
            
            var type = req.param("type");
            var quantity  = +req.param("quantity");
            var page = +req.param("page");
            var start = (page - 1) * quantity;
            var condition;
            var orderBy = " ORDER BY p.createdAt DESC ";
            var control = req.param("control");
            if (!control === "undefined") {
                if (control === "prev") {
                    orderBy = " ORDER BY p.createdAt ASC ";
                } else if (control === "hottest") {
                    orderBy = " ORDER BY p.rate DESC ";
                } else if (control === "newest") {
                    orderBy = " ORDER BY p.createdAt DESC ";
                }
            }
            var query;
            if (type === "sanphammoi") {
                query = "SELECT DISTINCT(p.id), p.* FROM products p, categories c, products_category pc ";
                condition = " WHERE p.status = 1 and p.id = pc.product_id and pc.category_id = c.id ";
            } else {
                var listType = getListChildrenMenu(type, listMenu, res);
                if (listType) {
                    var typeArray = "(" + listType.toString() + ")";
                    query = "SELECT DISTINCT(p.id), p.* FROM products p, categories c, products_category pc ";
                    condition = " WHERE p.status = 1 and p.id = pc.product_id and pc.category_id = c.id and c.id IN " + typeArray;
                } else {
                    return res.status(400).send({
                        error: {
                            message: "Tải Không Thành Công"
                        }
                    });
                }
            }
            var limit = " LIMIT " + start + " , " + quantity;
            query += condition + orderBy + limit;
            models.sequelize.query(query)
            .spread(function(rows) {
                _.forEach(rows, function(row) {
                    row.sizes = [];
                });
                //get size 
                var arrayQuerySize = [];
                _.forEach(rows, function(row) {
                    var querysize = "SELECT * FROM sizes WHERE product_id = " + row.id;
                    arrayQuerySize.push(models.sequelize.query(querysize))
                });
                Q.all(arrayQuerySize).spread(function(rowsSizes) {
                    if (rowsSizes) {
                        _.forEach(rowsSizes[0], function(newRowSi) {
                            _.forEach(rows, function(row) {
                                if (row.id === newRowSi.product_id) {
                                    row.sizes.push(newRowSi);
                                }
                            });
                        });
                        return res.status(200).send({
                            data: rows
                        });
                    } else {
                        return res.status(200).send({
                            data: []
                        });
                    }
                }).fail(function(err) {
                    logger("ERROR", err);
                    return res.status(400).send({
                        error: err
                    });
                });
            }).catch(function(err) {
                logger("ERROR", err);
                return res.status(400).send({
                    error: err
                });
            });
        });
    },
    getTotalProduct: function(req, res) {
        getMenu(function(listMenu) {
            var category = req.param("category");
            var condition;
            var query;
            if (category === "sanphammoi") {
                query = "SELECT COUNT(DISTINCT(p.id)) as total FROM products p, categories c, products_category pc ";
                condition = " WHERE p.status = 1 and p.id = pc.product_id and pc.category_id = c.id ";
            } else {
                var listType = getListChildrenMenu(category, listMenu, res);
                if (listType) {
                    var typeArray = "(" + listType.toString() + ")";
                    query = "SELECT COUNT(DISTINCT(p.id)) as total FROM products p, categories c, products_category pc ";
                    condition = " WHERE p.status = 1 and p.id = pc.product_id and pc.category_id = c.id and c.id IN " + typeArray;
                } else {
                    return res.status(400).send({
                        error: {
                            message: "Tải Không Thành Công"
                        }
                    });
                }
            }
            query += condition;
            models.sequelize.query(query)
            .spread(function(rows) {
                return res.status(200).send({
                    data: rows[0].total
                });
            }).catch(function(err) {
                logger("ERROR", err);
                return res.status(400).send({
                    error: err
                });
            });
        });
    },
    getProductByLink: function(req, res) {
        var productLink = req.param("text_link");
        var query = "SELECT * FROM products p WHERE text_link = '" + productLink + "' OR name='" + productLink + "' OR code='" + productLink + "'";
        models.sequelize.query(query)
        .spread(function(rows) {
            if (rows.length) {
                var product = rows[0];
                // get galleries
                var queryGetGalleries = "SELECT id, image FROM product_galleries WHERE product_id = " + product.id;
                // get menu
                var queryGetMenu = "SELECT id, category_id FROM products_category WHERE product_id = " + product.id;
                Q.all([
                    models.sequelize.query(queryGetGalleries),
                    models.sequelize.query(queryGetMenu)
                ]).spread(function(galleries, categories) {
                    product.galleries = galleries.length ? galleries[0] : [];
                    product.categories = categories.length ? categories[0] : [];
                    return res.status(200).send({
                        data: product
                    });
                }).fail(function(err) {
                    logger("ERROR", err);
                    return res.status(400).send({
                        error: err
                    });
                });
            } else {
                return res.status(200).send({
                    data: null
                });
            }
        }).catch(function(err) {
            logger("ERROR", err);
            return res.status(400).send({
                error: err
            });
        });
    }
}