"use strict";
var express = require("express");
var Constrains = require("./constrains");
var router = express.Router();

router.use("/", (req, res, next) => {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});

module.exports = router;