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
        token: DataTypes.STRING,
        info: DataTypes.STRING,
        fullname: DataTypes.STRING,
        phone: DataTypes.STRING,
        image: DataTypes.STRING,
        gender: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        birthdate: DataTypes.DATE,
        type: {
            type: DataTypes.STRING,
            defaultValue: "Local",
            values: ['Local', 'Facebook', 'Google']
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1,
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