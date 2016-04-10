var express = require('express');
var router  = express.Router();

var authenticate = require("./authenticate");

router.get('/', authenticate.signin);

module.exports = router;
