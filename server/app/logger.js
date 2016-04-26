var log4js = require('log4js'); 
log4js.loadAppender('file');
var config = require("./config");
log4js.addAppender(log4js.appenders.file(config.logs.file), '---->');
var logger = log4js.getLogger('---->');
logger.setLevel('ERROR');
module.exports = function(LEVEL, data) {
    var stringData = JSON.stringify(data);
    switch(LEVEL) {
        case "TRACE":
            logger.trace(stringData);
        break;
        case "DEBUG":
            logger.debug(stringData);
        break;
        case "INFO":
            logger.info(stringData);
        break;
        case "WARN":
            logger.warn(stringData);
        break;
        case "ERROR":
            logger.error(stringData);
        break;
        case "FATAL":
            logger.fatal(stringData);
        break;
    }
}
