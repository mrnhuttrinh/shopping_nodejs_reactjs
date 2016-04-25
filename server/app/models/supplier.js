/*
* @Author: namhoangvo
* @Date:   2016-04-25 21:12:29
* @Last Modified by:   namhoangvo
* @Last Modified time: 2016-04-25 21:15:49
*/

'use strict';
module.exports = function (sequelize, DataTypes) {
    var Supplier = sequelize.define("Supplier", {
        id : {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        name: DataTypes.STRING,
        address: DataTypes.STRING,
        phone: DataTypes.STRING,
        email: DataTypes.STRING,
        code_tax: DataTypes.STRING
    },
    {
        tableName: 'Supplier'
    });

    return Supplier;
}