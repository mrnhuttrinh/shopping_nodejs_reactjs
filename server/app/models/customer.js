/*
* @Author: namhoangvo
* @Date:   2016-04-25 20:52:23
* @Last Modified by:   namhoangvo
* @Last Modified time: 2016-04-25 20:54:26
*/

'use strict';
module.exports = function (sequelize, DataTypes) {
    var Customer = sequelize.define("Customer", {
        id : {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        name: DataTypes.STRING,
        address: DataTypes.STRING,
        phone: DataTypes.STRING,
        code_tax: DataTypes.STRING,
        email: DataTypes.STRING
    },
    {
        tableName: 'Customer'
    });

    return Customer;
}