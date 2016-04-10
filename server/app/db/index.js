//Including dependency
var Sequelize = require("sequelize");
var config = require("../config");
var database = config.datastores;

//Setting up the config
module.exports = new Sequelize(
    database.database, 
    database.username, 
    database.password, {
        host: database.host,
        dialect: database.dialect
    }
);