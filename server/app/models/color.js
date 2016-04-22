"use strict";
module.exports = function(sequelize, DataTypes) {
    var Color = sequelize.define("Color", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING,
        product: DataTypes.INTEGER
    }, {
        tableName: 'colors'
    });
    return Color;
};