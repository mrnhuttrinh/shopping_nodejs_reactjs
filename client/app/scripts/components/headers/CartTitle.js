import React, {Component} from 'react';
import _ from 'lodash';

export default class CartTitle extends Component {
    render() {
        var cartItems = this.props.cartItems;
        var total = 0;
        _.forEach(cartItems, cart => {
            _.forEach(cart.items, item => {
                total++;
            });
        });
        return (
            <a href="/checkout/cart">Giỏ hàng (<span>{total}</span>)<span className="ic_cm icon-arrow-d">k</span></a>
        );
    }
}
