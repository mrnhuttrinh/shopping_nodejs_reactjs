import React, {Component} from 'react';
import Cart from './Cart';
import CartTitle from './CartTitle';

export default class HeaderMenu extends Component {
    render() {
        return (
            <div className="header_menu">
                <div className="container">
                    <div className="col-lg-3"><a className="link_premium" href="/#"><span className="ic_cm icon-card">c</span>Trang Chủ</a></div>
                    <div className="col-lg-9">
                        <ul className="menu_top">
                            <li className="end">
                                <a><span className="icon-phone ic_cm">D</span>Hỗ trợ: 19006637 (8h-21h)<span className="ic_cm icon-arrow-d">k</span></a>
                                <div className="hover_menu">
                                    <ul className="list_hotline">
                                        <li><a href="/phuong-thuc-van-chuyen">Phương thức vận chuyển </a></li>
                                        <li><a href="/chinh-sach-doi-tra">Chính sách đổi trả</a></li>
                                        <li><a href="/su-dung-voucher">Sử dụng voucher</a></li>
                                        <li className="email"><span className="ic_cm icon-email">2</span><a href="mailto:hotro@aothunphongcach.com">hotro@aothunphongcach.com</a></li>
                                        <li className="phone"><span className="icon-phone ic_cm">D</span>
                                            <p className="bold">1234567890</p>
                                            <p>(8h - 21h kể cả Thứ 7 - Chủ Nhật)</p>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li id="cartTopHeader">
                                <div id="cartTop">
                                    <CartTitle cartItems={this.props.cartItems}/>
                                    <Cart {...this.props} cartItems={this.props.cartItems}/>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}