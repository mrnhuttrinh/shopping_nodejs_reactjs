"use strict";
module.exports = function(sequelize, DataTypes) {
    var Size = sequelize.define("Size", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING,
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        size_id: DataTypes.INTEGER,
        quantity: DataTypes.INTEGER,
        quantity_temp: DataTypes.INTEGER
    }, {
        tableName: 'sizes'
    });
    return Size;
};