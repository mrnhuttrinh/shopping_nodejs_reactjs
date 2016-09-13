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
    },
    getYourOrder: function(req, res) {
        var id = req.param("id");
        models.Order.findAll({
            where: {
                customer_id: id
            }
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
    }
}