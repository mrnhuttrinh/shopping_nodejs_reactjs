"use strict";
module.exports = function(sequelize, DataTypes) {
    var ProductCategory = sequelize.define("ProductCategory", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        category: DataTypes.INTEGER,
        product: DataTypes.INTEGER
    }, {
        tableName: 'products_category'
    });
    return ProductCategory;
};