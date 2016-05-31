"use strict";
module.exports = function(sequelize, DataTypes) {
    var Category = sequelize.define("Category", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING,
        char: DataTypes.CHAR,
        content: DataTypes.STRING,
        parent: DataTypes.INTEGER,
        level: DataTypes.INTEGER,
        status: DataTypes.BOOLEAN,
        icon: DataTypes.STRING,
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        link: DataTypes.STRING,
        logo_image: DataTypes.STRING,
        main_image: DataTypes.STRING,
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        }
    }, {
        tableName: 'categories'
    });
    return Category;
};