var models = require("../models");
var logger = require("../logger")
var _ = require("lodash");
var Q = require("q");
module.exports = {
    getList: function(req, res) {
        var page = req.param("page");
        var numberRow = 10;
        var startRow = (page - 1) * 10
        var query = "SELECT id, title, show_on_top FROM news WHERE status = 1 ORDER BY createdAt DESC LIMIT " + startRow + ", " + numberRow;
         
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
        var show_on_top = data.show_on_top;
        if (show_on_top) {
            // if select show on top will be update set other row
            // re-set show on top for new row
            var query = "UPDATE news SET show_on_top = 0";
            models.sequelize.query(query)
            .spread(function() {
                models.News.create({
                    title: data.title,
                    content: data.content,
                    show_on_top: 1,
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
            })
            .catch(function(err) {
                logger("ERROR", err);
                return res.status(400).send({
                    error: err
                })
            })
        } else {
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
        }
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
    },
    updateShowOnTop: function(req, res) {
        var id = req.body.id;
        var show_on_top = req.body.show_on_top;
        // set all news showontop = false
        var query = "UPDATE news SET show_on_top = 0";
            models.sequelize.query(query)
            .spread(function() {
                // re-set show on top on this row
                if (show_on_top) {
                    var queryUpdate = "UPDATE news SET show_on_top = 1 WHERE id=" + id;
                    models.sequelize.query(queryUpdate)
                    .spread(function() {
                        return res.status(200).send()
                    })
                    .catch(function(err) {
                        logger("ERROR", err);
                        return res.status(400).send({
                            error: err
                        })
                    })
                } else {
                    return res.status(200).send()
                }
            })
            .catch(function(err) {
                logger("ERROR", err);
                return res.status(400).send({
                    error: err
                })
            })
    }
};
