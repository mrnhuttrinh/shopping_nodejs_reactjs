import React, {Component} from 'react';
import CartItem from './CartItem';
import CartSum from './CartSum';
import CartButton from './CartButton';
import _ from 'lodash';

export default class CartList extends Component {
    render() {
        var total = 0;
        var cartItems = this.props.cartItems;
        var cartListItem = _.map(cartItems, cart => {
            return _.map(cart.items, item => {
                total += total + cart.product.price_wholesale_promotion;
                return (<CartItem {...this.props} item={item} product={cart.product}/>);
            });
        });

        return (
            <ul className="shop_cart_list">
                {cartListItem}
                <CartSum total={total}/>
                <CartButton />
            </ul>
        );
    }
}
