"use strict";
module.exports = function(sequelize, DataTypes) {
    var Employer = sequelize.define("Employer", {
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        username: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        level: DataTypes.INTEGER,
        info: DataTypes.STRING,
        fullname: DataTypes.STRING,
        address: DataTypes.STRING,
        phone: DataTypes.STRING,
        image: DataTypes.STRING,
        birthdate: DataTypes.DATE,
        hiredate: {
            type: DataTypes.DATE,
            defaultValue: new Date()
        },
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
        tableName: 'employers'
    });

    return Employer;
};