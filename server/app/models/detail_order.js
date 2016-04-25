/*
* @Author: namhoangvo
* @Date:   2016-04-25 20:45:36
* @Last Modified by:   namhoangvo
* @Last Modified time: 2016-04-25 20:50:19
*/

'use strict';
module.exports = function (sequelize, DataTypes) {
    var DetailOrder = sequelize.define("DetailOrder", {
        product_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        order_id : {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        order_date : {
            type: DataTypes.DATE,
            primaryKey: true
        },
        sum: DataTypes.INTEGER,
        cost: DataTypes.INTEGER
    },
    {
        tableName: 'DetailOrder'
    });

    return DetailOrder;
}