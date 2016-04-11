var path = require("path");
var fs = require("fs");

module.exports = function(datasample) {
    var dataFile = path.join(__dirname, '..', 'data_sample', datasample);
    return JSON.parse(fs.readFileSync(dataFile, "utf8"));
};