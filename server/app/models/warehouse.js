/*
* @Author: namhoangvo
* @Date:   2016-04-25 21:16:26
* @Last Modified by:   namhoangvo
* @Last Modified time: 2016-04-25 21:22:09
*/

'use strict';
module.exports = function (sequelize, DataTypes) {
    var Warehouse = sequelize.define("Warehouse", {
        product_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        datetime_month: DataTypes.INTEGER,
        import_sum: DataTypes.INTEGER,
        export_sum: DataTypes.INTEGER,
        begin_inventory: DataTypes.INTEGER,
        end_inventory: DataTypes.INTEGER
    },
    {
        tableName: 'Warehouse'
    });

    return Warehouse;
}