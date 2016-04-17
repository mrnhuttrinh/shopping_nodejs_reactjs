var fs = require("fs");
var path = require("path");
var configGlobal = require("../config");

/**
 * [exports description]
 * @param  {[type]} rawBody   [description]
 * @param  {[type]} localFile [description]
 * @param  {[type]} agent     branch local on dish of web site 
 *                            example: /admin response to /admin 
 *                            or /shop to /
 * @return {[type]}           [description]
 */
module.exports = function(rawBody, localFile, agent) {
    //jpg|jpeg|png|gif
    base64Data = rawBody.replace(/^base64,/, "");
    var fileOnDisk = path.join(configGlobal._globalPath, agent, localFile);
    // if (!fs.existsSync(fileOnDisk)){
    //     fs.mkdirSync(fileOnDisk);
    // }
    fs.writeFile(fileOnDisk, base64Data, 'base64', function(err) {
        console.log(err);
    });
}