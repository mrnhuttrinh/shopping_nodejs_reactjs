/*
* @Author: namhoangvo
* @Date:   2016-04-25 21:04:09
* @Last Modified by:   namhoangvo
* @Last Modified time: 2016-04-25 21:09:22
*/

'use strict';
module.exports = function (sequelize, DataTypes) {
    var DetailExportNote = sequelize.define("DetailExportNote", {
        export_note_id : {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        product_id : {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        sum: DataTypes.INTEGER,
        cost: DataTypes.INTEGER,
        vat: DataTypes.INTEGER
    },
    {
        tableName: 'DetailExportNote'
    });

    return DetailExportNote;
}