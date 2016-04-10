var gulp = require("gulp");
var del = require("del");
var jshint = require("gulp-jshint");
var cache = require("gulp-cached");
var react = require("gulp-react");
var jscs = require("gulp-jscs");

// Load plugins
var $ = require("gulp-load-plugins")();
var browserify = require("browserify");
var watchify = require("watchify");
var reactify = require('reactify'); 
var babelify = require('babelify');
var source = require("vinyl-source-stream");
var browserSync = require("browser-sync");
var rename = require("gulp-rename");

var minifyCSS = require("gulp-minify-css");
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');

// Config client
var reload = browserSync.reload;
var sourceFile = "./client/app/scripts/app.js";

// clean dist foler
gulp.task("clean", function(callback) {
    $.cache.clearAll();
    callback(del.sync(["server/app/public"]));
});

// build app script js
gulp.task("buildScripts", function() {
    return browserify(sourceFile)
        .require("react")
        .bundle()
        .pipe(source("app.js"))
        .pipe(gulp.dest("server/app/public/scripts"));
});

// copy file html from app dev to dist folder
gulp.task("html", function() {
    return gulp.src("client/app/*.html")
        .pipe(gulp.dest("server/app/public"));
});

// copy file js extend to vendor folder
gulp.task("vendor", function() {
    return gulp.src("./bower_components/**")
        .pipe(gulp.dest("server/app/public/vendor"));
});

gulp.task("fonts", function() {
    return gulp.src(["./client/app/fonts/**/*.*"], { base: "./client/app/fonts/" })
        .pipe(gulp.dest("server/app/public/fonts"));
});

gulp.task("styles", function() {
    return $.rubySass(
            ["./client/app/styles/**/*.sass"],
            {
                style: "expanded",
                precision: 10,
                loadPath: ["app/bower_components","node_modules"]
            }
        )
        .pipe($.autoprefixer("last 1 version"))
        .pipe(gulp.dest("client/app/css/"))
        .pipe($.size())
        .pipe(rename({suffix: ".min"}))
        .pipe(gulp.dest("server/app/public/styles"));;
});

// gulp.task("styles", function() {
//     return $.rubySass(
//             ["./client/app/styles/**/*.sass"],
//             {
//                 style: "expanded",
//                 precision: 10,
//                 loadPath: ["app/bower_components","node_modules"]
//             }
//         )
//         .pipe($.autoprefixer("last 1 version"))
//         .pipe(gulp.dest("client/app/css/"))
//         .pipe($.size())
//         .pipe(rename({suffix: ".min"}))
//         .pipe(minifyCSS())
//         .pipe(gulp.dest("server/app/public/styles"));;
// });

gulp.task("copyCss",["clean"], function(){
    return gulp.src(["./client/app/css/**/*.css"], { base: "./client/app/css/" })
        .pipe(gulp.dest("server/app/public/styles"));
});

gulp.task("js", function() {
    return gulp.src(["./client/app/js/**/*.*"], { base: "./client/app/js/" })
        .pipe(gulp.dest("server/app/public/js"));
});


gulp.task("images", function() {
    return gulp.src(["./client/app/images/**/*.*"], { base: "./client/app/img/" })
        .pipe(gulp.dest("server/app/public/images"));
});

gulp.task("extras", function() {
    return gulp.src(["app/*.txt", "app/*.ico"])
        .pipe(gulp.dest("server/app/public/"))
        .pipe($.size());
});

gulp.task("assets", ["vendor", "js", "fonts", "images", "extras", "styles", "html", "copyCss"]);
// ---

gulp.task("watch", ["dev", "assets"], function() {

    browserSync({
        notify: false,
        logPrefix: "BS",
        // Run as an https by uncommenting "https: true"
        // Note: this uses an unsigned certificate which on first access
        // will present a certificate warning in the browser.
        server: ["server/app/public", "app"]
    });

    // Watch .html files
    gulp.watch("client/app/*.html", reload);

    gulp.watch(["client/app/styles/**/*.css"], ["styles", reload]);

    // Watch image files
    gulp.watch("client/app/images/**/*", reload);
});

var bundler = watchify(browserify({
    entries: [sourceFile],
    debug: true,
    insertGlobals: true,
    cache: {},
    packageCache: {},
    fullPaths: true
}).transform("babelify", {
    extensions: [".babel"]
}));

bundler.on("update", rebundle);
bundler.on("log", $.util.log);

function rebundle() {
    return bundler.bundle()
        // log errors if they happen
        .on("error", $.util.log.bind($.util, "Browserify Error"))
        .pipe(source("app.js"))
        .pipe(gulp.dest("./server/app/public/scripts"))
        .on("end", function() {
            reload();
        });
}

gulp.task("dev", rebundle);

// build all app
gulp.task("build", ["buildScripts", "assets"], function() {
    gulp.src("server/app/public/scripts/app.js")
        .pipe($.uglify())
        .pipe($.stripDebug())
        .pipe(gulp.dest("server/app/public/scripts"));
});

// Default task
gulp.task("client", ["clean", "build"]);