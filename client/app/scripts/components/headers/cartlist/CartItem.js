import React, {Component} from 'react';

export default class CartItem extends Component {
    render() {
        return (
            <li id="cart_li_1" className="cart_item">
                <a className="product_img" href="/thoi-trang-nu/phu-kien-thoi-trang-nu/tui-xach-nu/tui-deo-cheo-kipling-theu-mau-xanh-den_p112483.html">
                    <img alt="Túi đeo chéo Kipling thêu màu xanh đen" src="http://resources2.cungmua.com/SKU/112000/Small/223771.jpg" />
                </a>
                <a href="/thoi-trang-nu/phu-kien-thoi-trang-nu/tui-xach-nu/tui-deo-cheo-kipling-theu-mau-xanh-den_p112483.html" className="product_name">Túi đeo chéo Kipling thêu màu xanh đen</a>
                <span className="product_sum">Số lượng: 1</span> 
                <a onclick="cart.removeFromCart(223771, 'ShoppingCart')" className="product_sum_de">
                    <img width="16" height="16" className="delete" src="/Content/Images/delete1.png" />
                </a>
            </li>
        );
    }
}
