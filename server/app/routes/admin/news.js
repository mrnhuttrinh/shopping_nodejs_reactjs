var models = require("../../models");
var logger = require("../../logger");
var uuid = require("../../utils/uuid");
var config = require("../../config");
var toImage = require("../../utils/toImage");
var _ = require("lodash");
var Q = require("q");
module.exports = {
    getList: function(req, res) {
        var page = req.param("page");
        var numberRow = 10;
        var startRow = (page - 1) * 10
        var search = req.param("search");
        var query = "";
        if (search) {
            var conditionExtend = " AND (title like '%" + search + "%') ";
            query = "SELECT id, title, show_on_top, status FROM news " + conditionExtend + " ORDER BY createdAt DESC LIMIT " + startRow + ", " + numberRow;
        } else {
            query = "SELECT id, title, show_on_top, status FROM news ORDER BY createdAt DESC LIMIT " + startRow + ", " + numberRow;
        }
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
        var search = req.param("search");
        var query = "";
        if (search) {
            var conditionExtend = " AND (title like '%" + search + "%') ";
            query = "SELECT count(id) as total FROM news " + conditionExtend;
        } else {
            query = "SELECT count(id) as total FROM news";
        }
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

        var image = data.main_image;
        var dataImage = image.split(";");
        var imageType = (dataImage[0]).split("/")[1];
        var imageFilePath = config.adminImage + uuid() + "." + imageType;

        toImage(dataImage[1], imageFilePath, config.adminPath);
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
                    employer_id: employer.id,
                    main_image: imageFilePath
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
                employer_id: employer.id,
                main_image: imageFilePath
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
        var status = req.body.status;
        var show_on_top = req.body.show_on_top;
        var query = "UPDATE news SET status = " + status + " WHERE id = " + id;
        // reset show on top if new disable
        if (!status) {
            query = "UPDATE news SET status = " + status + ", show_on_top=0 WHERE id = " + id;
        }
        
        models.sequelize.query(query)
            .spread(function(result) {
                return res.status(200).send();
            })
            .catch(function(err) {
                logger("ERROR", err);
                return res.status(400).send({
                    error: err
                });
            });
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
                        return res.status(200).send();
                    })
                    .catch(function(err) {
                        logger("ERROR", err);
                        return res.status(400).send({
                            error: err
                        });
                    })
                } else {
                    return res.status(200).send();
                }
            })
            .catch(function(err) {
                logger("ERROR", err);
                return res.status(400).send({
                    error: err
                });
            });
    }
};
