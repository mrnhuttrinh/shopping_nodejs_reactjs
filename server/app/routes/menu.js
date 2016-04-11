var getDataSample = require("../data_sample");
module.exports = {
    get: function(req, res) {
        res.send(getDataSample("menu_fly.json"))
    }
};
