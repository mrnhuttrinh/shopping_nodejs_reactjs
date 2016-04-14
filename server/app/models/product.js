"use strict";
module.exports = function(sequelize, DataTypes) {
    var Product = sequelize.define("Product", {
        id: DataTypes.INTEGER,
        code: DataTypes.STRING,
        name: DataTypes.STRING,
        content: DataTypes.STRING,
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        keywork: DataTypes.STRING,
        price_value: DataTypes.DECIMAL,
        price_promotion: DataTypes.DECIMAL,
        price_currency: DataTypes.STRING,
        created: DataTypes.DATE,
        modified: DataTypes.DATE
    });
    return Product;
};