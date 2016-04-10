/*jshint node: true */
"use strict";

var express = require("express");
var morgan = require("morgan");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var cors = require("cors");

var Constrains = require("./constrains");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

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

// catch 404 and forward to error handler
app.use( function(req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// production error handler
// no stacktraces leaked to user
app.use( function(err, req, res) {
    res.status(err.status || 500);
    res.render("error", {
        message: err.message,
        error: (app.get('env') === 'development') ? err : {}
    });
});

module.exports = app;
