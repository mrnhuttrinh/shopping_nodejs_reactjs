import React, {Component} from 'react';

export default class CartTitle extends Component {
    render() {
        return (
            <a href="/checkout/gio-hang">Giỏ hàng (<span>0</span>)<span className="ic_cm icon-arrow-d">k</span></a>
        );
    }
}
