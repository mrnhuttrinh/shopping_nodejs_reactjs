"use strict";
module.exports = function(sequelize, DataTypes) {
    var TradeMark = sequelize.define("TradeMark", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING,
        detail: DataTypes.TEXT
    }, {
        tableName: 'trademarks'
    });
    return TradeMark;
};