/*
* @Author: namhoangvo
* @Date:   2016-04-25 21:01:25
* @Last Modified by:   namhoangvo
* @Last Modified time: 2016-04-25 21:03:35
*/

'use strict';
module.exports = function (sequelize, DataTypes) {
    var ExportNote = sequelize.define("ExportNote", {
        id : {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        date: DataTypes.DATE,
        description: DataTypes.STRING,
        deliver: DataTypes.STRING,
        receiver: DataTypes.STRING
    },
    {
        tableName: 'ExportNote'
    });

    return ExportNote;
}