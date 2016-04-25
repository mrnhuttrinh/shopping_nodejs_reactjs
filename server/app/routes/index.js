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

router.post('/upload_employer_photo', authorized, admin.uploadEmployerPhoto)

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

// for client
router.get("/menu", menu.get);

module.exports = router;
