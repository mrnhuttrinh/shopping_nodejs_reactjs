var jwt = require("jsonwebtoken");
var md5 = require('md5');
var uuid = require("../../utils/uuid");
var config = require("../../config");
var toImage = require("../../utils/toImage");
var logger = require("../../logger");
var models = require("../../models");
var path = require("path");
var _ = require("lodash");
var Q = require("q");

module.exports = {
    createNewOrder: function(req, res) {
        var customer_id = req.body.customer_id;
        var products = req.body.products;
        var address_id = req.body.address_id;
        var note = req.body.note;
        var createTextUnique = (new Date()).getTime();
        var total = 0;
        _.forEach(products, product => {
            total += product.quantity * (product.price_wholesale - (product.price_wholesale - product.price_wholesale_promotion));
        });
        models.Order.create({
            customer_id: customer_id,
            address_id: address_id,
            note: note,
            text_id: createTextUnique,
            total: total
        }).then(function(order) {
            // create order_detail
            var listPromises = [];
            _.forEach(products, product => {
                listPromises.push(models.OrderDetail.create({
                    product_id: product.id,
                    price: product.price_wholesale - (product.price_wholesale - product.price_wholesale_promotion),
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
    },
    getYourOrder: function(req, res) {
        var id = req.param("id");
        models.Order.findAll({
            where: {
                customer_id: id,
                status: 1
            },
            order: '"createdAt" DESC'
        }).then(function(yourOrder) {
            res.status(200).send({
                data: yourOrder
            });
        }).catch(function(err) {
            logger("ERROR", err);
            return res.status(400).send({
                error: err
            });
        });
    },
    getMyOrderById: function(req, res) {
        var textId = req.param("text_id");
        models.Order.find({
            where: {
                text_id: textId
            }
        }).then(function(order) {

            // get order detail
            var queryOrderDetail = "select * from order_detail where order_id='" + order.id + "';";

            // get address
            var queryAddress = "select * from useraddress where id=" + order.address_id;

            Q.all([
                models.sequelize.query(queryOrderDetail),
                models.sequelize.query(queryAddress)
            ]).spread(function(orderDetail, address) {
                orderDetail = orderDetail[0];
                address = address[0];
                var resultOrder = order["dataValues"];
                resultOrder.orderDetail = orderDetail;
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
    }
}