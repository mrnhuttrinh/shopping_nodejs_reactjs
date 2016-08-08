"use strict";
module.exports = function(sequelize, DataTypes) {
    var Order = sequelize.define("Order", {
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        customer_id: DataTypes.UUID,
        address_id: DataTypes.INTEGER,
        event_id: DataTypes.INTEGER,
        formula_type: DataTypes.INTEGER,
        note: DataTypes.STRING,
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1,
        }
    }, {
        tableName: 'order'
    });
    return Order;
};