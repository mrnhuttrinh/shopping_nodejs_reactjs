var express = require('express');
var router  = express.Router();
var authorized = require("../authorized");

var auth_employer = require("./auth_employer");
var menu = require("./menu");

// for employer
router.post('/signin_employer', auth_employer.signin);
router.post('/create_employer', auth_employer.create);

router.get("/menu", menu.get);

module.exports = router;
