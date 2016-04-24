var models = require("../models");
var _ = require("lodash");
var Q = require("q");
module.exports = {
    getList: function(req, res) {
        models.News.findAll()
        .then(function(listNews, err) {
            if (err) {
                return res.status(400).send({
                    error: err
                });
            } 
            return res.status(200).send({
                data: listNews
            });
        });
    }
};
