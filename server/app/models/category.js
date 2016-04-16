"use strict";
module.exports = function(sequelize, DataTypes) {
    var Category = sequelize.define("Category", {
        id: DataTypes.INTEGER,
        name: DataTypes.STRING.
        char: DataTypes.CHAR
        content: DataTypes.STRING,
        parent: DataTypes.INTEGER,
        level: DataTypes.INTEGER,
        status: DataTypes.BOOLEAN,
        icon: DataTypes.STRING,
        title: DataTypes.STRING,
        description: DataTypes.STRING
    });
    return Category;
};