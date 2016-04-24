"use strict";
module.exports = function(sequelize, DataTypes) {
    var News = sequelize.define("News", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: DataTypes.STRING,
        content: DataTypes.TEXT
    }, {
        tableName: 'news'
    });
    return News;
};