"use strict";
var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
var sequelize = require("../db");

// var chiTietDDH          = require("./chiTietDDH");
// var donDatHang          = require("./donDatHang");
// var gioHang             = require("./gioHang");
// var hoaDonBanHang       = require("./hoaDonBanHang");
// var khachHang           = require("./khachHang");
// var kho                 = require("./kho");
// var loaiSP              = require("./loaiSP");
// var nhanVien            = require("./nhanVien");
// var sanPham             = require("./sanPham");
// var sPMoi               = require("./sPMoi");


var Employer            = sequelize.import("./employer");

var db = {};
db[Employer.name] = Employer;

// fs.readdirSync(__dirname).filter(function(file) {
//     return (file.indexOf(".") !== 0) && (file !== "index.js");
// }).forEach(function(file) {
//     var model = sequelize.import(path.join(__dirname, file));
//     db[model.name] = model;
// });

Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;



// var path      = require("path");
// var Sequelize = require("sequelize");
// var sequelize = require("../db");
// var db = {};

// var Task = sequelize.import(path.join(__dirname, "./task"));
// db[Task.name] = Task;

// var User = sequelize.import(path.join(__dirname, "./user"));
// db[User.name] = User;


// Object.keys(db).forEach(function(modelName) {
//   if ("associate" in db[modelName]) {
//     db[modelName].associate(db);
//   }
// });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;