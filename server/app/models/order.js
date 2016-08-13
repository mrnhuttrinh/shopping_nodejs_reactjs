"use strict";
module.exports = function(sequelize, DataTypes) {
    var Order = sequelize.define("Order", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        text_id: DataTypes.STRING,
        customer_id: DataTypes.UUID,
        address_id: DataTypes.INTEGER,
        event_id: DataTypes.INTEGER,
        formula_type: DataTypes.INTEGER,
        note: DataTypes.STRING,
        total: DataTypes.DECIMAL,
        completed: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0,
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1,
        }
    }, {
        tableName: 'order'
    });
    return Order;
};