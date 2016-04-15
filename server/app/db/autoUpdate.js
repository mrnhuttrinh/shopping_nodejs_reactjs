var timeLeft = 86400;
try {
    // timezone VietName
    var offset = 7;
    var DateVN = new Date( new Date().getTime() + offset * 3600 * 1000).toUTCString().replace( / GMT$/, "" )
    var hour = DateVN.split(" ")[4].split(":")[0];
    // calculate time left for update
    timeLeft = (24 - hour) * 3600;
} catch (e) {

}
//run update db frequently at 0 hours
var timeInterval = timeLeft * 1000;
console.log("Please add logic auto update database")
module.export = setInterval(function() {
    // TODO
}, timeInterval);


