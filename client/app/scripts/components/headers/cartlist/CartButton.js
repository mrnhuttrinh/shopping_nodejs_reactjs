import React, {Component} from 'react';

export default class CartButton extends Component {
    render() {
        return (
            <li className="btn_cart">
                <button className="btn_brand1" onclick="location.href = '/checkout/gio-hang'">XEM GIỎ HÀNG</button>
            </li>
        );
    }
}
