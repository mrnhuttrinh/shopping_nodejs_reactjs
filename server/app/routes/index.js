var express = require('express');
var router  = express.Router();
var authorized = require("../authorized");

var admin = require("./admin/admin");
var menu = require("./admin/menu");
var product = require("./admin/product");
var news = require("./admin/news")
var trademark = require("./admin/trademark");

// for admin
router.post('/signin_employer', admin.signin);
router.get('/get_me', authorized, admin.me);
router.post('/create_employer',authorized, admin.create);
router.get('/all_employer', authorized, admin.getAllUser);
router.get('/get_employer_by_id', authorized, admin.getUser);
router.get('/get_total_users', authorized, admin.getTotalUsers);
router.post('/upload_employer_photo', authorized, admin.uploadEmployerPhoto)
router.post("/reset_password_employer",authorized, admin.resetPassword)
router.post("/change_status_employer", authorized, admin.changeStatusEmployer)
router.post("/update_employer_info", authorized, admin.updateEmployerInfo)
router.post("/update_password_employer", authorized, admin.updatePasswordEmployers)
router.post("/update_role_employer", authorized, admin.updateRoleEmployer);

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

// for trademark
router.get("/get_list_trademark", authorized, trademark.getList);
router.get("/get_list_trademark_mini", authorized, trademark.getListMini);
router.get("/get_trademark_by_id", authorized, trademark.getTradeMarkById);
router.post("/create_trademark", authorized, trademark.createTradeMark);
router.post("/delete_trademark", authorized, trademark.deleteTradeMark);
router.post("/update_trademark", authorized, trademark.updateTradeMark);

// for menu
router.get("/menu", menu.get);
router.get("/get_all_gallery_menu", authorized, menu.getGalleries);
router.get("/get_gallery_by_menu_id", menu.getGalleryByMenuId);
router.post("/add_more_picture", authorized, menu.addMorePicture);
router.post("/delete_gallery_menu", authorized, menu.deleteGallery);
router.post("/edit_gallery_menu", authorized, menu.editGallery);
router.post("/update_logo_category", authorized, menu.updateLogoImage);


// for shop
var productShop = require("./shop/product");
var newsShow = require("./shop/news");
var user = require("./shop/user");
router.get("/shop_get_list_product", productShop.getListProductByCategory);
router.get("/shop_get_news", newsShow.getList);
router.get("/shop_get_news_on_top", newsShow.getNewsOnTop);
router.get("/shop_get_total_product", productShop.getTotalProduct);
router.get("/shop_get_product_by_text_link", productShop.getProductByLink);
router.post("/shop_register_user", user.registerUser);
router.post("/shop_login_user", user.loginUser);

module.exports = router;
