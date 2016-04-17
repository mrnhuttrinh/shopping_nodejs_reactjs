var express = require('express');
var router  = express.Router();
var authorized = require("../authorized");

var admin = require("./admin");
var menu = require("./menu");

// for admin
router.post('/signin_employer', admin.signin);
router.get('/get_me', authorized, admin.me);
router.post('/create_employer',authorized, admin.create);
router.get('/all_employer', authorized, admin.getAllUser);

router.post('/upload_employer_photo', authorized, admin.uploadEmployerPhoto)

// for client
router.get("/menu", menu.get);

module.exports = router;
