var spawn = require('child_process').spawn;
var gulp = spawn('gulp', ['client']);
gulp.stdout.on('data', (data) => {
  console.log('stdout data', data);
});

gulp.stderr.on('data', (data) => {
  console.log('stderr data', data);
});

gulp.on('close', (code) => {
  console.log('on close', code);
});

"use strict";
/**
 * Module dependencies.
 */
var app = require("./server/app/app");
var http = require("http");
var config = require("./server/app/config");
/**
 * Get port from environment and store in Express.
 */
var port = process.env.PORT || config.server.port;
app.set("port", port);
/**
 * Create HTTP server.
 */
var server = http.createServer(app);
/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== "listen") {
        throw error;
    }
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            process.exit(1);
            break;
        case "EADDRINUSE":
            process.exit(1);
            break;
        default:
            throw error;
    }
}
/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    console.log("App listening on port " + server.address().port);
}