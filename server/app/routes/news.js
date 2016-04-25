var models = require("../models");
var _ = require("lodash");
var Q = require("q");
module.exports = {
    getList: function(req, res) {
        var page = req.param("page");
        console.log(page)
        var numberRow = 10;
        var startRow = (page - 1) * 10
        var query = "SELECT id, title FROM news LIMIT " + startRow + ", " + numberRow;
         
        models.sequelize.query(query)
        .then(function(listNews, err) {
            if (err) {
                return res.status(400).send({
                    error: err
                });
            } 
            return res.status(200).send({
                data: listNews[0]
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
        }).then(function(result, err) {
            if (err) {
                return res.status(400).send({
                    error: err
                });
            }
            return res.status(200).send({
                data: result
            });
        })
    }
};
