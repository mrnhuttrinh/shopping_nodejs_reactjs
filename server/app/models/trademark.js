"use strict";
module.exports = function(sequelize, DataTypes) {
    var TradeMark = sequelize.define("TradeMark", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING,
        address: DataTypes.TEXT,
        phone: DataTypes.STRING,
        email: DataTypes.STRING,
        detail: DataTypes.TEXT,
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        tableName: 'trademarks'
    });
    return TradeMark;
};