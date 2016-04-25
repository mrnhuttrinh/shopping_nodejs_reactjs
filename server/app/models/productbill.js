/*
* @Author: namhoangvo
* @Date:   2016-04-25 20:15:50
* @Last Modified by:   namhoangvo
* @Last Modified time: 2016-04-25 20:32:40
*/

'use strict';
module.exports = function (sequelize, DataTypes) {
    var ProductBill = sequelize.define("ProductBill", {
        id : {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        date : {
            type: DataTypes.DATE,
            primaryKey: true
        },
        deliver:  DataTypes.STRING,
        receiver: DataTypes.STRING
    },
    {
        tableName: 'ProductBill'
    });

    return ProductBill;
}