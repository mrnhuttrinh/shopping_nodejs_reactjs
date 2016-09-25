/*jshint node: true */
"use strict";

// var ReactRouter = require("react-router")''
// var Router = ReactRouter.Router;

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

// view engine setup
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'jade');

// passport
// Configuring Passport
var passport = require('passport');
var expressSession = require('express-session');
// TODO - Why Do we need this key ?
app.use(expressSession({secret: configGlobal.secret}));
app.use(passport.initialize());
app.use(passport.session());

// other
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

// app.get('*', function (req, res) {
//     // This wildcard method handles all requests
//     Router.run(routes, req.path, function (Handler, state) {
//         var element = React.createElement(Handler);
//         var html = React.renderToString(element);
//         res.render('index', { content: html });
//     });
// });
// 

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

// Initialize Passport
// open Auth
var initPassport = require('./passport/init');
initPassport(passport);
var auth = require("./routes/auth");
app.use(Constrains.ROUTE.AUTH, auth(passport));

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', function (request, response){
    response.sendFile(path.resolve(__dirname, 'public/shop', 'index.html'));
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
