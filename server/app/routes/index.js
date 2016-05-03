var express = require('express');
var router  = express.Router();
var authorized = require("../authorized");

var admin = require("./admin");
var menu = require("./menu");
var product = require("./product");
var news = require("./news")

// for admin
router.post('/signin_employer', admin.signin);
router.get('/get_me', authorized, admin.me);
router.post('/create_employer',authorized, admin.create);
router.get('/all_employer', authorized, admin.getAllUser);
router.get('/get_total_users', authorized, admin.getTotalUsers);
router.post('/upload_employer_photo', authorized, admin.uploadEmployerPhoto)
router.post("/reset_password_employer",authorized, admin.resetPassword)
router.post("/change_status_employer", authorized, admin.changeStatusEmployer)
router.post("/update_employer_info", authorized, admin.updateEmployerInfo)
router.post("/update_password_employer", authorized, admin.updatePasswordEmployers)

// for product
router.post('/create_product',authorized, product.createProduct)
router.get('/get_product_by_id',authorized, product.getProductById);
router.get('/get_list_product',authorized, product.getListProduct);
router.get('/get_total_product',authorized, product.getTotalProduct);
router.post('/delete_product',authorized, product.deleteProduct);
router.post('/update_product',authorized, product.updateProduct);

// for news
router.get("/get_list_news", authorized, news.getList)
router.post("/create_news", authorized, news.createNews)
router.get("/get_news_by_id", news.getNewsById);
router.post("/delete_news", authorized, news.deleteNews);
router.get("/get_total_news", authorized, news.getTotalNews);
router.post("/update_show_on_top", authorized, news.updateShowOnTop)
// for client
router.get("/menu", menu.get);

module.exports = router;
