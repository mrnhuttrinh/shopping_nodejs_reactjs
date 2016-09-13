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

// Task for shop
var publicFolder = "server/app/public/shop";

// clean dist foler
gulp.task("clean", function(callback) {
    $.cache.clearAll();
    callback(del.sync([publicFolder]));
});

// build app script js
gulp.task("buildScripts", function() {
    return browserify(sourceFile)
        .require("react")
        .bundle()
        .pipe(source("app.js"))
        .pipe(gulp.dest(publicFolder + "/scripts"));
});

// copy file html from app dev to dist folder
gulp.task("html", function() {
    return gulp.src("client/app/*.html")
        .pipe(gulp.dest(publicFolder));
});

// copy file js extend to vendor folder
gulp.task("vendor", function() {
    return gulp.src("./bower_components/**")
        .pipe(gulp.dest(publicFolder + "/vendor"));
});

gulp.task("fonts", function() {
    return gulp.src(["./client/app/fonts/**/*.*"], { base: "./client/app/fonts/" })
        .pipe(gulp.dest(publicFolder + "/fonts"));
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
//         .pipe(gulp.dest(publicFolder + "/styles"));;
// });
// 
gulp.task("styles", function() {
    return gulp.src(["./client/app/css/**/*.*"], { base: "./client/app/css/" })
        .pipe(rename({suffix: ".min"}))
        .pipe(gulp.dest(publicFolder + "/css"));
});

gulp.task("copyCss", function(){
    return gulp.src(["./client/app/css/**/*.css"], { base: "./client/app/css/" })
        .pipe(gulp.dest(publicFolder + "/styles"));
});

gulp.task("js", function() {
    return gulp.src(["./client/app/js/**/*.*"], { base: "./client/app/js/" })
        .pipe(gulp.dest(publicFolder + "/js"));
});


gulp.task("images", function() {
    return gulp.src(["./client/app/images/**/*"], { base: "./client/app/images/" })
        .pipe(gulp.dest(publicFolder + "/images"));
});

gulp.task("extras", function() {
    return gulp.src(["app/*.txt", "app/*.ico"])
        .pipe(gulp.dest(publicFolder + "/"))
        .pipe($.size());
});

gulp.task("assets", ["vendor", "js", "fonts", "images", "extras", "styles", "html", "copyCss"]);
// ---

gulp.task("watch", ["dev", "assets"], function() {

    // browserSync({
    //     notify: false,
    //     logPrefix: "BS",
    //     // Run as an https by uncommenting "https: true"
    //     // Note: this uses an unsigned certificate which on first access
    //     // will present a certificate warning in the browser.
    //     // server: [publicFolder, "app"],
    //     // port: 3000
    // });

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
        .pipe(gulp.dest("./" + publicFolder + "/scripts"))
        .on("end", function() {
            reload();
        });
}

gulp.task("dev", rebundle);

// build all app
gulp.task("build", ["buildScripts", "assets"], function() {
    gulp.src(publicFolder + "/scripts/app.js")
        .pipe($.uglify())
        .pipe($.stripDebug())
        .pipe(gulp.dest(publicFolder + "/scripts"));
});

// Task for shop
gulp.task("client", ["build"]);

// Task for admin


// Task for shop
var adminSourceFile = "./client/admin/scripts/app.js";

var adminFolder = "server/app/public/admin";

// clean dist foler
gulp.task("clean_admin", function(callback) {
    $.cache.clearAll();
    callback(del.sync([adminFolder]));
});

// build app script js
gulp.task("buildScripts_admin", function() {
    return browserify(adminSourceFile)
        .require("react")
        .bundle()
        .pipe(source("app.js"))
        .pipe(gulp.dest(adminFolder + "/scripts"));
});

// copy file html from app dev to dist folder
gulp.task("html_admin", function() {
    return gulp.src("client/admin/*.html")
        .pipe(gulp.dest(adminFolder));
});

// copy file js extend to vendor folder
gulp.task("vendor_admin", function() {
    return gulp.src("./bower_components/**")
        .pipe(gulp.dest(adminFolder + "/vendor"));
});

gulp.task("fonts_admin", function() {
    return gulp.src(["./client/admin/fonts/**/*.*"], { base: "./client/admin/fonts/" })
        .pipe(gulp.dest(adminFolder + "/fonts"));
});

gulp.task("styles_admin", function() {
    return gulp.src(["./client/admin/css/**/*.*"], { base: "./client/admin/css/" })
        .pipe(rename({suffix: ".min"}))
        .pipe(gulp.dest(adminFolder + "/css"));
});

gulp.task("copyCss_admin", function(){
    return gulp.src(["./client/admin/css/**/*.css"], { base: "./client/admin/css/" })
        .pipe(gulp.dest(adminFolder + "/styles"));
});

gulp.task("js_admin", function() {
    return gulp.src(["./client/admin/js/**/*.*"], { base: "./client/admin/js/" })
        .pipe(gulp.dest(adminFolder + "/js"));
});


gulp.task("images_admin", function() {
    return gulp.src(["./client/admin/img/**/*"], { base: "./client/admin/img/" })
        .pipe(gulp.dest(adminFolder + "/img"));
});

gulp.task("extras_admin", function() {
    return gulp.src(["app/*.txt", "app/*.ico"])
        .pipe(gulp.dest(adminFolder + "/"))
        .pipe($.size());
});

gulp.task("assets_admin", [
    "vendor_admin", 
    "js_admin", 
    "fonts_admin", 
    "images_admin", 
    "extras_admin", 
    "styles_admin", 
    "html_admin", 
    "copyCss_admin"
]);
// ---

gulp.task("watch_admin", [
    "dev_admin", 
    "assets_admin"
], function() {

    // browserSync({
    //     notify: false,
    //     logPrefix: "BS",
    //     // Run as an https by uncommenting "https: true"
    //     // Note: this uses an unsigned certificate which on first access
    //     // will present a certificate warning in the browser.
    //     // server: [adminFolder, "admin"],
    //     // port: 4000
    // });

    // Watch .html files
    gulp.watch("client/admin/*.html", reload);

    gulp.watch(["client/admin/styles/**/*.css"], 
        ["styles", reload]);

    // Watch image files
    gulp.watch("client/admin/images/**/*", reload);
});

gulp.task("watch_admin_dev", function() {

    browserSync({
        notify: false,
        logPrefix: "BS",
        // Run as an https by uncommenting "https: true"
        // Note: this uses an unsigned certificate which on first access
        // will present a certificate warning in the browser.
        server: [adminFolder, "admin"],
        port: 4000
    });

    // Watch .html files
    gulp.watch("client/admin/*.html", reload);

    gulp.watch(["client/admin/styles/**/*.css"], 
        ["styles", reload]);

    // Watch image files
    gulp.watch("client/admin/images/**/*", reload);
});


// build all app
gulp.task("build_admin", [
    "buildScripts_admin", 
    "assets_admin"], function() {
    gulp.src(adminFolder + "/scripts/app.js")
        .pipe($.uglify())
        .pipe($.stripDebug())
        .pipe(gulp.dest(adminFolder + "/scripts"));
});

var bundler_admin = watchify(browserify({
    entries: [adminSourceFile],
    debug: true,
    insertGlobals: true,
    cache: {},
    packageCache: {},
    fullPaths: true
}).transform("babelify", {
    extensions: [".babel"]
}));

bundler_admin.on("update", rebundle_admin);
bundler_admin.on("log", $.util.log);

function rebundle_admin() {
    return bundler_admin.bundle()
        // log errors if they happen
        .on("error", $.util.log.bind($.util, "Browserify Error"))
        .pipe(source("app.js"))
        .pipe(gulp.dest("./" + adminFolder + "/scripts"))
        .on("end", function() {
            reload();
        });
}

gulp.task("dev_admin", rebundle_admin);

// Task for shop
gulp.task("admin", [
    "build_admin"
]);

// Task for admin
