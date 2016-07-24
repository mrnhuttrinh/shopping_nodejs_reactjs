"use strict";
module.exports = function(sequelize, DataTypes) {
    var Product = sequelize.define("Product", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING,
        code: DataTypes.STRING,
        thumbnail: DataTypes.STRING,
        price_retail: DataTypes.DECIMAL,
        price_retail_promotion: DataTypes.DECIMAL,
        price_wholesale: DataTypes.DECIMAL,
        price_wholesale_promotion: DataTypes.DECIMAL,
        color: DataTypes.STRING,
        trademark_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null
        },
        rate: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        description: DataTypes.STRING,
        description_detail: DataTypes.TEXT,
        tech_information: DataTypes.TEXT,
        text_link: DataTypes.STRING,
        employer_id: {
            type: DataTypes.UUID,
            allowNull: false
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        tableName: 'products'
    });
    return Product;
};