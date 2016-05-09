var models = require("../models");
var logger = require("../logger")
var _ = require("lodash");
var Q = require("q");
module.exports = {
    getList: function(req, res) {
        var query = "SELECT * FROM trademarks WHERE status = 1 ORDER BY createdAt DESC";
        models.sequelize.query(query)
        .then(function(listTM) {
            return res.status(200).send({
                data: listTM[0]
            });
        }).catch(function(err) {
            logger("ERROR", err);
            return res.status(400).send({
                error: err
            });
        });
    },
    createTradeMark: function(req, res) {
        var data = req.body.data;
        models.TradeMark.find({
            where: {
                name: data.name,
                phone: data.phone
            }
        }).then(function(findTrademark) {
            if(findTrademark) {
                return res.status(400).send({
                    error: {
                        message: "Nhà Cung Cấp Đã Tồn Tại!"
                    }
                });
            } else {
                models.TradeMark.create({
                    name: data.name,
                    address: data.address,
                    phone: data.phone,
                    email: data.email,
                    detail: data.detail
                }).then(function(result) {
                    return res.status(200).send(result);
                }).catch(function(err) {
                    logger("ERROR", err);
                    return res.status(400).send({
                        error: err
                    })
                });
            }
        }).catch(function(err) {
            logger("ERROR", err);
            return res.status(400).send({
                error: err
            });
        });
    },
    getTradeMarkById: function(req, res) {
        var id = req.param("id");
        models.TradeMark.find({
            where: {
                id: id
            }
        }).then(function(result) {
            return res.status(200).send({
                data: result
            })
        }).catch(function(err) {
            logger("ERROR", err);
            return res.status(400).send({
                error: err
            })
        })
    },
    deleteTradeMark: function(req, res) {
        var id = req.body.id;
        var query = "UPDATE trademarks SET status = 0 WHERE id = " + id;
        models.sequelize.query(query)
            .spread(function(result) {
                return res.status(200).send();
            })
            .catch(function(err) {
                logger("ERROR", err);
                return res.status(400).send({
                    error: err
                })
            })
    },
    updateTradeMark: function(req, res) {
        var data = req.body.data;
        var query = "UPDATE trademarks SET "
            + " name = '" + data.name + "' "
            + " address = '" + data.address + "' "
            + " phone = '" + data.phone + ", "
            + " email = '" + data.email + ", " 
            + " detail = '" + data.detail + "' "
            + " WHERE id = " + data.id;
        models.sequelize.query(query)
            .spread(function(result) {
                return res.status(200).send();
            })
            .catch(function(err) {
                logger("ERROR", err);
                return res.status(400).send({
                    error: err
                })
            })
    }
};
