"use strict";
module.exports = function(sequelize, DataTypes) {
    var ProductGallery = sequelize.define("ProductGallery", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        image: DataTypes.STRING,
        product_id: DataTypes.INTEGER,
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        tableName: 'product_galleries'
    });
    return ProductGallery;
};