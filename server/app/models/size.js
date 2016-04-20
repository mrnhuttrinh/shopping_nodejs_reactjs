"use strict";
module.exports = function(sequelize, DataTypes) {
    var Size = sequelize.define("Size", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING,
        product: DataTypes.INTEGER,
        quantity: DataTypes.INTEGER
    }, {
        tableName: 'sizes'
    });
    return Size;
};