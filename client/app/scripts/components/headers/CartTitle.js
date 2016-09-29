import React, {Component} from 'react';
import _ from 'lodash';
import { Router, Link, Navigation } from 'react-router';

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
            <Link to="/checkout/cart">Giỏ hàng (<span>{total}</span>)<span className="ic_cm icon-arrow-d">k</span></Link>
        );
    }
}
