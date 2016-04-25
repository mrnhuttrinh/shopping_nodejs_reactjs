/*
* @Author: namhoangvo
* @Date:   2016-04-25 21:10:13
* @Last Modified by:   namhoangvo
* @Last Modified time: 2016-04-25 21:10:40
*/

'use strict';
module.exports = function (sequelize, DataTypes) {
    var ImportNote = sequelize.define("ImportNote", {
        id : {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        date: DataTypes.DATE,
        description: DataTypes.STRING
    },
    {
        tableName: 'ImportNote'
    });

    return ImportNote;
}