var express = require('express');
var router  = express.Router();

var authenticate = require("./authenticate");
var menu = require("./menu");

router.get('/', authenticate.signin);
router.get("/menu", menu.get);

module.exports = router;
