/*
* @Author: namhoangvo
* @Date:   2016-04-25 20:21:54
* @Last Modified by:   namhoangvo
* @Last Modified time: 2016-04-25 20:39:56
*/

'use strict';
module.exports = function (sequelize, DataTypes) {
    var Order = sequelize.define("Order", {
        id : {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        date : {
            type: DataTypes.DATE,
            primaryKey: true
        },
        description: DataTypes.STRING,
        customer_id : {
        type: Sequelize.INTEGER,
        references: {
            // This is a reference to another model
            model: Customer,

            // This is the column name of the referenced model
            key: 'id',
            }
        }
    },
    {
        tableName: 'Order'
    });

    return Order;
}