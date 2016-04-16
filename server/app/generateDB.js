var models = require("./models");
var _ = require("lodash");
var md5 = require('md5');
var uuid = require("./utils/uuid");

models.sequelize.sync().then(function () {
    console.log("generate database");
    var adminUser = {
        username: "admin",
        password: "admin",
        level: 1,
        info: "Admin"
    };
    insertAdminUser(adminUser);
    var adminUserTest = {
        username: "test",
        password: "test",
        level: 2,
        info: "User"
    };
    insertAdminUser(adminUserTest);
    insertMenu();
});

// insert admin user
function insertAdminUser(adminUser) {
    console.log("Insert user")
    models.Employer.find({
        where: {username: adminUser.username}
    }).then(function(employers, err) {
        if (err) {
            console.log("insert user error");
            console.log(JSON.stringify(err));
            return;
        }
        if (employers) {
            console.log("User has exist");
            return;
        } else {
            password = md5(adminUser.password);
            models.Employer.create({
                id: uuid(),
                username: adminUser.username,
                password: md5(adminUser.password),
                level: adminUser.level, // admin role
                info: adminUser.info
            }).then(function(employer, err) {
                if (err) {
                    console.log("insert user error");
                    console.log(JSON.stringify(err));
                    return;
                }
                console.log("Insert user successed!");
                return;
            });
        }
    });
}

var menus = [
    {
        "id": 1,
        "name": "Sản Phẩm Mới Về",
        "level": 1,
        "icon": "icon-new",
        "char": "C"
    }, {
        "id": 2,
        "name": "Hàng Khuyến Mãi",
        "level": 1,
        "char": "k"
    }, {
        "id": 3,
        "name": "Thời Trang Nữ",
        "level": 1,
        "icon": "new"
    }, {
        "id": 4,
        "name": "Thời Trang Nam",
        "level": 1,
        "icon": "new"
    }, {
        "id": 5,
        "name": "Thời Trang Cặp",
        "level": 1,
        "icon": "new"
    }, {
        "id": 6,
        "name": "Set Mẹ & Bé",
        "level": 1,
        "icon": "new"
    }, {
        "id": 7,
        "name": "Thời Trang Trẻ Em",
        "level": 1,
        "icon": "new"
    }, {
        "id": 8,
        "name": "Sức Khỏe & Làm Đẹp",
        "level": 1,
        "icon": "new"
    }, {
        "id": 9,
        "name": "Phụ Kiện Thời Trang",
        "level": 1,
        "icon": "new"
    }, {
        "id": 10,
        "name": "Bảng Giá Áo Lớp Nhóm",
        "level": 1
    }, {
        "id": 11,
        "name": "Áo Thun Khuyến Mãi 30k",
        "level": 2,
        "parent": 2
    }, {
        "id": 12,
        "name": "Quần Áo Kiểu Nữ Sale Off",
        "level": 2,
        "parent": 2
    }, {
        "id": 13,
        "name": "Áo Thun YOFASTYLE",
        "level": 2,
        "parent": 3
    }, {
        "id": 14,
        "name": "Áo Khoác Nữ",
        "level": 2,
        "parent": 3
    }, {
        "id": 15,
        "name": "Áo Kiểu Nữ",
        "level": 2,
        "parent": 3
    }, {
        "id": 16,
        "name": "Áo Somi Nữ Bland Fashion",
        "level": 2,
        "parent": 3
    }, {
        "id": 17,
        "name": "Váy Đầm Thời Trang",
        "level": 2,
        "parent": 3
    }, {
        "id": 18,
        "name": "Quần Jean Nữ",
        "level": 2,
        "parent": 3
    }, {
        "id": 19,
        "name": "Đồ Bộ Thể Thao",
        "level": 2,
        "parent": 3
    }, {
        "id": 20,
        "name": "Áo Thun Nam Hàn Quốc",
        "level": 2,
        "parent": 4
    }, {
        "id": 21,
        "name": "Áo Khoác Nam",
        "level": 2,
        "parent": 4
    }, {
        "id": 22,
        "name": "Áo Sơ Mi Nam Hàn Quốc",
        "level": 2,
        "parent": 4
    }, {
        "id": 23,
        "name": "Quần Jean Nam",
        "level": 2,
        "parent": 4
    }, {
        "id": 24,
        "name": "Đồ Bộ Nam",
        "level": 2,
        "parent": 4
    }, {
        "id": 25,
        "name": "Áo Thun",
        "level": 2,
        "parent":5
    }, {
        "id": 26,
        "name": "Áo Thun Trơn",
        "level": 2,
        "parent": 5
    }, {
        "id": 27,
        "name": "Áo Khoác",
        "level": 2,
        "parent": 5
    }, {
        "id": 28,
        "name": "Áo Sơ Mi",
        "level": 2,
        "parent": 5
    }, {
        "id": 29,
        "name": "Quần Cặp",
        "level": 2,
        "parent": 5
    }, {
        "id": 30,
        "name": "Đồ Bộ Cặp",
        "level": 2,
        "parent": 5
    }, {
        "id": 31,
        "name": "Áo Thun Nữ",
        "level": 3,
        "parent": 13
    }, {
        "id": 32,
        "name": "Áo Thun Nữ Giá Rẻ 36k",
        "level": 3,
        "parent": 13
    }, {
        "id": 33,
        "name": "Áo Thun Nữ Tay Dài",
        "level": 3,
        "parent": 13
    }, {
        "id": 34,
        "name": "Áo Thun Nữ Form Eo",
        "level": 3,
        "parent": 13
    }, {
        "id": 35,
        "name": "Áo Nữ Form Dài",
        "level": 3,
        "parent": 13
    }, {
        "id": 36,
        "name": "Áo Nữ Cánh Dơi",
        "level": 3,
        "parent": 13
    }, {
        "id": 37,
        "name": "Áo Crop Top",
        "level": 3,
        "parent": 13
    }, {
        "id": 38,
        "name": "Áo Có Nón Hoodie",
        "level": 3,
        "parent": 13
    }
];

function insertMenu() {
    console.log("Insert menu");
    models.Category.findAll()
    .then(function(listMenu, err) {
        if (err) {
            console.log("Insert menu error");
            console.log(JSON.stringify(err));
            return;
        } 
        if (listMenu.length) {
            console.log("Menu has exist");
            return;
        } else {
            _.map(menus, function(menu) {
                models.Category.create({
                    id: menu.id,
                    name: menu.name,
                    char: menu.char,
                    parent: menu.parent,
                    level: menu.level,
                    status: true,
                    icon: menu.icon
                }).then(function(employer, err) {
                    if (err) {
                        console.log("insert menu error");
                        console.log(JSON.stringify(err));
                    } else {
                        console.log("Insert successed!");
                    }
                });
            });
            console.log("Insert menu successed!");
        }
    });
}