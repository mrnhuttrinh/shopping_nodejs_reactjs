"use strict";
module.exports = function(sequelize, DataTypes) {
    var News = sequelize.define("News", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: DataTypes.STRING,
        content: DataTypes.TEXT('long'),
        employer_id: {
            type: DataTypes.UUID,
            allowNull: false
        },
        main_image: DataTypes.STRING,
        show_on_top: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        tableName: 'news'
    });
    return News;
};