"use strict";
module.exports = function(sequelize, DataTypes) {
    var UserAddress = sequelize.define("UserAddress", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false
        },
        gender: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        birthdate: DataTypes.DATE,
        fullname: DataTypes.STRING,
        phone: DataTypes.STRING,
        homeno: DataTypes.STRING,
        street: DataTypes.STRING,
        building: DataTypes.STRING,
        ward: DataTypes.STRING,
        district: DataTypes.STRING,
        province: DataTypes.STRING,
        type: {
            type: DataTypes.ENUM,
            values: ['Home', 'Office', 'Extract']
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1,
        }
    }, {
        tableName: 'UserAddress'
    });

    return UserAddress;
};