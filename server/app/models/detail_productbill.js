/*
* @Author: namhoangvo
* @Date:   2016-04-25 19:57:09
* @Last Modified by:   namhoangvo
* @Last Modified time: 2016-04-25 20:49:17
*/

'use strict';
module.exports = function (sequelize, DataTypes) {
    var DetailProductBill = sequelize.define("DetailProductBill", {
    product_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
    productbill_id : {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
    productbill_date : {
            type: DataTypes.DATE,
            primaryKey: true
        },
        sumout: DataTypes.INTEGER,
        cost:   DataTypes.INTEGER,
        vat:    DataTypes.INTEGER },
    {
        tableName: 'DetailProductBill'
    });

    return DetailProductBill;
}