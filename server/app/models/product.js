"use strict";
module.exports = function(sequelize, DataTypes) {
    var Product = sequelize.define("Product", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        category: DataTypes.INTEGER,
        name: DataTypes.STRING,
        code: DataTypes.STRING,
        thumbnail: DataTypes.STRING,
        price_retail: DataTypes.DECIMAL,
        price_retail_promotion: DataTypes.DECIMAL,
        price_wholesale: DataTypes.DECIMAL,
        price_wholesale_promotion: DataTypes.DECIMAL,
        sizeS: DataTypes.INTEGER,
        sizeM: DataTypes.INTEGER,
        sizeX: DataTypes.INTEGER,
        color: DataTypes.STRING,
        trademark: DataTypes.STRING,
        description: DataTypes.STRING,
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        tableName: 'products'
    });
    return Product;
};