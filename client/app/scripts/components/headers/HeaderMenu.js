import React, {Component} from 'react';

export default class HeaderMenu extends Component {
    render() {
        return (
            <div className="header_menu">
                <div className="container">
                    <div className="col-lg-3"><a className="link_premium" href="/premium"><span className="ic_cm icon-card">o</span>Hội viên premium</a></div>
                    <div className="col-lg-9">
                        <ul className="menu_top">
                            <li className="end">
                                <a><span className="icon-phone ic_cm">D</span>Hỗ trợ: 19006637 (8h-21h)<span className="ic_cm icon-arrow-d">k</span></a>
                                <div className="hover_menu">
                                    <ul className="list_hotline">
                                        <li><a href="/phuong-thuc-van-chuyen">Phương thức vận chuyển </a></li>
                                        <li><a href="/chinh-sach-doi-tra">Chính sách đổi trả</a></li>
                                        <li><a href="/su-dung-voucher">Sử dụng voucher</a></li>
                                        <li className="email"><span className="ic_cm icon-email">2</span><a href="mailto:hotro@cungmua.com">hotro@cungmua.com</a></li>
                                        <li className="phone"><span className="icon-phone ic_cm">D</span>
                                            <p className="bold">19006637</p>
                                            <p>(8h - 21h kể cả Thứ 7 - Chủ Nhật)</p>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li id="cartTopHeader">
                                <div id="cartTop">
                                    <a href="/checkout/gio-hang">Giỏ hàng (<span>0</span>)<span className="ic_cm icon-arrow-d">k</span></a>
                                    <div className="hover_menu">
                                        <p className="hover_TT">Giỏ hàng của bạn</p>
                                            <p className="no_item">
                                            Hiện chưa có sản phẩm nào
                                            <br />
                                            trong giỏ hàng của bạn
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <a href="/dang-nhap">Đăng nhập<span className="ic_cm icon-arrow-d">k</span></a>
                                <div className="hover_menu">
                                    <ul className="list_hotline">
                                        <li className="btn"><a className="btn_face" onclick="login.FacebookLogin()"></a></li>
                                        <li className="btn">
                                            <button className="btn_brand1" onclick="location.href = '/dang-nhap'">ĐĂNG NHẬP</button>
                                        </li>
                                        <li className="note">Khách hàng mới? <a href="/dang-ky-tai-khoan"> Tạo tài khoản</a></li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}