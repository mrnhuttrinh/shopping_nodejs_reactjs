/*
* @Author: namhoangvo
* @Date:   2016-04-25 21:11:10
* @Last Modified by:   namhoangvo
* @Last Modified time: 2016-04-25 21:11:44
*/

'use strict';
module.exports = function (sequelize, DataTypes) {
    var DetailImportNote = sequelize.define("DetailImportNote", {
        import_note_id : {
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
        tableName: 'DetailImportNote'
    });

    return DetailImportNote;
}