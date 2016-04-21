var jwt = require("jsonwebtoken");
var uuid = require("../utils/uuid");
var config = require("../config");
var toImage = require("../utils/toImage");
var _ = require("lodash");
var Q = require("q");

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

function excuteUpdate (res, query) {
    models.sequelize.query(query).then(function(result, err) {
        if (err) {
            return res.status(400).send({
                error: err
            });
        }
        return res.status(200).send();
    })
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
                //get size 
                var arrayQuerySize = [];
                _.forEach(rows, function(row) {
                    var querysize = "SELECT * FROM sizes WHERE product = " + row.id;
                    arrayQuerySize.push(models.sequelize.query(querysize))
                })
                Q.all(arrayQuerySize).then(function(rowsSizes) {
                    _.forEach(rowsSizes, function(rowSi) {
                        var newRowSi = rowSi[0];
                        _.forEach(rows, function(row) {
                            var sizeToPro = _.find(newRowSi, function(roSi) {
                                return roSi.product === row.id;
                            })
                            if (sizeToPro) {
                                row.sizes = newRowSi;
                            }
                        })
                    })
                    return res.status(200).send({
                        data: rows
                    });
                }).fail(function(err) {

                })
                
            })
        });
    },
    getProductById: function(req, res) {
        var id = req.param("id");
        var query = "SELECT * FROM products WHERE id = " + id;
        models.sequelize.query(query)
        .spread(function(product, err) {
            if (product.length) {
                //get size 
                var querysize = "SELECT * FROM sizes WHERE product = " + id;
                // get category of product
                var queryproductcategory = "SELECT * FROM products_category WHERE product = " + id;
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
        })
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
                var sizes = product.sizes;
                _.forEach(sizes, function(size) {
                    models.Size.create({
                        name: size.name,
                        product: prod.id,
                        quantity: size.quantity
                    }).then(function(si, err) {

                    })
                })
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
        
    },
    deleteProduct: function(req, res) {
        var id = req.body.id;
        var query = "DELETE FROM products WHERE id = " + id;
        models.sequelize.query(query).then(function(row, err) {
            if (err) {
                return res.status(400).send({
                    error: err
                });
            }
            return res.status(200).send();
        })
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
                query = "DELETE FROM products_category WHERE product = " + id;
                models.sequelize.query(query).then(function(result, err) {
                    if (err) {
                        return res.status(400).send({
                            error: err
                        });
                    }
                    _.forEach(data, function(da) {
                        promiseArray.push(models.ProductCategory.create({
                            product: id,
                            category: da
                        }));
                    });
                    Q.all(promiseArray).then(function(result) {
                        return res.status(200).send(result);
                    }).fail(function(err) {
                        if (err) {
                            return res.status(400).send({
                                error: err
                            });
                        }
                    })
                });
                break;
            case "name":
                query = "UPDATE products SET name = '" + data + "'" + condition;
                excuteUpdate(res, query);
                break;
            case "code":
                var queryFindExitCode = "SELECT * FROM products WHERE code = '" + data + "' AND id != " + id;
                models.sequelize.query(queryFindExitCode).then(function(result, err) {
                    if (err) {
                        return res.status(400).send({
                            error: err
                        });
                    }
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
                })
                break;
            case "color":
                query = "UPDATE products SET color = '" + data + "'" + condition;
                excuteUpdate(res, query);
                break;
            case "trademark":
                query = "UPDATE products SET trademark = '" + data + "'" + condition;
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
            case "size":
                var arrayPromise = [];
                var addnew = data.new;
                // add
                _.forEach(addnew, function(_addnew) {
                    arrayPromise.push(
                        models.Size.create({
                            name: _addnew.name,
                            product: id,
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
