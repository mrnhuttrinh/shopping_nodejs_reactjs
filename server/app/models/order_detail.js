"use strict";
module.exports = function(sequelize, DataTypes) {
    var OrderDetail = sequelize.define("OrderDetail", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        order_id: DataTypes.INTEGER,
        product_id: DataTypes.INTEGER,
        price: DataTypes.INTEGER,
        quantity: DataTypes.INTEGER,
        size: DataTypes.STRING,
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1,
        }
    }, {
        tableName: 'order_detail'
    });
    return OrderDetail;
};