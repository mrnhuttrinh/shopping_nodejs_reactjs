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

// sort product
// if (type === "price_reduce") {
//     condition = " WHERE status = 1 AND "
// } else if (type === "price_increase") {

// } else if (type === "rate") {

// } else if (type === "sale_off") {

// } else 
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
    }
}