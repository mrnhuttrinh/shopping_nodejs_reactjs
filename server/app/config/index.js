var env = process.env.NODE_ENV || "development";
var path = require("path");
var fs = require("fs");
var configFile = path.join(__dirname, '..', 'config', 'config.json');
var config = JSON.parse(fs.readFileSync(configFile, "utf8"))[env];
module.exports = config;