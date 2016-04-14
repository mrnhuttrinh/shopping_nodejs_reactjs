var express = require('express');
var router  = express.Router();
var authorized = require("../authorized");

var admin = require("./admin");
var menu = require("./menu");

// for admin
router.post('/signin_employer', admin.signin);
router.post('/create_employer', admin.create);
router.get('/all_employer', authorized, admin.getAllUser);

// for client
router.get("/menu", menu.get);

module.exports = router;
