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
var SizeType = sequelize.import("./size_type");
var News = sequelize.import("./news");
var TradeMark = sequelize.import("./trademark");
var CategoryGallery = sequelize.import("./category_gallery");
var User = sequelize.import("./user");
var UserAddress = sequelize.import("./user_address");
var Order = sequelize.import("./order");
var OrderDetail = sequelize.import("./order_detail");

var db = {};
db[Employer.name] = Employer;
db[Category.name] = Category;
db[Product.name] = Product;
db[ProductGallary.name] = ProductGallary;
db[ProductCategory.name] = ProductCategory;
db[Size.name] = Size;
db[SizeType.name] = SizeType;
db[News.name] = News;
db[TradeMark.name] = TradeMark;
db[CategoryGallery.name] = CategoryGallery;
db[User.name] = User;
db[UserAddress.name] = UserAddress;
db[Order.name] = Order;
db[OrderDetail.name] = OrderDetail;

Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;