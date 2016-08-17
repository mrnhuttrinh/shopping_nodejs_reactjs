var models = require("../../models");
var logger = require("../../logger")
var _ = require("lodash");
var Q = require("q");

module.exports = {
    filterOrder: function(req, res) {
        var orderId = req.body.order_id;
        var productName = req.body.product_name;
        var customerName = req.body.customer_name;
        var categoryId = req.body.category_id;
        var dateStart = req.body.date_stard;
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
        query += " Inner Join products ON order_detail.product_id = products.id ";
        query += " Inner Join `user` ON `order`.customer_id = `user`.id ";
        query += " Inner Join products_category ON products.id = products_category.product_id ";
        query += " Inner Join categories ON products_category.category_id = categories.id ";
        query += " Where "
        var condition = [];
        if (orderId) {
            condition.push(" `order`.id = " + orderId + " ");
        }
        if (productName) {
            condition.push(" `products`.name like '%" + productName + "%'' ");
        }
        if (customerName) {
            condition.push(" `user`.fullname like '%" + customerName + "%'' ");
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
            models.OrderDetail.findAll({
                where: {
                    order_id: order.id
                }
            }).then(function(orderDetail) {
                var resultOrder = order["dataValues"];
                resultOrder.orderDetail = orderDetail;
                console.log(resultOrder);
                res.status(200).send({
                    data: resultOrder
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
        
    }
};
