"use strict";
module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        username: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        info: DataTypes.STRING,
        fullname: DataTypes.STRING,
        address: DataTypes.STRING,
        phone: DataTypes.STRING,
        address2: DataTypes.STRING,
        phone: DataTypes.STRING,
        image: DataTypes.STRING,
        gender: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        birthdate: DataTypes.DATE,
        type: DataTypes.STRING,
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        }
    }, {
        instanceMethods: {
            validPassword: function(password) {
                if (this.password === password) {
                    return true;
                }
                return false;
            }
        },
        tableName: 'User'
    });

    return User;
};