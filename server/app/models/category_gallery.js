"use strict";
module.exports = function(sequelize, DataTypes) {
    var CategoryGallery = sequelize.define("CategoryGallery", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        image: DataTypes.STRING,
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        link: DataTypes.STRING,
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        tableName: 'category_galleries'
    });
    return CategoryGallery;
};