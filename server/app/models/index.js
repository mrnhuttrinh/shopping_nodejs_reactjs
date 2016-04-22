"use strict";
var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
var sequelize = require("../db");

var Employer            = sequelize.import("./employer");
var Category    = sequelize.import("./category");
var Product     = sequelize.import("./product");
var ProductGallary     = sequelize.import("./product_gallery");
var ProductCategory     = sequelize.import("./product_category");
var Size     = sequelize.import("./size");
var Color = sequelize.import("./color")

var db = {};
db[Employer.name] = Employer;
db[Category.name] = Category;
db[Product.name] = Product;
db[ProductGallary.name] = ProductGallary;
db[ProductCategory.name] = ProductCategory;
db[Size.name] = Size;
db[Color.name] = Color;

Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;