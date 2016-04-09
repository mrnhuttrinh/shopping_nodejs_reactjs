import React, {Component} from 'react';

export default class HeaderMain extends Component{
    render() {
        return (
            <div className="header_main ">
                <div className="container">
                    <nav className="chose_cate">
                        <a><span className="ic_cm icon-menu">A</span><span className="text_cate">CHỌN DANH MỤC</span></a>
                        <div className="menu_cate menu_ver_inside ">
                            <ul className="menu_ver">
                                <li><a href="/deal-moi" onclick="common.SendTrackingMenu('Khuyến mãi mới nhất', '/deal-moi'); return false;"><span className="ic_cm icon-new">C</span>Khuyến mãi mới nhất</a></li>
                                <li>
                                    <a href="/voucher" onclick="common.SendTrackingMenu('Voucher Nhóm Mua', '/voucher'); return false;"><span className=" ic_cm icon-logonm">e</span>Voucher Nhóm Mua<span className="ic_cm  icon_arr">K</span></a>
                                    <div className="menu_ver_hover">
                                        <ul className="menu_ver_item">
                                            <li className="bold">
                                                <a href="/voucher/nha-hang-an-uong" onclick="common.SendTrackingMenu('Nhà hàng - Ăn uống', '/voucher/nha-hang-an-uong'); return false;">Nhà hàng - Ăn uống</a>
                                            </li>
                                            <li>
                                                <a href="/voucher/nha-hang-an-uong/buffet" onclick="common.SendTrackingMenu('Buffet', '/voucher/nha-hang-an-uong/buffet'); return false;">Buffet</a>
                                            </li>
                                            <li>
                                                <a href="/voucher/nha-hang-an-uong/nha-hang-quan-an" onclick="common.SendTrackingMenu('Nhà hàng - Quán ăn', '/voucher/nha-hang-an-uong/nha-hang-quan-an'); return false;">Nhà hàng - Quán ăn</a>
                                            </li>
                                            <li>
                                                <a href="/voucher/nha-hang-an-uong/cafe-kem-banh" onclick="common.SendTrackingMenu('Café - Kem - Bánh', '/voucher/nha-hang-an-uong/cafe-kem-banh'); return false;">Café - Kem - Bánh</a>
                                            </li>
                                            <li className="bold">
                                                <a href="/voucher/suc-khoe-lam-dep" onclick="common.SendTrackingMenu('Sức khỏe - Làm đẹp', '/voucher/suc-khoe-lam-dep'); return false;">Sức khỏe - Làm đẹp</a>
                                            </li>
                                            <li>
                                                <a href="/voucher/suc-khoe-lam-dep/spa-tham-my-vien" onclick="common.SendTrackingMenu('Spa - Thẩm mỹ viện', '/voucher/suc-khoe-lam-dep/spa-tham-my-vien'); return false;">Spa - Thẩm mỹ viện</a>
                                            </li>
                                            <li>
                                                <a href="/voucher/suc-khoe-lam-dep/salon-lam-dep" onclick="common.SendTrackingMenu('Salon - Làm đẹp', '/voucher/suc-khoe-lam-dep/salon-lam-dep'); return false;">Salon - Làm đẹp</a>
                                            </li>
                                            <li>
                                                <a href="/voucher/suc-khoe-lam-dep/nha-khoa-suc-khoe" onclick="common.SendTrackingMenu('Nha khoa - Sức khỏe', '/voucher/suc-khoe-lam-dep/nha-khoa-suc-khoe'); return false;">Nha khoa - Sức khỏe</a>
                                            </li>
                                            <li className="bold">
                                                <a href="/voucher/su-kien-giai-tri" onclick="common.SendTrackingMenu('Sự kiện - Giải trí', '/voucher/su-kien-giai-tri'); return false;">Sự kiện - Giải trí</a>
                                            </li>
                                            <li>
                                                <a href="/voucher/su-kien-giai-tri/ca-nhac-phim-kich" onclick="common.SendTrackingMenu('Ca nhạc - Phim - Kịch', '/voucher/su-kien-giai-tri/ca-nhac-phim-kich'); return false;">Ca nhạc - Phim - Kịch</a>
                                            </li>
                                            <li>
                                                <a href="/voucher/su-kien-giai-tri/giai-tri-vui-choi" onclick="common.SendTrackingMenu('Giải trí - Vui chơi', '/voucher/su-kien-giai-tri/giai-tri-vui-choi'); return false;">Giải trí - Vui chơi</a>
                                            </li>
                                            <li>
                                                <a href="/voucher/su-kien-giai-tri/studio-chup-anh" onclick="common.SendTrackingMenu('Studio - Chụp ảnh', '/voucher/su-kien-giai-tri/studio-chup-anh'); return false;">Studio - Chụp ảnh</a>
                                            </li>
                                            <li>
                                                <a href="/voucher/su-kien-giai-tri/khoa-hoc-hoi-thao" onclick="common.SendTrackingMenu('Khóa học - Hội thảo', '/voucher/su-kien-giai-tri/khoa-hoc-hoi-thao'); return false;">Khóa học - Hội thảo</a>
                                            </li>
                                        </ul>
                                        <ul className="menu_ver_item">
                                            <li className="bold">
                                                <a href="/voucher/du-lich-khach-san" onclick="common.SendTrackingMenu('Du lịch - Khách sạn', '/voucher/du-lich-khach-san'); return false;">Du lịch - Khách sạn</a>
                                            </li>
                                            <li>
                                                <a href="/voucher/du-lich-khach-san/khach-san-resorts" onclick="common.SendTrackingMenu('Khách sạn - Resorts', '/voucher/du-lich-khach-san/khach-san-resorts'); return false;">Khách sạn - Resorts</a>
                                            </li>
                                            <li>
                                                <a href="/voucher/du-lich-khach-san/tour-trong-nuoc" onclick="common.SendTrackingMenu('Tour trong nước', '/voucher/du-lich-khach-san/tour-trong-nuoc'); return false;">Tour trong nước</a>
                                            </li>
                                            <li>
                                                <a href="/voucher/du-lich-khach-san/tour-nuoc-ngoai" onclick="common.SendTrackingMenu('Tour nước ngoài', '/voucher/du-lich-khach-san/tour-nuoc-ngoai'); return false;">Tour nước ngoài</a>
                                            </li>
                                        </ul>
                                        <a href="/voucher" style={{"background": "url('http://resources.cungmua.com/CMBanner/635723767287169269.jpg') no-repeat right bottom"}} className="banner_hoz"></a>
                                    </div>
                                </li>
                                <li>
                                    <a href="/voucher/du-lich-khach-san" onclick="common.SendTrackingMenu('Du lịch - Khách sạn', '/voucher/du-lich-khach-san'); return false;"><span className="icon_cm icon-airplane"></span>Du lịch - Khách sạn<span className="icon_cm  icon_arr"></span></a>
                                    <div className="menu_ver_hover">
                                        <ul className="menu_ver_item">
                                            <li className="bold"><a href="/voucher/du-lich-khach-san" onclick="common.SendTrackingMenu('Du lịch - Khách sạn', '/voucher/du-lich-khach-san'); return false;">Du lịch - Khách sạn</a></li>
                                            <li><a href="/voucher/du-lich-khach-san/khach-san-resorts" onclick="common.SendTrackingMenu('Khách sạn - Resorts', '/voucher/du-lich-khach-san/khach-san-resorts'); return false;">Khách sạn - Resorts</a></li>
                                            <li><a href="/voucher/du-lich-khach-san/tour-trong-nuoc" onclick="common.SendTrackingMenu('Tour trong nước', '/voucher/du-lich-khach-san/tour-trong-nuoc'); return false;">Tour trong nước</a></li>
                                            <li><a href="/voucher/du-lich-khach-san/tour-nuoc-ngoai" onclick="common.SendTrackingMenu('Tour nước ngoài', '/voucher/du-lich-khach-san/tour-nuoc-ngoai'); return false;">Tour nước ngoài</a></li>
                                        </ul>
                                        <ul className="menu_ver_item">
                                            <li className="bold1"><a href="javascript:void(0)">Điểm đến Hot</a></li>
                                            <li><a href="/voucher/du-lich-khach-san/phan-thiet_l28" onclick="common.SendTrackingMenu('Phan Thiết', '/voucher/du-lich-khach-san/phan-thiet_l28'); return false;">Phan Thiết</a></li>
                                            <li><a href="/voucher/du-lich-khach-san/vung-tau_l38" onclick="common.SendTrackingMenu('Vũng Tàu', '/voucher/du-lich-khach-san/vung-tau_l38'); return false;">Vũng Tàu</a></li>
                                            <li><a href="/voucher/du-lich-khach-san/da-lat_l30" onclick="common.SendTrackingMenu('Đà Lạt', '/voucher/du-lich-khach-san/da-lat_l30'); return false;">Đà Lạt</a></li>
                                            <li><a href="/voucher/du-lich-khach-san/nha-trang_l29" onclick="common.SendTrackingMenu('Nha Trang', '/voucher/du-lich-khach-san/nha-trang_l29'); return false;">Nha Trang</a></li>
                                            <li><a href="/voucher/du-lich-khach-san/da-nang_l33" onclick="common.SendTrackingMenu('Đà Nẵng', '/voucher/du-lich-khach-san/da-nang_l33'); return false;">Đà Nẵng</a></li>
                                            <li><a href="/voucher/du-lich-khach-san/phu-quoc_l31" onclick="common.SendTrackingMenu('Phú Quốc', '/voucher/du-lich-khach-san/phu-quoc_l31'); return false;">Phú Quốc</a></li>
                                            <li><a href="/voucher/du-lich-khach-san/campuchia_l496" onclick="common.SendTrackingMenu('Campuchia', '/voucher/du-lich-khach-san/campuchia_l496'); return false;">Campuchia</a></li>
                                            <li><a href="/voucher/du-lich-khach-san/thai-lan_l493" onclick="common.SendTrackingMenu('Thái Lan', '/voucher/du-lich-khach-san/thai-lan_l493'); return false;">Thái Lan</a></li>
                                        </ul>
                                        <a style={{"background": "url(http://resources.cungmua.com/FTPPhotos/html/cm/img_travel.jpg) no-repeat right top", "width": "598px", "height": "407px"}} className="banner_hoz" href="/voucher/du-lich-khach-san"></a>
                                    </div>
                                </li>
                                <li>
                                    <a href="/thoi-trang-nu" onclick="common.SendTrackingMenu('Thời trang nữ', '/thoi-trang-nu'); return false;"><span className="ic_cm">z</span>Thời trang nữ<span className="ic_cm  icon_arr">K</span></a>
                                    <div className="menu_ver_hover">
                                        <ul className="menu_ver_item">
                                            <li className="bold">
                                                <a href="/thoi-trang-nu/quan-nu" onclick="common.SendTrackingMenu('Quần nữ', '/thoi-trang-nu/quan-nu'); return false;">Quần nữ</a>
                                            </li>
                                            <li>
                                                <a href="/thoi-trang-nu/quan-nu/quan-tay-cong-so" onclick="common.SendTrackingMenu('Quần tây công sở', '/thoi-trang-nu/quan-nu/quan-tay-cong-so'); return false;">Quần tây công sở</a>
                                            </li>
                                            <li>
                                                <a href="/thoi-trang-nu/quan-nu/quan-short-nu" onclick="common.SendTrackingMenu('Quần short nữ', '/thoi-trang-nu/quan-nu/quan-short-nu'); return false;">Quần short nữ</a>
                                            </li>
                                            <li>
                                                <a href="/thoi-trang-nu/quan-nu/quan-jeans" onclick="common.SendTrackingMenu('Quần jeans', '/thoi-trang-nu/quan-nu/quan-jeans'); return false;">Quần jeans</a>
                                            </li>
                                            <li>
                                                <a href="/thoi-trang-nu/quan-nu/quan-kieu" onclick="common.SendTrackingMenu('Quần kiểu', '/thoi-trang-nu/quan-nu/quan-kieu'); return false;">Quần kiểu</a>
                                            </li>
                                            <li>
                                                <a href="/thoi-trang-nu/quan-nu/leggings" onclick="common.SendTrackingMenu('Leggings', '/thoi-trang-nu/quan-nu/leggings'); return false;">Leggings</a>
                                            </li>
                                            <li className="bold">
                                                <a href="/thoi-trang-nu/ao-nu" onclick="common.SendTrackingMenu('Áo nữ', '/thoi-trang-nu/ao-nu'); return false;">Áo nữ</a>
                                            </li>
                                            <li>
                                                <a href="/thoi-trang-nu/ao-nu/ao-kieu" onclick="common.SendTrackingMenu('Áo kiểu', '/thoi-trang-nu/ao-nu/ao-kieu'); return false;">Áo kiểu</a>
                                            </li>
                                            <li>
                                                <a href="/thoi-trang-nu/ao-nu/ao-somi-nu" onclick="common.SendTrackingMenu('Áo sơmi nữ', '/thoi-trang-nu/ao-nu/ao-somi-nu'); return false;">Áo sơmi nữ</a>
                                            </li>
                                            <li>
                                                <a href="/thoi-trang-nu/ao-nu/ao-thun-nu" onclick="common.SendTrackingMenu('Áo thun nữ', '/thoi-trang-nu/ao-nu/ao-thun-nu'); return false;">Áo thun nữ</a>
                                            </li>
                                            <li>
                                                <a href="/thoi-trang-nu/ao-nu/ao-hai-day-ba-lo" onclick="common.SendTrackingMenu('Áo hai dây / ba lỗ', '/thoi-trang-nu/ao-nu/ao-hai-day-ba-lo'); return false;">Áo hai dây / ba lỗ</a>
                                            </li>
                                            <li className="bold">
                                                <a href="/thoi-trang-nu/ao-khoac" onclick="common.SendTrackingMenu('Áo khoác', '/thoi-trang-nu/ao-khoac'); return false;">Áo khoác</a>
                                            </li>
                                            <li>
                                                <a href="/thoi-trang-nu/ao-khoac/ao-vest-blazer" onclick="common.SendTrackingMenu('Áo vest / Blazer', '/thoi-trang-nu/ao-khoac/ao-vest-blazer'); return false;">Áo vest / Blazer</a>
                                            </li>
                                            <li>
                                                <a href="/thoi-trang-nu/ao-khoac/ao-khoac-kieu" onclick="common.SendTrackingMenu('Áo khoác kiểu', '/thoi-trang-nu/ao-khoac/ao-khoac-kieu'); return false;">Áo khoác kiểu</a>
                                            </li>
                                            <li>
                                                <a href="/thoi-trang-nu/ao-khoac/ao-len-cardigan" onclick="common.SendTrackingMenu('Áo len / Cardigan', '/thoi-trang-nu/ao-khoac/ao-len-cardigan'); return false;">Áo len / Cardigan</a>
                                            </li>
                                            <li>
                                                <a href="/thoi-trang-nu/ao-khoac/ao-khoac-co-mu" onclick="common.SendTrackingMenu('Áo khoác có mũ', '/thoi-trang-nu/ao-khoac/ao-khoac-co-mu'); return false;">Áo khoác có mũ</a>
                                            </li>
                                        </ul>
                                        <ul className="menu_ver_item">
                                            <li className="bold">
                                                <a href="/thoi-trang-nu/dam-vay" onclick="common.SendTrackingMenu('Đầm - Váy', '/thoi-trang-nu/dam-vay'); return false;">Đầm - Váy</a>
                                            </li>
                                            <li>
                                                <a href="/thoi-trang-nu/dam-vay/chan-vay-ngan" onclick="common.SendTrackingMenu('Chân váy ngắn', '/thoi-trang-nu/dam-vay/chan-vay-ngan'); return false;">Chân váy ngắn</a>
                                            </li>
                                            <li>
                                                <a href="/thoi-trang-nu/dam-vay/chan-vay-dai" onclick="common.SendTrackingMenu('Chân váy dài', '/thoi-trang-nu/dam-vay/chan-vay-dai'); return false;">Chân váy dài</a>
                                            </li>
                                            <li>
                                                <a href="/thoi-trang-nu/dam-vay/dam-suong" onclick="common.SendTrackingMenu('Đầm suông', '/thoi-trang-nu/dam-vay/dam-suong'); return false;">Đầm suông</a>
                                            </li>
                                            <li>
                                                <a href="/thoi-trang-nu/dam-vay/dam-xoe" onclick="common.SendTrackingMenu('Đầm xòe', '/thoi-trang-nu/dam-vay/dam-xoe'); return false;">Đầm xòe</a>
                                            </li>
                                            <li>
                                                <a href="/thoi-trang-nu/dam-vay/dam-om" onclick="common.SendTrackingMenu('Đầm ôm', '/thoi-trang-nu/dam-vay/dam-om'); return false;">Đầm ôm</a>
                                            </li>
                                            <li>
                                                <a href="/thoi-trang-nu/dam-vay/dam-maxi" onclick="common.SendTrackingMenu('Đầm maxi', '/thoi-trang-nu/dam-vay/dam-maxi'); return false;">Đầm maxi</a>
                                            </li>
                                            <li>
                                                <a href="/thoi-trang-nu/dam-vay/dam-bau" onclick="common.SendTrackingMenu('Đầm bầu', '/thoi-trang-nu/dam-vay/dam-bau'); return false;">Đầm bầu</a>
                                            </li>
                                            <li>
                                                <a href="/thoi-trang-nu/dam-vay/Set-do-jumpsuits" onclick="common.SendTrackingMenu('Set đồ/Jumpsuits', '/thoi-trang-nu/dam-vay/Set-do-jumpsuits'); return false;">Set đồ/Jumpsuits</a>
                                            </li>
                                            <li className="bold">
                                                <a href="/thoi-trang-nu/do-lot-nu" onclick="common.SendTrackingMenu('Đồ lót nữ', '/thoi-trang-nu/do-lot-nu'); return false;">Đồ lót nữ</a>
                                            </li>
                                            <li>
                                                <a href="/thoi-trang-nu/do-lot-nu/ao-lot" onclick="common.SendTrackingMenu('Áo lót', '/thoi-trang-nu/do-lot-nu/ao-lot'); return false;">Áo lót</a>
                                            </li>
                                            <li>
                                                <a href="/thoi-trang-nu/do-lot-nu/quan-lot-nu" onclick="common.SendTrackingMenu('Quần lót nữ', '/thoi-trang-nu/do-lot-nu/quan-lot-nu'); return false;">Quần lót nữ</a>
                                            </li>
                                            <li>
                                                <a href="/thoi-trang-nu/do-lot-nu/dinh-hinh-dam-lot" onclick="common.SendTrackingMenu('Định hình/Đầm lót', '/thoi-trang-nu/do-lot-nu/dinh-hinh-dam-lot'); return false;">Định hình/Đầm lót</a>
                                            </li>
                                            <li className="bold">
                                                <a href="/thoi-trang-nu/do-mac-nha" onclick="common.SendTrackingMenu('Đồ mặc nhà', '/thoi-trang-nu/do-mac-nha'); return false;">Đồ mặc nhà</a>
                                            </li>
                                            <li>
                                                <a href="/thoi-trang-nu/do-mac-nha/dam-ngu" onclick="common.SendTrackingMenu('Đầm ngủ', '/thoi-trang-nu/do-mac-nha/dam-ngu'); return false;">Đầm ngủ</a>
                                            </li>
                                            <li>
                                                <a href="/thoi-trang-nu/do-mac-nha/do-mac-nha" onclick="common.SendTrackingMenu('Đồ mặc nhà', '/thoi-trang-nu/do-mac-nha/do-mac-nha'); return false;">Đồ mặc nhà</a>
                                            </li>
                                        </ul>
                                        <ul className="menu_ver_item">
                                            <li className="bold">
                                                <a href="/thoi-trang-nu/do-the-thao-nu" onclick="common.SendTrackingMenu('Đồ thể thao nữ', '/thoi-trang-nu/do-the-thao-nu'); return false;">Đồ thể thao nữ</a>
                                            </li>
                                            <li>
                                                <a href="/thoi-trang-nu/do-the-thao-nu/ao-the-thao-nu" onclick="common.SendTrackingMenu('Áo thể thao nữ', '/thoi-trang-nu/do-the-thao-nu/ao-the-thao-nu'); return false;">Áo thể thao nữ</a>
                                            </li>
                                            <li>
                                                <a href="/thoi-trang-nu/do-the-thao-nu/quan-the-thao-nu" onclick="common.SendTrackingMenu('Quần thể thao nữ', '/thoi-trang-nu/do-the-thao-nu/quan-the-thao-nu'); return false;">Quần thể thao nữ</a>
                                            </li>
                                            <li>
                                                <a href="/thoi-trang-nu/do-the-thao-nu/do-boi-nu" onclick="common.SendTrackingMenu('Đồ bơi nữ', '/thoi-trang-nu/do-the-thao-nu/do-boi-nu'); return false;">Đồ bơi nữ</a>
                                            </li>
                                            <li>
                                                <a href="/thoi-trang-nu/do-the-thao-nu/set-do-the-thao" onclick="common.SendTrackingMenu('Set đồ thể thao', '/thoi-trang-nu/do-the-thao-nu/set-do-the-thao'); return false;">Set đồ thể thao</a>
                                            </li>
                                            <li className="bold">
                                                <a href="/thoi-trang-nu/giay-dep-nu" onclick="common.SendTrackingMenu('Giày dép nữ', '/thoi-trang-nu/giay-dep-nu'); return false;">Giày dép nữ</a>
                                            </li>
                                            <li>
                                                <a href="/thoi-trang-nu/giay-dep-nu/giay-cao-got" onclick="common.SendTrackingMenu('Giày cao gót', '/thoi-trang-nu/giay-dep-nu/giay-cao-got'); return false;">Giày cao gót</a>
                                            </li>
                                            <li>
                                                <a href="/thoi-trang-nu/giay-dep-nu/giay-de-xuong" onclick="common.SendTrackingMenu('Giày đế xuồng', '/thoi-trang-nu/giay-dep-nu/giay-de-xuong'); return false;">Giày đế xuồng</a>
                                            </li>
                                            <li>
                                                <a href="/thoi-trang-nu/giay-dep-nu/giay-bup-be" onclick="common.SendTrackingMenu('Giày búp bê', '/thoi-trang-nu/giay-dep-nu/giay-bup-be'); return false;">Giày búp bê</a>
                                            </li>
                                            <li>
                                                <a href="/thoi-trang-nu/giay-dep-nu/giay-xang-dan-nu" onclick="common.SendTrackingMenu('Giày xăng đan nữ', '/thoi-trang-nu/giay-dep-nu/giay-xang-dan-nu'); return false;">Giày xăng đan nữ</a>
                                            </li>
                                            <li>
                                                <a href="/thoi-trang-nu/giay-dep-nu/giay-moi-nu" onclick="common.SendTrackingMenu('Giày mọi nữ', '/thoi-trang-nu/giay-dep-nu/giay-moi-nu'); return false;">Giày mọi nữ</a>
                                            </li>
                                            <li>
                                                <a href="/thoi-trang-nu/giay-dep-nu/giay-vai-nu" onclick="common.SendTrackingMenu('Giày vải nữ', '/thoi-trang-nu/giay-dep-nu/giay-vai-nu'); return false;">Giày vải nữ</a>
                                            </li>
                                            <li>
                                                <a href="/thoi-trang-nu/giay-dep-nu/giay-the-thao-nu" onclick="common.SendTrackingMenu('Giày thể thao nữ', '/thoi-trang-nu/giay-dep-nu/giay-the-thao-nu'); return false;">Giày thể thao nữ</a>
                                            </li>
                                            <li>
                                                <a href="/thoi-trang-nu/giay-dep-nu/dep-nu" onclick="common.SendTrackingMenu('Dép nữ', '/thoi-trang-nu/giay-dep-nu/dep-nu'); return false;">Dép nữ</a>
                                            </li>
                                        </ul>
                                        <ul className="menu_ver_item">
                                            <li className="bold">
                                                <a href="/thoi-trang-nu/tat-vo" onclick="common.SendTrackingMenu('Tất - Vớ', '/thoi-trang-nu/tat-vo'); return false;">Tất - Vớ</a>
                                            </li>
                                            <li>
                                                <a href="/thoi-trang-nu/tat-vo/tat-nu" onclick="common.SendTrackingMenu('Tất nữ', '/thoi-trang-nu/tat-vo/tat-nu'); return false;">Tất nữ</a>
                                            </li>
                                            <li>
                                                <a href="/thoi-trang-nu/tat-vo/tat-da-chan" onclick="common.SendTrackingMenu('Tất da chân', '/thoi-trang-nu/tat-vo/tat-da-chan'); return false;">Tất da chân</a>
                                            </li>
                                            <li className="bold">
                                                <a href="/thoi-trang-nu/phu-kien-thoi-trang-nu" onclick="common.SendTrackingMenu('Phụ kiện thời trang nữ', '/thoi-trang-nu/phu-kien-thoi-trang-nu'); return false;">Phụ kiện thời trang nữ</a>
                                            </li>
                                            <li>
                                                <a href="/thoi-trang-nu/phu-kien-thoi-trang-nu/tui-xach-nu" onclick="common.SendTrackingMenu('Túi xách nữ', '/thoi-trang-nu/phu-kien-thoi-trang-nu/tui-xach-nu'); return false;">Túi xách nữ</a>
                                            </li>
                                            <li>
                                                <a href="/thoi-trang-nu/phu-kien-thoi-trang-nu/dong-ho-nu" onclick="common.SendTrackingMenu('Đồng hồ nữ', '/thoi-trang-nu/phu-kien-thoi-trang-nu/dong-ho-nu'); return false;">Đồng hồ nữ</a>
                                            </li>
                                            <li>
                                                <a href="/thoi-trang-nu/phu-kien-thoi-trang-nu/mat-kinh-nu" onclick="common.SendTrackingMenu('Mắt kính nữ', '/thoi-trang-nu/phu-kien-thoi-trang-nu/mat-kinh-nu'); return false;">Mắt kính nữ</a>
                                            </li>
                                            <li>
                                                <a href="/thoi-trang-nu/phu-kien-thoi-trang-nu/trang-suc" onclick="common.SendTrackingMenu('Trang sức', '/thoi-trang-nu/phu-kien-thoi-trang-nu/trang-suc'); return false;">Trang sức</a>
                                            </li>
                                            <li>
                                                <a href="/thoi-trang-nu/phu-kien-thoi-trang-nu/non-khan" onclick="common.SendTrackingMenu('Nón - Khăn', '/thoi-trang-nu/phu-kien-thoi-trang-nu/non-khan'); return false;">Nón - Khăn</a>
                                            </li>
                                            <li>
                                                <a href="/thoi-trang-nu/phu-kien-thoi-trang-nu/day-nit-bop-vi" onclick="common.SendTrackingMenu('Dây nịt - Bóp ví', '/thoi-trang-nu/phu-kien-thoi-trang-nu/day-nit-bop-vi'); return false;">Dây nịt - Bóp ví</a>
                                            </li>
                                            <li>
                                                <a href="/thoi-trang-nu/phu-kien-thoi-trang-nu/phu-kien-toc" onclick="common.SendTrackingMenu('Phụ kiện tóc', '/thoi-trang-nu/phu-kien-thoi-trang-nu/phu-kien-toc'); return false;">Phụ kiện tóc</a>
                                            </li>
                                        </ul>
                                        <a href="/thoi-trang-nu" style={{"background": "url('http://resources.cungmua.com/CMBanner/635723767068768886.jpg') no-repeat right bottom"}} className="banner_hoz"></a>
                                    </div>
                                </li>
                                <li>
                                    <a href="/thoi-trang-nam" onclick="common.SendTrackingMenu('Thời trang nam', '/thoi-trang-nam'); return false;"><span className="ic_cm">y</span>Thời trang nam<span className="ic_cm  icon_arr">K</span></a>
                                    <div className="menu_ver_hover">
                                        <ul className="menu_ver_item">
                                            <li className="bold">
                                                <a href="/thoi-trang-nam/ao-nam" onclick="common.SendTrackingMenu('Áo nam', '/thoi-trang-nam/ao-nam'); return false;">Áo nam</a>
                                            </li>
                                            <li>
                                                <a href="/thoi-trang-nam/ao-nam/ao-somi-nam" onclick="common.SendTrackingMenu('Áo sơmi nam', '/thoi-trang-nam/ao-nam/ao-somi-nam'); return false;">Áo sơmi nam</a>
                                            </li>
                                            <li>
                                                <a href="/thoi-trang-nam/ao-nam/ao-thun-nam" onclick="common.SendTrackingMenu('Áo thun nam', '/thoi-trang-nam/ao-nam/ao-thun-nam'); return false;">Áo thun nam</a>
                                            </li>
                                            <li className="bold">
                                                <a href="/thoi-trang-nam/ao-khoac" onclick="common.SendTrackingMenu('Áo khoác', '/thoi-trang-nam/ao-khoac'); return false;">Áo khoác</a>
                                            </li>
                                            <li>
                                                <a href="/thoi-trang-nam/ao-khoac/ao-khoac-nam" onclick="common.SendTrackingMenu('Áo khoác nam', '/thoi-trang-nam/ao-khoac/ao-khoac-nam'); return false;">Áo khoác nam</a>
                                            </li>
                                            <li className="bold">
                                                <a href="/thoi-trang-nam/quan-nam" onclick="common.SendTrackingMenu('Quần nam', '/thoi-trang-nam/quan-nam'); return false;">Quần nam</a>
                                            </li>
                                            <li>
                                                <a href="/thoi-trang-nam/quan-nam/quan-jeans" onclick="common.SendTrackingMenu('Quần jeans', '/thoi-trang-nam/quan-nam/quan-jeans'); return false;">Quần jeans</a>
                                            </li>
                                            <li>
                                                <a href="/thoi-trang-nam/quan-nam/quan-shorts" onclick="common.SendTrackingMenu('Quần shorts', '/thoi-trang-nam/quan-nam/quan-shorts'); return false;">Quần shorts</a>
                                            </li>
                                            <li>
                                                <a href="/thoi-trang-nam/quan-nam/quan-tay-cong-so" onclick="common.SendTrackingMenu('Quần tây công sở', '/thoi-trang-nam/quan-nam/quan-tay-cong-so'); return false;">Quần tây công sở</a>
                                            </li>
                                            <li>
                                                <a href="/thoi-trang-nam/quan-nam/quan-kieu" onclick="common.SendTrackingMenu('Quần kiểu', '/thoi-trang-nam/quan-nam/quan-kieu'); return false;">Quần kiểu</a>
                                            </li>
                                            <li className="bold">
                                                <a href="/thoi-trang-nam/do-the-thao-nam" onclick="common.SendTrackingMenu('Đồ thể thao nam', '/thoi-trang-nam/do-the-thao-nam'); return false;">Đồ thể thao nam</a>
                                            </li>
                                            <li>
                                                <a href="/thoi-trang-nam/do-the-thao-nam/do-boi-nam" onclick="common.SendTrackingMenu('Đồ bơi nam', '/thoi-trang-nam/do-the-thao-nam/do-boi-nam'); return false;">Đồ bơi nam</a>
                                            </li>
                                        </ul>
                                        <ul className="menu_ver_item">
                                            <li className="bold">
                                                <a href="/thoi-trang-nam/do-lot-tat-vo" onclick="common.SendTrackingMenu('Đồ lót - Tất vớ', '/thoi-trang-nam/do-lot-tat-vo'); return false;">Đồ lót - Tất vớ</a>
                                            </li>
                                            <li>
                                                <a href="/thoi-trang-nam/do-lot-tat-vo/do-lot" onclick="common.SendTrackingMenu('Đồ lót', '/thoi-trang-nam/do-lot-tat-vo/do-lot'); return false;">Đồ lót</a>
                                            </li>
                                            <li>
                                                <a href="/thoi-trang-nam/do-lot-tat-vo/tat-vo" onclick="common.SendTrackingMenu('Tất vớ', '/thoi-trang-nam/do-lot-tat-vo/tat-vo'); return false;">Tất vớ</a>
                                            </li>
                                            <li className="bold">
                                                <a href="/thoi-trang-nam/giay-dep-nam" onclick="common.SendTrackingMenu('Giày dép nam', '/thoi-trang-nam/giay-dep-nam'); return false;">Giày dép nam</a>
                                            </li>
                                            <li>
                                                <a href="/thoi-trang-nam/giay-dep-nam/giay-tay" onclick="common.SendTrackingMenu('Giày tây', '/thoi-trang-nam/giay-dep-nam/giay-tay'); return false;">Giày tây</a>
                                            </li>
                                            <li>
                                                <a href="/thoi-trang-nam/giay-dep-nam/giay-moi" onclick="common.SendTrackingMenu('Giày mọi ', '/thoi-trang-nam/giay-dep-nam/giay-moi'); return false;">Giày mọi </a>
                                            </li>
                                            <li>
                                                <a href="/thoi-trang-nam/giay-dep-nam/giay-xang-dan-nam" onclick="common.SendTrackingMenu('Giày xăng đan nam', '/thoi-trang-nam/giay-dep-nam/giay-xang-dan-nam'); return false;">Giày xăng đan nam</a>
                                            </li>
                                            <li>
                                                <a href="/thoi-trang-nam/giay-dep-nam/giay-the-thao-nam" onclick="common.SendTrackingMenu('Giày thể thao nam', '/thoi-trang-nam/giay-dep-nam/giay-the-thao-nam'); return false;">Giày thể thao nam</a>
                                            </li>
                                            <li>
                                                <a href="/thoi-trang-nam/giay-dep-nam/dep-nam" onclick="common.SendTrackingMenu('Dép nam', '/thoi-trang-nam/giay-dep-nam/dep-nam'); return false;">Dép nam</a>
                                            </li>
                                            <li className="bold">
                                                <a href="/thoi-trang-nam/phu-kien-thoi-trang-nam" onclick="common.SendTrackingMenu('Phụ kiện thời trang nam', '/thoi-trang-nam/phu-kien-thoi-trang-nam'); return false;">Phụ kiện thời trang nam</a>
                                            </li>
                                            <li>
                                                <a href="/thoi-trang-nam/phu-kien-thoi-trang-nam/day-nit-bop-vi" onclick="common.SendTrackingMenu('Dây nịt - Bóp ví', '/thoi-trang-nam/phu-kien-thoi-trang-nam/day-nit-bop-vi'); return false;">Dây nịt - Bóp ví</a>
                                            </li>
                                            <li>
                                                <a href="/thoi-trang-nam/phu-kien-thoi-trang-nam/tui-xach-nam" onclick="common.SendTrackingMenu('Túi xách nam', '/thoi-trang-nam/phu-kien-thoi-trang-nam/tui-xach-nam'); return false;">Túi xách nam</a>
                                            </li>
                                            <li>
                                                <a href="/thoi-trang-nam/phu-kien-thoi-trang-nam/dong-ho-nam" onclick="common.SendTrackingMenu('Đồng hồ nam', '/thoi-trang-nam/phu-kien-thoi-trang-nam/dong-ho-nam'); return false;">Đồng hồ nam</a>
                                            </li>
                                            <li>
                                                <a href="/thoi-trang-nam/phu-kien-thoi-trang-nam/mat-kinh-nam" onclick="common.SendTrackingMenu('Mắt kính nam', '/thoi-trang-nam/phu-kien-thoi-trang-nam/mat-kinh-nam'); return false;">Mắt kính nam</a>
                                            </li>
                                            <li>
                                                <a href="/thoi-trang-nam/phu-kien-thoi-trang-nam/non-khan-ca-vat" onclick="common.SendTrackingMenu('Nón - Khăn - Cà vạt', '/thoi-trang-nam/phu-kien-thoi-trang-nam/non-khan-ca-vat'); return false;">Nón - Khăn - Cà vạt</a>
                                            </li>
                                        </ul>
                                        <a href="/thoi-trang-nam" style={{"background": "url('http://resources.cungmua.com/CMBanner/635723766991236750.jpg') no-repeat right bottom"}} className="banner_hoz"></a>
                                    </div>
                                </li>
                                <li>
                                    <a href="/my-pham-suc-khoe" onclick="common.SendTrackingMenu('Mỹ phẩm - Sức khỏe', '/my-pham-suc-khoe'); return false;"><span className="ic_cm">q</span>Mỹ phẩm - Sức khỏe<span className="ic_cm  icon_arr">K</span></a>
                                    <div className="menu_ver_hover">
                                        <ul className="menu_ver_item">
                                            <li className="bold">
                                                <a href="/my-pham-suc-khoe/my-pham-nuoc-hoa" onclick="common.SendTrackingMenu('Mỹ phẩm - Nước hoa', '/my-pham-suc-khoe/my-pham-nuoc-hoa'); return false;">Mỹ phẩm - Nước hoa</a>
                                            </li>
                                            <li>
                                                <a href="/my-pham-suc-khoe/my-pham-nuoc-hoa/trang-diem" onclick="common.SendTrackingMenu('Trang điểm', '/my-pham-suc-khoe/my-pham-nuoc-hoa/trang-diem'); return false;">Trang điểm</a>
                                            </li>
                                            <li>
                                                <a href="/my-pham-suc-khoe/my-pham-nuoc-hoa/cham-soc-da-mat" onclick="common.SendTrackingMenu('Chăm sóc da mặt', '/my-pham-suc-khoe/my-pham-nuoc-hoa/cham-soc-da-mat'); return false;">Chăm sóc da mặt</a>
                                            </li>
                                            <li>
                                                <a href="/my-pham-suc-khoe/my-pham-nuoc-hoa/cham-soc-co-the" onclick="common.SendTrackingMenu('Chăm sóc cơ thể', '/my-pham-suc-khoe/my-pham-nuoc-hoa/cham-soc-co-the'); return false;">Chăm sóc cơ thể</a>
                                            </li>
                                            <li>
                                                <a href="/my-pham-suc-khoe/my-pham-nuoc-hoa/nuoc-hoa" onclick="common.SendTrackingMenu('Nước hoa', '/my-pham-suc-khoe/my-pham-nuoc-hoa/nuoc-hoa'); return false;">Nước hoa</a>
                                            </li>
                                            <li>
                                                <a href="/my-pham-suc-khoe/my-pham-nuoc-hoa/danh-cho-nam-gioi" onclick="common.SendTrackingMenu('Dành cho nam giới', '/my-pham-suc-khoe/my-pham-nuoc-hoa/danh-cho-nam-gioi'); return false;">Dành cho nam giới</a>
                                            </li>
                                            <li className="bold">
                                                <a href="/my-pham-suc-khoe/dung-cu-lam-dep" onclick="common.SendTrackingMenu('Dụng cụ làm đẹp', '/my-pham-suc-khoe/dung-cu-lam-dep'); return false;">Dụng cụ làm đẹp</a>
                                            </li>
                                            <li>
                                                <a href="/my-pham-suc-khoe/dung-cu-lam-dep/dung-cu-trang-diem" onclick="common.SendTrackingMenu('Dụng cụ trang điểm', '/my-pham-suc-khoe/dung-cu-lam-dep/dung-cu-trang-diem'); return false;">Dụng cụ trang điểm</a>
                                            </li>
                                            <li>
                                                <a href="/my-pham-suc-khoe/dung-cu-lam-dep/dung-cu-tao-kieu-toc" onclick="common.SendTrackingMenu('Dụng cụ tạo kiểu tóc', '/my-pham-suc-khoe/dung-cu-lam-dep/dung-cu-tao-kieu-toc'); return false;">Dụng cụ tạo kiểu tóc</a>
                                            </li>
                                            <li>
                                                <a href="/my-pham-suc-khoe/dung-cu-lam-dep/may-massage" onclick="common.SendTrackingMenu('Máy massage', '/my-pham-suc-khoe/dung-cu-lam-dep/may-massage'); return false;">Máy massage</a>
                                            </li>
                                            <li>
                                                <a href="/my-pham-suc-khoe/dung-cu-lam-dep/dung-cu-lam-dep-co-the" onclick="common.SendTrackingMenu('Dụng cụ làm đẹp cơ thể', '/my-pham-suc-khoe/dung-cu-lam-dep/dung-cu-lam-dep-co-the'); return false;">Dụng cụ làm đẹp cơ thể</a>
                                            </li>
                                            <li className="bold">
                                                <a href="/my-pham-suc-khoe/cham-soc-suc-khoe" onclick="common.SendTrackingMenu('Chăm sóc sức khỏe', '/my-pham-suc-khoe/cham-soc-suc-khoe'); return false;">Chăm sóc sức khỏe</a>
                                            </li>
                                            <li>
                                                <a href="/my-pham-suc-khoe/cham-soc-suc-khoe/thiet-bi-y-te" onclick="common.SendTrackingMenu('Thiết bị y tế', '/my-pham-suc-khoe/cham-soc-suc-khoe/thiet-bi-y-te'); return false;">Thiết bị y tế</a>
                                            </li>
                                            <li>
                                                <a href="/my-pham-suc-khoe/cham-soc-suc-khoe/dung-cu-cham-soc-co-the" onclick="common.SendTrackingMenu('Dụng cụ chăm sóc cơ thể', '/my-pham-suc-khoe/cham-soc-suc-khoe/dung-cu-cham-soc-co-the'); return false;">Dụng cụ chăm sóc cơ thể</a>
                                            </li>
                                            <li>
                                                <a href="/my-pham-suc-khoe/cham-soc-suc-khoe/ho-tro-tinh-duc" onclick="common.SendTrackingMenu('Hỗ trợ tình dục', '/my-pham-suc-khoe/cham-soc-suc-khoe/ho-tro-tinh-duc'); return false;">Hỗ trợ tình dục</a>
                                            </li>
                                        </ul>
                                        <a href="/my-pham-suc-khoe" style={{"background": "url('http://resources.cungmua.com/CMBanner/635723766925092633.jpg') no-repeat right bottom"}} className="banner_hoz"></a>
                                    </div>
                                </li>
                                <li>
                                    <a href="/nha-cua-gia-dung" onclick="common.SendTrackingMenu('Nhà cửa - Gia dụng', '/nha-cua-gia-dung'); return false;"><span className="ic_cm">x</span>Nhà cửa - Gia dụng<span className="ic_cm  icon_arr">K</span></a>
                                    <div className="menu_ver_hover">
                                        <ul className="menu_ver_item">
                                            <li className="bold">
                                                <a href="/nha-cua-gia-dung/vat-dung-ca-nhan" onclick="common.SendTrackingMenu('Vật dụng cá nhân', '/nha-cua-gia-dung/vat-dung-ca-nhan'); return false;">Vật dụng cá nhân</a>
                                            </li>
                                            <li>
                                                <a href="/nha-cua-gia-dung/vat-dung-ca-nhan/balo-vali" onclick="common.SendTrackingMenu('Balo - Vali', '/nha-cua-gia-dung/vat-dung-ca-nhan/balo-vali'); return false;">Balo - Vali</a>
                                            </li>
                                            <li>
                                                <a href="/nha-cua-gia-dung/vat-dung-ca-nhan/non-bao-hiem" onclick="common.SendTrackingMenu('Nón bảo hiểm', '/nha-cua-gia-dung/vat-dung-ca-nhan/non-bao-hiem'); return false;">Nón bảo hiểm</a>
                                            </li>
                                            <li>
                                                <a href="/nha-cua-gia-dung/vat-dung-ca-nhan/du-ao-mua" onclick="common.SendTrackingMenu('Dù - Áo mưa', '/nha-cua-gia-dung/vat-dung-ca-nhan/du-ao-mua'); return false;">Dù - Áo mưa</a>
                                            </li>
                                            <li>
                                                <a href="/nha-cua-gia-dung/vat-dung-ca-nhan/phu-kien-du-lich" onclick="common.SendTrackingMenu('Phụ kiện du lịch', '/nha-cua-gia-dung/vat-dung-ca-nhan/phu-kien-du-lich'); return false;">Phụ kiện du lịch</a>
                                            </li>
                                            <li className="bold">
                                                <a href="/nha-cua-gia-dung/nha-cua-doi-song" onclick="common.SendTrackingMenu('Nhà cửa  - Đời sống', '/nha-cua-gia-dung/nha-cua-doi-song'); return false;">Nhà cửa  - Đời sống</a>
                                            </li>
                                            <li>
                                                <a href="/nha-cua-gia-dung/nha-cua-doi-song/trang-tri-nha-cua" onclick="common.SendTrackingMenu('Trang trí nhà cửa', '/nha-cua-gia-dung/nha-cua-doi-song/trang-tri-nha-cua'); return false;">Trang trí nhà cửa</a>
                                            </li>
                                            <li>
                                                <a href="/nha-cua-gia-dung/nha-cua-doi-song/tien-ich-sap-xep-do" onclick="common.SendTrackingMenu('Tiện ích - Sắp xếp đồ', '/nha-cua-gia-dung/nha-cua-doi-song/tien-ich-sap-xep-do'); return false;">Tiện ích - Sắp xếp đồ</a>
                                            </li>
                                            <li>
                                                <a href="/nha-cua-gia-dung/nha-cua-doi-song/ve-sinh-dung-cu" onclick="common.SendTrackingMenu('Vệ sinh - Dụng cụ', '/nha-cua-gia-dung/nha-cua-doi-song/ve-sinh-dung-cu'); return false;">Vệ sinh - Dụng cụ</a>
                                            </li>
                                            <li>
                                                <a href="/nha-cua-gia-dung/nha-cua-doi-song/chan-ga-goi-nem" onclick="common.SendTrackingMenu('Chăn ga gối nệm', '/nha-cua-gia-dung/nha-cua-doi-song/chan-ga-goi-nem'); return false;">Chăn ga gối nệm</a>
                                            </li>
                                            <li>
                                                <a href="/nha-cua-gia-dung/nha-cua-doi-song/phong-bep" onclick="common.SendTrackingMenu('Phòng bếp', '/nha-cua-gia-dung/nha-cua-doi-song/phong-bep'); return false;">Phòng bếp</a>
                                            </li>
                                            <li>
                                                <a href="/nha-cua-gia-dung/nha-cua-doi-song/phong-tam" onclick="common.SendTrackingMenu('Phòng tắm', '/nha-cua-gia-dung/nha-cua-doi-song/phong-tam'); return false;">Phòng tắm</a>
                                            </li>
                                            <li>
                                                <a href="/nha-cua-gia-dung/nha-cua-doi-song/van-phong" onclick="common.SendTrackingMenu('Văn phòng', '/nha-cua-gia-dung/nha-cua-doi-song/van-phong'); return false;">Văn phòng</a>
                                            </li>
                                            <li>
                                                <a href="/nha-cua-gia-dung/nha-cua-doi-song/ngoai-troi-san-vuon" onclick="common.SendTrackingMenu('Ngoài trời - Sân vườn', '/nha-cua-gia-dung/nha-cua-doi-song/ngoai-troi-san-vuon'); return false;">Ngoài trời - Sân vườn</a>
                                            </li>
                                        </ul>
                                        <ul className="menu_ver_item">
                                            <li className="bold">
                                                <a href="/nha-cua-gia-dung/do-dien-gia-dung" onclick="common.SendTrackingMenu('Đồ điện gia dụng', '/nha-cua-gia-dung/do-dien-gia-dung'); return false;">Đồ điện gia dụng</a>
                                            </li>
                                            <li>
                                                <a href="/nha-cua-gia-dung/do-dien-gia-dung/noi-am-binh" onclick="common.SendTrackingMenu('Nồi - Ấm - Bình', '/nha-cua-gia-dung/do-dien-gia-dung/noi-am-binh'); return false;">Nồi - Ấm - Bình</a>
                                            </li>
                                            <li>
                                                <a href="/nha-cua-gia-dung/do-dien-gia-dung/bep-lo-nuong-vi-song" onclick="common.SendTrackingMenu('Bếp - Lò nướng - Vi sóng', '/nha-cua-gia-dung/do-dien-gia-dung/bep-lo-nuong-vi-song'); return false;">Bếp - Lò nướng - Vi sóng</a>
                                            </li>
                                            <li>
                                                <a href="/nha-cua-gia-dung/do-dien-gia-dung/may-xay-may-ep" onclick="common.SendTrackingMenu('Máy xay - máy ép', '/nha-cua-gia-dung/do-dien-gia-dung/may-xay-may-ep'); return false;">Máy xay - máy ép</a>
                                            </li>
                                            <li>
                                                <a href="/nha-cua-gia-dung/do-dien-gia-dung/quat-may-nong-lanh" onclick="common.SendTrackingMenu('Quạt - Máy nóng lạnh', '/nha-cua-gia-dung/do-dien-gia-dung/quat-may-nong-lanh'); return false;">Quạt - Máy nóng lạnh</a>
                                            </li>
                                            <li>
                                                <a href="/nha-cua-gia-dung/do-dien-gia-dung/may-hut-bui-ve-sinh" onclick="common.SendTrackingMenu('Máy hút bụi - Vệ sinh', '/nha-cua-gia-dung/do-dien-gia-dung/may-hut-bui-ve-sinh'); return false;">Máy hút bụi - Vệ sinh</a>
                                            </li>
                                            <li>
                                                <a href="/nha-cua-gia-dung/do-dien-gia-dung/thiet-bi-chieu-sang" onclick="common.SendTrackingMenu('Thiết bị chiếu sáng', '/nha-cua-gia-dung/do-dien-gia-dung/thiet-bi-chieu-sang'); return false;">Thiết bị chiếu sáng</a>
                                            </li>
                                            <li>
                                                <a href="/nha-cua-gia-dung/do-dien-gia-dung/ban-ui-may-may" onclick="common.SendTrackingMenu('Bàn ủi - Máy may', '/nha-cua-gia-dung/do-dien-gia-dung/ban-ui-may-may'); return false;">Bàn ủi - Máy may</a>
                                            </li>
                                            <li>
                                                <a href="/nha-cua-gia-dung/do-dien-gia-dung/tu-lanh-thiet-bi-lon" onclick="common.SendTrackingMenu('Tủ lạnh - Thiết bị lớn', '/nha-cua-gia-dung/do-dien-gia-dung/tu-lanh-thiet-bi-lon'); return false;">Tủ lạnh - Thiết bị lớn</a>
                                            </li>
                                        </ul>
                                        <a href="/nha-cua-gia-dung" style={{"background": "url('http://resources.cungmua.com/CMBanner/635705992317281428.png') no-repeat right bottom"}} className="banner_hoz"></a>
                                    </div>
                                </li>
                                <li>
                                    <a href="/do-choi-be-yeu" onclick="common.SendTrackingMenu('Đồ chơi - Bé yêu', '/do-choi-be-yeu'); return false;"><span className="ic_cm">m</span>Đồ chơi - Bé yêu<span className="ic_cm  icon_arr">K</span></a>
                                    <div className="menu_ver_hover">
                                        <ul className="menu_ver_item">
                                            <li className="bold">
                                                <a href="/do-choi-be-yeu/do-choi" onclick="common.SendTrackingMenu('Đồ chơi', '/do-choi-be-yeu/do-choi'); return false;">Đồ chơi</a>
                                            </li>
                                            <li>
                                                <a href="/do-choi-be-yeu/do-choi/do-choi-cho-be-lon" onclick="common.SendTrackingMenu('Đồ chơi cho bé lớn', '/do-choi-be-yeu/do-choi/do-choi-cho-be-lon'); return false;">Đồ chơi cho bé lớn</a>
                                            </li>
                                            <li>
                                                <a href="/do-choi-be-yeu/do-choi/do-choi-cho-be-nho" onclick="common.SendTrackingMenu('Đồ chơi cho bé nhỏ', '/do-choi-be-yeu/do-choi/do-choi-cho-be-nho'); return false;">Đồ chơi cho bé nhỏ</a>
                                            </li>
                                            <li className="bold">
                                                <a href="/do-choi-be-yeu/thoi-trang-tre-em" onclick="common.SendTrackingMenu('Thời trang trẻ em', '/do-choi-be-yeu/thoi-trang-tre-em'); return false;">Thời trang trẻ em</a>
                                            </li>
                                            <li>
                                                <a href="/do-choi-be-yeu/thoi-trang-tre-em/be-so-sinh" onclick="common.SendTrackingMenu('Bé sơ sinh', '/do-choi-be-yeu/thoi-trang-tre-em/be-so-sinh'); return false;">Bé sơ sinh</a>
                                            </li>
                                            <li>
                                                <a href="/do-choi-be-yeu/thoi-trang-tre-em/be-trai" onclick="common.SendTrackingMenu('Bé trai', '/do-choi-be-yeu/thoi-trang-tre-em/be-trai'); return false;">Bé trai</a>
                                            </li>
                                            <li>
                                                <a href="/do-choi-be-yeu/thoi-trang-tre-em/be-gai" onclick="common.SendTrackingMenu('Bé gái', '/do-choi-be-yeu/thoi-trang-tre-em/be-gai'); return false;">Bé gái</a>
                                            </li>
                                            <li className="bold">
                                                <a href="/do-choi-be-yeu/cham-soc-be" onclick="common.SendTrackingMenu('Chăm sóc bé', '/do-choi-be-yeu/cham-soc-be'); return false;">Chăm sóc bé</a>
                                            </li>
                                            <li>
                                                <a href="/do-choi-be-yeu/cham-soc-be/tam-ve-sinh" onclick="common.SendTrackingMenu('Tắm - Vệ sinh', '/do-choi-be-yeu/cham-soc-be/tam-ve-sinh'); return false;">Tắm - Vệ sinh</a>
                                            </li>
                                            <li>
                                                <a href="/do-choi-be-yeu/cham-soc-be/cho-be-an" onclick="common.SendTrackingMenu('Cho bé ăn', '/do-choi-be-yeu/cham-soc-be/cho-be-an'); return false;">Cho bé ăn</a>
                                            </li>
                                            <li>
                                                <a href="/do-choi-be-yeu/cham-soc-be/vat-dung-cham-soc-be" onclick="common.SendTrackingMenu('Vật dụng chăm sóc bé', '/do-choi-be-yeu/cham-soc-be/vat-dung-cham-soc-be'); return false;">Vật dụng chăm sóc bé</a>
                                            </li>
                                        </ul>
                                        <a href="/do-choi-be-yeu" style={{"background": "url('http://resources.cungmua.com/CMBanner/635723766746628320.jpg') no-repeat right bottom"}} className="banner_hoz"></a>
                                    </div>
                                </li>
                                <li>
                                    <a href="/cong-nghe-phu-kien" onclick="common.SendTrackingMenu('Công nghệ - Phụ kiện', '/cong-nghe-phu-kien'); return false;"><span className="ic_cm">F</span>Công nghệ - Phụ kiện<span className="ic_cm  icon_arr">K</span></a>
                                    <div className="menu_ver_hover">
                                        <ul className="menu_ver_item">
                                            <li className="bold">
                                                <a href="/cong-nghe-phu-kien/tivi-video" onclick="common.SendTrackingMenu('Tivi - Video', '/cong-nghe-phu-kien/tivi-video'); return false;">Tivi - Video</a>
                                            </li>
                                            <li>
                                                <a href="/cong-nghe-phu-kien/tivi-video/dau-dia-karaoke" onclick="common.SendTrackingMenu('Đầu đĩa - Karaoke', '/cong-nghe-phu-kien/tivi-video/dau-dia-karaoke'); return false;">Đầu đĩa - Karaoke</a>
                                            </li>
                                        </ul>
                                        <ul className="menu_ver_item">
                                            <li className="bold">
                                                <a href="/cong-nghe-phu-kien/phu-kien-cong-nghe" onclick="common.SendTrackingMenu('Phụ kiện công nghệ', '/cong-nghe-phu-kien/phu-kien-cong-nghe'); return false;">Phụ kiện công nghệ</a>
                                            </li>
                                            <li>
                                                <a href="/cong-nghe-phu-kien/phu-kien-cong-nghe/loa-tai-nghe" onclick="common.SendTrackingMenu('Loa - Tai nghe', '/cong-nghe-phu-kien/phu-kien-cong-nghe/loa-tai-nghe'); return false;">Loa - Tai nghe</a>
                                            </li>
                                            <li>
                                                <a href="/cong-nghe-phu-kien/phu-kien-cong-nghe/pin-bo-sac" onclick="common.SendTrackingMenu('Pin - Bộ sạc', '/cong-nghe-phu-kien/phu-kien-cong-nghe/pin-bo-sac'); return false;">Pin - Bộ sạc</a>
                                            </li>
                                            <li>
                                                <a href="/cong-nghe-phu-kien/phu-kien-cong-nghe/bao-tui-vo-boc" onclick="common.SendTrackingMenu('Bao - Túi - Vỏ bọc', '/cong-nghe-phu-kien/phu-kien-cong-nghe/bao-tui-vo-boc'); return false;">Bao - Túi - Vỏ bọc</a>
                                            </li>
                                            <li>
                                                <a href="/cong-nghe-phu-kien/phu-kien-cong-nghe/the-nho-o-cung" onclick="common.SendTrackingMenu('Thẻ nhớ - Ổ cứng', '/cong-nghe-phu-kien/phu-kien-cong-nghe/the-nho-o-cung'); return false;">Thẻ nhớ - Ổ cứng</a>
                                            </li>
                                            <li>
                                                <a href="/cong-nghe-phu-kien/phu-kien-cong-nghe/chuot-ban-phim" onclick="common.SendTrackingMenu('Chuột - Bàn phím', '/cong-nghe-phu-kien/phu-kien-cong-nghe/chuot-ban-phim'); return false;">Chuột - Bàn phím</a>
                                            </li>
                                            <li>
                                                <a href="/cong-nghe-phu-kien/phu-kien-cong-nghe/phu-kien-phan-mem" onclick="common.SendTrackingMenu('Phụ kiện - Phần mềm', '/cong-nghe-phu-kien/phu-kien-cong-nghe/phu-kien-phan-mem'); return false;">Phụ kiện - Phần mềm</a>
                                            </li>
                                        </ul>
                                        <a href="/cong-nghe-phu-kien" style={{"background": "url('http://resources.cungmua.com/CMBanner/635723766651312152.jpg') no-repeat right bottom"}} className="banner_hoz"></a>
                                    </div>
                                </li>
                                <li className="end">
                                    <a href="/thuc-pham-dinh-duong" onclick="common.SendTrackingMenu('Thực phẩm - Dinh dưỡng', '/thuc-pham-dinh-duong'); return false;"><span className="ic_cm">v</span>Thực phẩm - Dinh dưỡng<span className="ic_cm  icon_arr">K</span></a>
                                    <div className="menu_ver_hover">
                                        <ul className="menu_ver_item">
                                            <li className="bold">
                                                <a href="/thuc-pham-dinh-duong/thuc-pham-chuc-nang" onclick="common.SendTrackingMenu('Thực phẩm chức năng', '/thuc-pham-dinh-duong/thuc-pham-chuc-nang'); return false;">Thực phẩm chức năng</a>
                                            </li>
                                            <li>
                                                <a href="/thuc-pham-dinh-duong/thuc-pham-chuc-nang/yen-sao-nuoc-yen" onclick="common.SendTrackingMenu('Yến sào - Nước yến', '/thuc-pham-dinh-duong/thuc-pham-chuc-nang/yen-sao-nuoc-yen'); return false;">Yến sào - Nước yến</a>
                                            </li>
                                            <li>
                                                <a href="/thuc-pham-dinh-duong/thuc-pham-chuc-nang/thuc-pham-bo-sung" onclick="common.SendTrackingMenu('Thực phẩm bổ sung', '/thuc-pham-dinh-duong/thuc-pham-chuc-nang/thuc-pham-bo-sung'); return false;">Thực phẩm bổ sung</a>
                                            </li>
                                            <li className="bold">
                                                <a href="/thuc-pham-dinh-duong/thuc-pham-kho" onclick="common.SendTrackingMenu('Thực phẩm khô', '/thuc-pham-dinh-duong/thuc-pham-kho'); return false;">Thực phẩm khô</a>
                                            </li>
                                            <li>
                                                <a href="/thuc-pham-dinh-duong/thuc-pham-kho/banh-ngot-keo" onclick="common.SendTrackingMenu('Bánh ngọt - Kẹo', '/thuc-pham-dinh-duong/thuc-pham-kho/banh-ngot-keo'); return false;">Bánh ngọt - Kẹo</a>
                                            </li>
                                            <li>
                                                <a href="/thuc-pham-dinh-duong/thuc-pham-kho/do-hop-dong-goi" onclick="common.SendTrackingMenu('Đồ hộp - Đóng gói', '/thuc-pham-dinh-duong/thuc-pham-kho/do-hop-dong-goi'); return false;">Đồ hộp - Đóng gói</a>
                                            </li>
                                            <li>
                                                <a href="/thuc-pham-dinh-duong/thuc-pham-kho/hat-kho-rong-bien" onclick="common.SendTrackingMenu('Hạt khô - Rong biển', '/thuc-pham-dinh-duong/thuc-pham-kho/hat-kho-rong-bien'); return false;">Hạt khô - Rong biển</a>
                                            </li>
                                        </ul>
                                        <ul className="menu_ver_item">
                                            <li className="bold">
                                                <a href="/thuc-pham-dinh-duong/thuc-pham-tuoi" onclick="common.SendTrackingMenu('Thực phẩm tươi', '/thuc-pham-dinh-duong/thuc-pham-tuoi'); return false;">Thực phẩm tươi</a>
                                            </li>
                                            <li>
                                                <a href="/thuc-pham-dinh-duong/thuc-pham-tuoi/banh-tuoi-dac-san" onclick="common.SendTrackingMenu('Bánh tươi - Đặc sản', '/thuc-pham-dinh-duong/thuc-pham-tuoi/banh-tuoi-dac-san'); return false;">Bánh tươi - Đặc sản</a>
                                            </li>
                                            <li>
                                                <a href="/thuc-pham-dinh-duong/thuc-pham-tuoi/san-pham-tu-thit-hai-san" onclick="common.SendTrackingMenu('Sản phẩm từ thịt/ hải sản', '/thuc-pham-dinh-duong/thuc-pham-tuoi/san-pham-tu-thit-hai-san'); return false;">Sản phẩm từ thịt/ hải sản</a>
                                            </li>
                                            <li>
                                                <a href="/thuc-pham-dinh-duong/thuc-pham-tuoi/rau-cu-qua" onclick="common.SendTrackingMenu('Rau - Củ - Quả', '/thuc-pham-dinh-duong/thuc-pham-tuoi/rau-cu-qua'); return false;">Rau - Củ - Quả</a>
                                            </li>
                                            <li className="bold">
                                                <a href="/thuc-pham-dinh-duong/thuc-uong" onclick="common.SendTrackingMenu('Thức uống', '/thuc-pham-dinh-duong/thuc-uong'); return false;">Thức uống</a>
                                            </li>
                                            <li>
                                                <a href="/thuc-pham-dinh-duong/thuc-uong/thuc-uong-co-con" onclick="common.SendTrackingMenu('Thức uống có cồn', '/thuc-pham-dinh-duong/thuc-uong/thuc-uong-co-con'); return false;">Thức uống có cồn</a>
                                            </li>
                                            <li>
                                                <a href="/thuc-pham-dinh-duong/thuc-uong/thuc-uong-khong-con" onclick="common.SendTrackingMenu('Thức uống không cồn', '/thuc-pham-dinh-duong/thuc-uong/thuc-uong-khong-con'); return false;">Thức uống không cồn</a>
                                            </li>
                                        </ul>
                                        <a href="/thuc-pham-dinh-duong" style={{"background": "url('http://resources.cungmua.com/CMBanner/635723766472379838.jpg') no-repeat right bottom"}} className="banner_hoz"></a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <div className="logo_cungmua">
                        <a href="/" className="logo_cungmua"><img alt="cungmua" src="/Content/images/logo_cungmua.png" width="163" height="34" /></a>
                    </div>
                    <div className="menu_right_home">
                        <div id="divSearch" className="search">
                            <form id="frmSearch" method="GET">
                                <input type="text" id="search" name="q" autocomplete="off" placeholder="Tìm kiếm khuyến mãi..." maxlength="200" />
                                <button onclick="return layoutDesktop.ClickHeaderSearch(); " className="btn_search" value="Tìm kiếm khuyến mãi..."><span className="ic_cm">E</span></button>
                            </form>
                        </div>
                        <ul className="menu_top scroll_menu">
                            <li className="end">
                                <a>19006637<span className="ic_cm icon-arrow-d">k</span></a>
                                <div className="hover_menu">
                                    <ul className="list_hotline">
                                        <li><a href="/phuong-thuc-van-chuyen">Phương thức vận chuyển </a></li>
                                        <li><a href="/chinh-sach-doi-tra">Chính sách đổi trả</a></li>
                                        <li><a href="/su-dung-voucher">Sử dụng voucher</a></li>
                                        <li className="email"><span className="ic_cm icon-email">2</span><a href="mailto:hotro@cungmua.com">hotro@cungmua.com</a></li>
                                        <li className="phone">
                                            <span className="icon-phone ic_cm">D</span>
                                            <p className="bold">19006637</p>
                                            <p>(8h - 21h kể cả Thứ 7 - Chủ Nhật)</p>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li id="cartTopScroll">
                                <a href="/checkout/gio-hang">Giỏ hàng (<span>0</span>)<span className="ic_cm icon-arrow-d">k</span></a>
                                <div className="hover_menu">
                                    <p className="hover_TT">Giỏ hàng của bạn</p>
                                    <p className="no_item">
                                        Hiện chưa có sản phẩm nào
                                        <br />
                                        trong giỏ hàng của bạn
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}