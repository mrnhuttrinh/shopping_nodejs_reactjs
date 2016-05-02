/*jshint node: true */
"use strict";

var express = require("express");
var morgan = require("morgan");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var cors = require("cors");
var fs = require("fs-extra");

var Constrains = require("./constrains");
var configGlobal = require("./config");
configGlobal._globalPath = __dirname;
var logger = require("./logger");
var app = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public/shop")));
app.use("/admin", express.static(path.join(__dirname, "public/admin")));
// app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.disable('etag');

// show log
app.use(morgan("dev"));
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

/**
 * Routers api
 */
var routes = require('./routes/index');
app.use(Constrains.ROUTE.API.INDEX, routes);
 
// index
app.get(Constrains.ROUTE.INDEX, function(req, res) {
    res.sendFile(path.join(__dirname, "public/shop/index.html"));
});

// admin
app.get(Constrains.ROUTE.ADMIN, function(req, res) {
    res.sendFile(path.join(__dirname, "public/admin/index.html"));
});


// catch 404 and forward to error handler
app.use( function(req, res) {
    res.sendFile(path.join(__dirname, "public/shop/notfound.html"));
});

// production error handler
// no stacktraces leaked to user
app.use( function(err, req, res) {
    res.status(err.status || 500);
    logger("ERROR", err)
    res.render("error", {
        message: err.message,
        error: (app.get('env') === 'development') ? err : {}
    });
});

var autoUpdateDB = require("./db/autoUpdate");
module.exports = app;
