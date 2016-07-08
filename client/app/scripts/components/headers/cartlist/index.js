import React, {Component} from 'react';
import CartItem from './CartItem';
import CartSum from './CartSum';
import CartButton from './CartButton';

export default class CartList extends Component {
    render() {
        return (
            <ul className="shop_cart_list">
                <CartItem />
                <CartItem />
                <CartSum />
                <CartButton />
            </ul>
        );
    }
}
