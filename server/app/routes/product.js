var jwt = require("jsonwebtoken");
var uuid = require("../utils/uuid");
var config = require("../config");
var toImage = require("../utils/toImage");
var logger = require("../logger")
var _ = require("lodash");
var Q = require("q");
var removeSignText = require("../utils/text_no_sign");

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

function excuteUpdate (res, query) {
    models.sequelize.query(query).then(function(result) {
        return res.status(200).send();
    }).catch(function(err) {
        logger("ERROR", err);
        return res.status(400).send({
            error: err
        });
    });
}
module.exports = {
    getTotalProduct: function(req, res) {
        getMenu(function(listMenu) {
            var type = req.param("type");
            var condition = "";
            var query = "SELECT count(id) as total FROM products ";
            if (type === "noactive") {
                condition = " WHERE status = 0";
            } else if (type === "home") {
                condition = " WHERE status = 1";
            } else if (type === "trademark") {
                condition = "WHERE trademark_id = " + "trademark_id";
            } else {
                if (type === "sanphammoi") { //newest
                    condition = " WHERE status = 1";
                    orderBy = " ORDER BY createdAt DESC";
                } else {
                    var listType = getListChildrenMenu(type, listMenu, res);
                    if (listType) {
                        var typeArray = "(" + listType.toString() + ")";
                        query = "SELECT count(DISTINCT(p.id)) as total FROM products p, categories c, products_category pc ";
                        condition = " WHERE p.status = 1 and p.id = pc.product_id and pc.category_id = c.id and c.id IN " + typeArray;
                    } else {
                        return res.status(400).send({
                            error: {
                                message: "Tải Không Thành Công"
                            }
                        });
                    }
                }
            }
            query += condition;
            models.sequelize.query(query)
            .spread(function(total) {
                return res.status(200).send({
                    data: total[0].total
                });
            }).catch(function(err) {
                logger("ERROR", err);
                return res.status(400).send({
                    error: err
                });
            });
        })
        
    },
    getListProduct: function(req, res) {
        getMenu(function(listMenu) {
            var type = req.param("type");
            var quantity  = +req.param("quantity");
            var page = +req.param("page");
            var start = (page - 1) * quantity;
            var condition;
            var orderBy = "";
            var query = "SELECT id, name, code, thumbnail, price_retail, price_wholesale,color, trademark_id FROM products ";
            if (type === "noactive") {
                condition = "WHERE status = 0";
            } else if (type === "home") {
                condition = "WHERE status = 1";
            } else if (type === "trademark") {
                condition = "WHERE trademark_id = " + "trademark_id";
            } else {
                if (type === "sanphammoi") { //newest
                    condition = "WHERE status = 1";
                    orderBy = " ORDER BY createdAt DESC";
                } else { // promotion
                    // get list type if type have children
                    var listType = getListChildrenMenu(type, listMenu, res);
                    if (listType) {
                        var typeArray = "(" + listType.toString() + ")";
                        query = "SELECT DISTINCT(p.id), p.name, p.code, p.thumbnail, p.price_retail, p.price_wholesale, p.color FROM products p, categories c, products_category pc ";
                        condition = " WHERE p.status = 1 and p.id = pc.product_id and pc.category_id = c.id and c.id IN " + typeArray;
                    } else {
                        return res.status(400).send({
                            error: {
                                message: "Tải Không Thành Công"
                            }
                        });
                    }
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
    getProductById: function(req, res) {
        var id = req.param("id");
        var query = "SELECT * FROM products WHERE id = " + id;
        models.sequelize.query(query)
        .spread(function(product) {
            if (product.length) {
                //get size 
                var querysize = "SELECT * FROM sizes WHERE product_id = " + id;
                // get category of product
                var queryproductcategory = "SELECT * FROM products_category WHERE product_id = " + id;
                // get image of product
                var queryimage = "SELECT * FROM product_galleries WHERE product_id = " + id;
                Q.all([
                    models.sequelize.query(querysize),
                    models.sequelize.query(queryproductcategory),
                    models.sequelize.query(queryimage)
                ]).spread(function(size, pr_cate, galleries) {
                    if (size.length) {
                        product[0].sizes = size[0];
                    }
                    if (pr_cate.length) {
                        product[0].categories = pr_cate[0];
                    }
                    if (galleries.length) {
                        product[0].galleries = galleries[0];
                    }
                    return res.status(200).send({
                        data: product[0]
                    });
                })
            } else {
                return res.status(400).send({
                    error: {
                        message: "Sản Phẩm Không Tồn Tại"
                    }
                });
            }
        }).catch(function(err) {
            logger("ERROR", err);
            return res.status(400).send({
                error: err
            });
        });
    },
    createProduct: function(req, res) {
        var employer = req.userToken.employer;
        var product = req.body.product;
        var gallerys = req.body.gallerys;
        var category_name = "product";
        product.thumbnail = createImageOnDisk("thumbnail", product.thumbnail_data);
        models.Product.find({
            where: {
                code: product.code
            }
        }).then(function(productExist) {
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
                color: product.color,
                trademark_id: product.trademark_id,
                description: product.description,
                description_detail: product.description_detail,
                tech_information: product.tech_information,
                employer_id: employer.id
            }).then(function(prod) {
                /////////////////////////////
                // update text_link product
                var textLink = removeSignText(product.name) + "-" + prod.id + ".html";
                var queryUpdateLink = "UPDATE products SET text_link='" + textLink + "' WHERE id=" + prod.id;
                models.sequelize.query(queryUpdateLink).then(function() {}).catch(function(err) {
                    logger("ERROR", err);
                });
                ////////////////////////////
                var sizes = product.sizes;
                _.forEach(sizes, function(size) {
                    models.Size.create({
                        name: size.name,
                        product_id: prod.id,
                        quantity: size.quantity
                    }).then(function(si) {

                    }).catch(function(err) {
                        logger("ERROR", err);
                        return res.status(400).send({
                            error: err
                        });
                    });
                })
                var listCategory = product.category.split(",");
                // save category 
                _.forEach(listCategory, function(cate) {
                    cate = +cate;
                    models.ProductCategory.create({
                        category_id: cate,
                        product_id: prod.id
                    }).then(function(gal) {

                    }).catch(function(err) {
                        logger("ERROR", err);
                        return res.status(400).send({
                            error: err
                        });
                    });
                })
                // save image to disk and gallery
                _.forEach(gallerys, function(gallery) {
                    var galleryName = createImageOnDisk(category_name, gallery.data);
                    models.ProductGallery.create({
                        product_id: prod.id,
                        image: galleryName
                    }).then(function(gal) {

                    }).catch(function(err) {
                        logger("ERROR", err);
                        return res.status(400).send({
                            error: err
                        });
                    });
                })
                return res.status(200).send({
                    data: prod
                });
            }).catch(function(err) {
                logger("ERROR", err);
                return res.status(400).send({
                    error: err
                });
            });
        })
        
    },
    deleteProduct: function(req, res) {
        var id = req.body.data.id;
        var status = req.body.data.status
        var query = "UPDATE products SET status = " + status + " WHERE id = " + id;
        models.sequelize.query(query).then(function(row, err) {
            return res.status(200).send();
        }).catch(function(err) {
            logger("ERROR", err);
            return res.status(400).send({
                error: err
            });
        });
    },
    updateProduct: function(req, res) {
        var id = req.body.id;
        var field = req.body.field;
        var data = req.body.data;
        var condition = " WHERE id = " + id;
        var query = "";
        switch(field) {
            case "thumbnail":
                var dataImage = data.dataimage;
                var pathThumbnail = data.path;
                if (_.isEmpty(pathThumbnail)) {
                    pathThumbnail = createImageOnDisk("thumbnail", dataImage);
                } else {
                    var image = dataImage.split(";");
                    toImage(image[1], pathThumbnail, config.adminPath)
                } 
                query = "UPDATE products SET thumbnail = '" + pathThumbnail + "'" + condition;
                excuteUpdate(res, query);
                break;
            case "category":
                var promiseArray = [];
                // delete foregin key in products_category
                // add new foregin between product and categories
                query = "DELETE FROM products_category WHERE product_id = " + id;
                models.sequelize.query(query).then(function(result, err) {
                    if (err) {
                        return res.status(400).send({
                            error: err
                        });
                    }
                    _.forEach(data, function(da) {
                        promiseArray.push(models.ProductCategory.create({
                            product_id: id,
                            category_id: da
                        }));
                    });
                    Q.all(promiseArray).then(function(result) {
                        return res.status(200).send(result);
                    }).fail(function(err) {
                        logger("ERROR", err);
                        return res.status(400).send({
                            error: err
                        });
                    })
                });
                break;
            case "name":
                var textLink = removeSignText(data) + "-" + id + ".html";
                query = "UPDATE products SET name = '" + data + "', text_link='" + textLink + "'" + condition;
                excuteUpdate(res, query);
                break;
            case "code":
                var queryFindExitCode = "SELECT * FROM products WHERE code = '" + data + "' AND id != " + id;
                models.sequelize.query(queryFindExitCode).then(function(result) {
                    if (result[0].length) {
                        return res.status(300).send({
                            error: {
                                message: "Sản Phẩm Đã Tồn Tại"
                            }
                        });
                    } else {
                        query = "UPDATE products SET code = '" + data + "'" + condition;
                        excuteUpdate(res, query);
                    }
                }).catch(function(err) {
                    logger("ERROR", err);
                    return res.status(400).send({
                        error: err
                    });
                });
                break;
            case "color":
                query = "UPDATE products SET color = '" + data + "'" + condition;
                excuteUpdate(res, query);
                break;
            case "trademark_id":
                query = "UPDATE products SET trademark_id = " + data + condition;
                excuteUpdate(res, query);
                break;
            case "description":
                query = "UPDATE products SET description = '" + data + "'" + condition;
                excuteUpdate(res, query);
                break;
            case "price_retail":
                query = "UPDATE products SET price_retail = '" + data + "'" + condition;
                excuteUpdate(res, query);
                break;
            case "price_retail_promotion":
                query = "UPDATE products SET price_retail_promotion = '" + data + "'" + condition;
                excuteUpdate(res, query);
                break;
            case "price_wholesale":
                query = "UPDATE products SET price_wholesale = '" + data + "'" + condition;
                excuteUpdate(res, query);
                break;
            case "price_wholesale_promotion":
                query = "UPDATE products SET price_wholesale_promotion = '" + data + "'" + condition;
                excuteUpdate(res, query);
                break;
            case "description_detail" :
                query = "UPDATE products SET description_detail = '" + data + "'" + condition;
                excuteUpdate(res, query);
                break;
            case "tech_information" :
                query = "UPDATE products SET tech_information = '" + data + "'" + condition;
                excuteUpdate(res, query);
                break;
            case "size":
                var arrayPromise = [];
                var addnew = data.new;
                // add
                _.forEach(addnew, function(_addnew) {
                    arrayPromise.push(
                        models.Size.create({
                            name: _addnew.name,
                            product_id: id,
                            quantity: _addnew.quantity
                        })
                    )
                })

                // update
                var update = data.update;
                _.forEach(update, function(_update) {
                    var conditionSize = " WHERE id = " + _update.id;
                    var name = _update.name;
                    var quantity = _update.quantity;
                    var queryUpdate = "UPDATE sizes SET name = '" + name + "', quantity = " + quantity + conditionSize; 
                    arrayPromise.push(models.sequelize.query(queryUpdate))
                })
                // remove
                var remove = data.remove;
                _.forEach(remove, function(_remove) {
                    var idRemove = _remove;
                    var queryRemove = "DELETE FROM sizes WHERE id = " + idRemove; 
                    arrayPromise.push(models.sequelize.query(queryRemove))
                })
                Q.all(arrayPromise).then(function(result) {
                    return res.status(200).send();
                }).fail(function(err) {
                    logger("ERROR", err)
                    return res.status(400).send({
                        error: {
                            message: "Cập Nhật Không Thành Công!"
                        }
                    });
                })
                break;
            case "gallery":
                var arrayPromise = [];
                var addnew = data.new;
                // add new
                _.forEach(addnew, function(_addnew) {
                    var category_name = "product";
                    var galleryName = createImageOnDisk(category_name, _addnew.data);
                    arrayPromise.push(
                        models.ProductGallery.create({
                            product_id: id,
                            image: galleryName
                        })
                    )
                })
                // remove
                var remove = data.remove;
                _.forEach(remove, function(_remove) {
                    var idRemove = _remove;
                    var queryRemove = "DELETE FROM product_galleries WHERE id = " + idRemove; 
                    arrayPromise.push(models.sequelize.query(queryRemove))
                })
                Q.all(arrayPromise).then(function(result) {
                    return res.status(200).send();
                }).fail(function(err) {
                    logger("ERROR",err);
                    return res.status(400).send({
                        error: {
                            message: "Cập Nhật Không Thành Công!"
                        }
                    });
                })
                break;
            default: 
                return res.status(400).send({
                    error: {
                        message: "Cập Nhật Không Thành Công!"
                    }
                });
                break;
        }
        
    }
};
