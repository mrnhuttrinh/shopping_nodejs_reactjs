"use strict";
module.exports = function(sequelize, DataTypes) {
    var ProductCategory = sequelize.define("ProductCategory", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'products_category'
    });
    return ProductCategory;
};