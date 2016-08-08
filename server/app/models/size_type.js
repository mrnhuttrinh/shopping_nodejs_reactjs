"use strict";
module.exports = function(sequelize, DataTypes) {
    var SizeType = sequelize.define("SizeType", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING,
        up_price: DataTypes.DECIMAL
    }, {
        tableName: 'size_type'
    });
    return SizeType;
};