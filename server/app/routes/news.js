var models = require("../models");
var logger = require("../logger")
var _ = require("lodash");
var Q = require("q");
module.exports = {
    getList: function(req, res) {
        var page = req.param("page");
        var numberRow = 10;
        var startRow = (page - 1) * 10
        var query = "SELECT id, title FROM news WHERE status = 1 LIMIT " + startRow + ", " + numberRow;
         
        models.sequelize.query(query)
        .then(function(listNews) {
            return res.status(200).send({
                data: listNews[0]
            });
        }).catch(function(err) {
            logger("ERROR", err);
            return res.status(400).send({
                error: err
            });
        });
    },
    getTotalNews: function(req, res) {
        var query = "SELECT count(id) as total FROM news WHERE status = 1";
         
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
    },
    createNews: function(req, res) {
        var data = req.body.data;
        var employer = req.userToken.employer;
        models.News.create({
            title: data.title,
            content: data.content,
            employer_id: employer.id
        }).then(function(result) {
            return res.status(200).send({
                data: result
            });
        }).catch(function(err) {
            logger("ERROR", err);
            return res.status(400).send({
                error: err
            });
        });
    },
    getNewsById: function(req, res) {
        var id = req.param("id");
        models.News.find({
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
    deleteNews: function(req, res) {
        var id = req.body.id;
        var query = "UPDATE news SET status = 0 WHERE id = " + id;
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
