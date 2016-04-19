"use strict";
module.exports = function(sequelize, DataTypes) {
    var Size = sequelize.define("Size", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        name: DataTypes.STRING,
        product: DataTypes.INTEGER
    }, {
        tableName: 'sizes'
    });
    return Size;
};