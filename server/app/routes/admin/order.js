var models = require("../../models");
var logger = require("../../logger")
var _ = require("lodash");
var Q = require("q");
var moment = require("moment");

module.exports = {
    filterOrder: function(req, res) {
        var orderId = req.body.order_id;
        var productName = req.body.product_name;
        var customerName = req.body.customer_name;
        var categoryId = req.body.category_id;
        var dateStart = req.body.date_stard;
        // var dateEnd = moment(req.body.date_end).add(1, "Days");
        var dateEnd = req.body.date_end;
        var completed = req.body.completed;
        var unCompleted = req.body.un_completed;

        // select distinct(`order`.id), `order`.*
        // from `order`, `order_detail`, `products`, `user`, `products_category`, `categories`
        // where `order`.id = `order_detail`.order_id
        // and `order_detail`.product_id = `products`.id
        // and `order`.customer_id = `user`.id 
        // and `categories`.id = `products_category`.category_id
        // and `products`.id = `products_category`.product_id
        // and `user`.fullname like '%Trinh%'
        // or `products`.name like '%Ao Thunss%'
        // or `categories`.id = 1


        // SELECT
        // distinct(`order`.id),
        // `order`.id,
        // `order`.text_id,
        // `order`.customer_id,
        // `order`.address_id,
        // `order`.event_id,
        // `order`.formula_type,
        // `order`.note,
        // `order`.total,
        // `order`.completed,
        // `order`.status,
        // `order`.createdAt,
        // `order`.updatedAt
        // FROM
        // `order`
        // Inner Join order_detail ON `order`.id = order_detail.id
        // Inner Join products ON order_detail.product_id = products.id
        // Inner Join `user` ON `order`.customer_id = `user`.id
        // Inner Join products_category ON products.id = products_category.product_id
        // Inner Join categories ON products_category.category_id = categories.id
        // where `order`.createdAt >= '2016-08-10T14:00:33.341Z'   and `order`.createdAt <= '2016-08-16T14:00:33.343Z'

        var query = " SELECT distinct(`order`.id), `order`.*, `user`.fullname ";
        query += " FROM `order` ";
        query += " Inner Join order_detail ON `order`.id = order_detail.id ";
        query += " Inner Join useraddress ON `order`.address_id = useraddress.id ";
        query += " Inner Join products ON order_detail.product_id = products.id ";
        query += " Inner Join `user` ON `order`.customer_id = `user`.id ";
        query += " Inner Join products_category ON products.id = products_category.product_id ";
        query += " Inner Join categories ON products_category.category_id = categories.id ";
        query += " Where ";
        var condition = [];
        if (orderId) {
            condition.push(" `order`.text_id like '%" + orderId + "%' ");
        }
        if (productName) {
            condition.push(" `products`.name like '%" + productName + "%' OR `products`.name like '%" + productName + "%' ");
        }
        if (customerName) {
            condition.push(" `useraddress`.fullname like '%" + customerName + "%' OR `user`.fullname like '%" + customerName + "%' OR `useraddress`.phone = '" + customerName + "' OR `user`.phone = '" + customerName + "' ");
        }
        if (categoryId) {
            condition.push(" `categories`.id = " + categoryId +" ");
        }
        if (dateStart) {
            condition.push(" `order`.createdAt >= '" + dateStart +"' ");
        }
        if (dateEnd) {
            condition.push(" `order`.createdAt <= '" + dateEnd + "'");
        }
        if (completed && !unCompleted) {
            condition.push(" `order`.completed = 1 ");
        } else if (!completed && unCompleted) {
            condition.push(" `order`.completed = 0 ");
        }
        // condition.push(" `order`.status = 1 ");
        var conditionText = condition.join(" AND ");

        query += conditionText;

        models.sequelize.query(query)
        .spread(function(result) {
            var orders = result;
            return res.status(200).send({
                data: orders
            });
        }).catch(function(err) {
            logger("ERROR", err);
            return res.status(400).send({
                error: err
            });
        });
    },
    getOrderById: function(req, res) {
        var textId = req.param("text_id");
        models.Order.find({
            where: {
                text_id: textId
            }
        }).then(function(order) {

            // get order detail
            var queryOrderDetail = "select * from order_detail where order_id='" + order.id + "';";
            
            // get customer
            var queryCustomer = "select * from user where id='" + order.customer_id + "'";
            
            // get address
            var queryAddress = "select * from useraddress where id=" + order.address_id;

            Q.all([
                models.sequelize.query(queryOrderDetail),
                models.sequelize.query(queryCustomer),
                models.sequelize.query(queryAddress)
            ]).spread(function(orderDetail, customer, address) {
                orderDetail = orderDetail[0];
                customer = customer[0];
                address = address[0];
                var resultOrder = order["dataValues"];
                resultOrder.orderDetail = orderDetail;
                resultOrder.customer = customer;
                resultOrder.address = address;
                // get product
                if (orderDetail.length) {
                    var listPromise = [];
                    for (var i = 0; i < orderDetail.length; i++) {
                        var textQuery = "select * from products where id=" + orderDetail[i].product_id;
                        listPromise.push(models.sequelize.query(textQuery));
                    }
                    Q.all(listPromise).then(function(products) {
                        products = products[0][0];
                        for (var i = 0; i < orderDetail.length; i++) {
                            for (var j = 0; j < products.length; j++) {
                                if (orderDetail[i].product_id === products[j].id) {
                                    orderDetail[i].product = products[j];
                                    break;
                                }
                            }
                        }
                        return res.status(200).send({
                            data: resultOrder
                        });
                    });
                } else {
                    return res.status(200).send({
                        data: resultOrder
                    });
                }
            }).catch(function(err) {
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
    },
    markCompletedOrder: function(req, res) {
        var orderId = req.body.order_id;
        models.Order.update({
            completed: 1
        }, {
            where: {
                text_id: orderId
            }
        }).then(function(suc) {
            return res.status(200).send();
        }).catch(function(err) {
            logger("ERROR", err);
            return res.status(400).send({
                error: err
            });
        });
    },
    createNewOrder: function(req, res) {
        var customer_name = req.body.customer_name;
        var gender = req.body.gender;
        var age = req.body.age;
        var address = req.body.address;
        var mobile = req.body.mobile;
        var email = req.body.email;
        var products = req.body.products;
        var newAddress = req.body.address;
        models.User.find({
            where: {username: "noname"}
        }).then(function(user) {
            if (user) {
                newAddress.user_id = user.id;
                // save
                // create address
                models.UserAddress.create(newAddress).then(function(address) {
                    var customer_id = user.id;
                    var address_id = address.id;
                    var note = "Đặt Hàng Trực Tiếp";
                    var createTextUnique = (new Date()).getTime();
                    models.Order.create({
                        customer_id: customer_id,
                        address_id: address_id,
                        note: note,
                        text_id: createTextUnique
                    }).then(function(order) {
                        // create order_detail
                        var listPromises = [];
                        _.forEach(products, product => {
                            listPromises.push(models.OrderDetail.create({
                                product_id: product.id,
                                price: (product.price_wholesale - product.price_wholesale_promotion),
                                order_id: order.id,
                                quantity: product.quantity,
                                size: product.size
                            }));
                        });

                        Q.all(listPromises).then(function(products) {
                            order.products = products;
                            return res.status(200).send({
                                data: order
                            });
                        }).catch(function(err) {
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
                }).catch(function(err) {
                    logger("ERROR", err);
                    return res.status(400).send({
                        error: err
                    });
                });
            } else {
                console.log("User hasn't exist");
                return res.status(200).send({
                    data: "User hasn't exist"
                });
            }
        }).catch(function(err) {
            logger("ERROR", err);
            return res.status(400).send({
                error: err
            });
        });
    },
    cancelOrder:function(req, res) {
        var order_id = req.body.order_id;
        models.Order.update({
            status: false
        }, {
            where: {
                text_id: order_id
            }
        }).then(function() {
            return res.status(200).send({
                data: "Cancel Success"
            });
        }).catch(function(err) {
            logger("ERROR", err);
            return res.status(400).send({
                error: err
            });
        });
    },
    reportOrder: function(req, res) {
        var dateStart = req.body.date_start;
        var dateEnd = req.body.date_end;
        var completed = req.body.completed;
        var unCompleted = req.body.un_completed;

        var query = " SELECT distinct(`order`.id), `order`.*, `user`.fullname ";
        query += " FROM `order` ";
        query += " Inner Join order_detail ON `order`.id = order_detail.id ";
        query += " Inner Join useraddress ON `order`.address_id = useraddress.id ";
        query += " Inner Join products ON order_detail.product_id = products.id ";
        query += " Inner Join `user` ON `order`.customer_id = `user`.id ";
        query += " Inner Join products_category ON products.id = products_category.product_id ";
        query += " Inner Join categories ON products_category.category_id = categories.id ";
        query += " Where ";
        var condition = [];
        if (dateStart) {
            condition.push(" `order`.createdAt >= '" + dateStart +"' ");
        }
        if (dateEnd) {
            condition.push(" `order`.createdAt <= '" + dateEnd + "'");
        }
        if (completed && !unCompleted) {
            condition.push(" `order`.completed = 1 ");
        } else if (!completed && unCompleted) {
            condition.push(" `order`.completed = 0 ");
        }
        condition.push(" `order`.status = 1 ");
        var conditionText = condition.join(" AND ");

        query += conditionText;

        models.sequelize.query(query)
        .spread(function(result) {
            var orders = result;
            return res.status(200).send({
                data: orders
            });
        }).catch(function(err) {
            logger("ERROR", err);
            return res.status(400).send({
                error: err
            });
        });
    }
};
