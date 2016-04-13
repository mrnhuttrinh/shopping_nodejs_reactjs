var express = require('express');
var router  = express.Router();
var authorized = require("../authorized");

var authenticate = require("./authenticate");
var menu = require("./menu");

router.post('/signin', authenticate.signin);
router.get('/me', authorized, authenticate.me);

router.get("/menu", menu.get);

module.exports = router;
