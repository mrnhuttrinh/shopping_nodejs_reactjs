"use strict";
module.exports = function(sequelize, DataTypes) {
    var News = sequelize.define("News", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: DataTypes.STRING,
        content: DataTypes.TEXT,
        employer_id: {
            type: DataTypes.UUID,
            allowNull: false
        },
    }, {
        tableName: 'news'
    });
    return News;
};