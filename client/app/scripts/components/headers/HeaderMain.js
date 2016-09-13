import React, {Component} from 'react';
import HeaderMenu from "../commons/HeaderMenu";
import Cart from './Cart';
import CartTitle from './CartTitle';

export default class HeaderMain extends Component {
    clickSearch(e) {
        var divSearch = $("#divSearch");
        divSearch.addClass("search1");
        divSearch.removeClass("search")
        e.preventDefault();
    }

    componentDidMount() {
        var self = this;
        $(function() {
            $(window).scroll(function() {
                var windowTop = $(window).scrollTop();
                var divSearch = $("#divSearch");
                var windowWidth = $(window).width();
                if (windowTop > 10 || windowWidth <= 1020 &&
                    divSearch.attr("class") === "search") {
                        divSearch.addClass("search");
                        divSearch.removeClass("search1")
                } else {
                    divSearch.addClass("search1");
                    divSearch.removeClass("search")
                }
            })
        })
    }

    render() {
        return (
            <div className="header_main ">
                <div className="container">
                    <nav className="chose_cate">
                        <a><span className="ic_cm icon-menu">A</span><span className="text_cate">CHỌN DANH MỤC</span></a>
                        <div className="menu_cate menu_ver_inside " id="menu_cate_header">
                            <HeaderMenu menus={this.props.menus} />
                        </div>
                    </nav>
                    <div className="logo_cungmua">
                        <a href="/" className="logo_cungmua"><img alt="Áo Thun Phong Cách" src="/images/logo_main.png" width="163" height="34" /></a>
                    </div>
                    <div className="menu_right_home">
                        <div id="divSearch" className="search">
                            <form id="frmSearch">
                                <input type="text" id="search" name="q" autoComplete="off" placeholder="Tìm kiếm khuyến mãi..." maxLength="200" />
                                <button onClick={this.clickSearch.bind(null)} className="btn_search" value="Tìm kiếm khuyến mãi..."><span className="ic_cm">E</span></button>
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
                                        <li className="email"><span className="ic_cm icon-email">2</span><a href="mailto:hotro@aothunphongcach.com">hotro@aothunphongcach.com</a></li>
                                        <li className="phone">
                                            <span className="icon-phone ic_cm">D</span>
                                            <p className="bold">1234567890</p>
                                            <p>(8h - 21h kể cả Thứ 7 - Chủ Nhật)</p>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li id="cartTopScroll">
                                <CartTitle cartItems={this.props.cartItems}/>
                                <Cart {...this.props} cartItems={this.props.cartItems}/>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}