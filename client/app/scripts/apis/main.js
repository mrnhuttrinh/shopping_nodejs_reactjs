export default { 
    getCategory(cb) {
        return cb([
            {
                id: 1,
                href: "categories/detail/",
                src: "http://resources2.cungmua.com/Product/103000/cm_103149.jpg",
                alt: "Bộ 18 ống uốn tóc không nhiệt  lọn vừa và nhỏ UBL AH0133",
                text_alert: "Chỉ giao sản phẩm ở các thành phố lớn",
                trueprice: "140.000",
                price: "77.000",
                num_down: 45
            }, {
                id: 2,
                href: "categories/detail/",
                src: "http://resources2.cungmua.com/Product/103000/cm_103136.jpg",
                alt: "Combo 4 pin Lithium CR2025 và 4 pin CR 2032 UBL IB0081",
                text_alert: "Chỉ giao sản phẩm ở các thành phố lớn",
                trueprice: "120.000",
                price: "69.000",
                num_down: 43
            }, {
                id: 3,
                href: "categories/detail/",
                src: "http://resources2.cungmua.com/Product/103000/cm_103133.jpg",
                alt: "Dù đậy thức ăn họa tiết lạ mắt UBL BH0293 - hồng",
                text_alert: "Chỉ giao sản phẩm ở các thành phố lớn",
                trueprice: "120.000",
                price: "69.000",
                num_down: 43
            }, {
                id: 4,
                href: "categories/detail/",
                src: "http://resources2.cungmua.com/Product/103000/cm_103131.jpg",
                alt: "Combo 80 miếng bông lau mặt UBL AP 0001",
                text_alert: "Chỉ giao sản phẩm ở các thành phố lớn",
                trueprice: "100.000",
                price: "55.000",
                num_down: 45
            }, {
                id: 5,
                href: "categories/detail/",
                src: "http://resources2.cungmua.com/Product/103000/cm_103148.jpg",
                alt: "Bộ 10 muỗng đo lường đủ kích thước tiện dụng UBL KA0090 - đen",
                text_alert: "Chỉ giao sản phẩm ở các thành phố lớn",
                trueprice: "120.000",
                price: "67.000",
                num_down: 44
            }, {
                id: 6,
                href: "categories/detail/",
                src: "http://resources2.cungmua.com/Product/103000/cm_103130.jpg",
                alt: "Bộ 5 món chiết mỹ phẩm khi đi du lịch UBL AG0221- tím",
                text_alert: "Chỉ giao sản phẩm ở các thành phố lớn",
                trueprice: "110.000",
                price: "65.000",
                num_down: 41
            }, {
                id: 5,
                href: "categories/detail/",
                src: "http://resources2.cungmua.com/Product/103000/cm_103132.jpg",
                alt: "Combo 2 khăn lau siêu thấm đa năng Microfibr/e BC 0128 UBL",
                text_alert: "Chỉ giao sản phẩm ở các thành phố lớn",
                trueprice: "150.000",
                price: "79.000",
                num_down: 47
            }, {
                id: 8,
                href: "categories/detail/",
                src: "http://resources2.cungmua.com/Product/103000/cm_103134.jpg",
                alt: "Dù đậy thức ăn họa tiết lạ mắt UBL BH0293 - xanh đen",
                text_alert: "Chỉ giao sản phẩm ở các thành phố lớn",
                trueprice: "120.000",
                price: "69.000",
                num_down: 43
            }, {
                id: 9,
                href: "categories/detail/",
                src: "http://resources2.cungmua.com/Product/103000/cm_103135.jpg",
                alt: "Hộp Mica trong suốt đựng mỹ phẩm xinh xắn UBL DM0168 - vuông",
                text_alert: "Chỉ giao sản phẩm ở các thành phố lớn",
                trueprice: "150.000",
                price: "85.000",
                num_down: 43
            }, {
                id: 10,
                href: "categories/detail/",
                src: "http://resources2.cungmua.com/Product/103000/cm_103138.jpg",
                alt: "Bộ 5 hộp đựng gia vị trong suốt thông minh UBL KS0520",
                text_alert: "Chỉ giao sản phẩm ở các thành phố lớn",
                trueprice: "140.000",
                price: "79.000",
                num_down: 44
            }, {
                id: 11,
                href: "categories/detail/",
                src: "http://resources2.cungmua.com/Product/103000/cm_103140.jpg",
                alt: "Bộ 2 bao tay nhấc bếp, vỉ nướng cực dày UBL RG0036 - xanh",
                text_alert: "Chỉ giao sản phẩm ở các thành phố lớn",
                trueprice: "150.000",
                price: "85.000",
                num_down: 43
            }, {
                id: 12,
                href: "categories/detail/",
                src: "http://resources2.cungmua.com/Product/103000/cm_103141.jpg",
                alt: "Bộ 2 bao tay nhấc bếp, vỉ nướng cực dày UBL RG0036 - đen",
                text_alert: "Chỉ giao sản phẩm ở các thành phố lớn",
                trueprice: "150.000",
                price: "85.000",
                num_down: 43
            }
        ])
    },
    getGroup(cb) {
        return cb([
            {
                href: "technical",
                alt: "Hàng công nghệ xả kho",
                src: "http://resources2.cungmua.com/Product/102000/Long/cm_102037.jpg",
                num_product: 28,
                num_down: 61,
                price: "59.000"
            }, {
                href: "legotoy",
                alt: "BST đồ chơi Lego cao cấp giá sốc -  nhập khẩu Mỹ cho bé",
                src: "http://resources2.cungmua.com/Product/102000/Long/cm_102092.jpg",
                num_product: 19,
                num_down: 75,
                price: "319.000"
            }, {
                href: "watch",
                alt: "Đồng hồ MK - Guess - CK Nhập khẩu Mỹ (giảm shock)",
                src: "http://resources2.cungmua.com/Product/102000/Long/cm_102649.jpg",
                num_product: 23,
                num_down: 92,
                price: "1.738.000"
            }, {
                href: "fashsion",
                alt: "Fashion Kid - BST Đồ trẻ em mùa hè - Thương hiệu VTA KIDS",
                src: "http://resources2.cungmua.com/Product/101000/Long/cm_101914.jpg",
                num_product: 10,
                num_down: 69,
                price: "79.000"
            }, {
                href: "glass",
                alt: "Mắt kính nhập khẩu từ USA - Sale off 75%",
                src: "http://resources2.cungmua.com/Product/102000/Long/cm_102038.jpg",
                num_product: 38,
                num_down: 70,
                price: "399.000"
            }, {
                href: "perfume",
                alt: "Thế giới nước hoa - Hương thơm lan tỏa",
                src: "http://resources2.cungmua.com/Product/101000/Long/cm_101922.jpg",
                num_product: 15,
                num_down: 38,
                price: 199.000
            }, {
                href: "drap",
                alt: "BST  Drap Cotton Thắng Lợi áo gối lót gòn 1,6m x 2m kèm mề",
                src: "http://resources2.cungmua.com/Product/102000/Long/cm_102030.jpg",
                num_product: 15,
                num_down: 46,
                price: "599.000"
            }, {
                href: "dress",
                alt: "BST đầm hoa điệu đà cho cô nàng công sở",
                src: "http://resources2.cungmua.com/Product/100000/Long/cm_100894.jpg",
                num_product: 19,
                num_down: 52,
                price: "95.000"
            }
        ]);
    }
}