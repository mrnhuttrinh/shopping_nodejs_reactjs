import React, {Component} from 'react';
import _ from 'lodash';

export default class CartItem extends Component {
    removeFromCart() {
        // add to local item
        var cartItems = this.props.cartItems;
        cartItems = cartItems || {};

        var product = this.props.product;
        var item = this.props.item;

        var carts = cartItems[product.id];
        _.remove(carts.items, (_item) => {
            return _item.name === item.name;
        });

        // merge item to local store
        if (_.isEmpty(carts.items)) {
            delete cartItems[product.id];
        } else {
            cartItems[product.id] = {
                product: product,
                items: carts.items
            };
        }

        this.props.updateCartItems(cartItems);
    }
    render() {
        var product = this.props.product;
        var item = this.props.item;
        return (
            <li id="cart_li_1" className="cart_item">
                <a className="product_img" href={"/#/product/" + product.text_link}>
                    <img alt={product.name} src={"admin/" + product.thumbnail} />
                </a>
                <a href={"/#/product/" + product.text_link} className="product_name">{product.name} - {item.name}</a>
                <span className="product_sum">Số lượng: {item.quantity}</span> 
                <a onClick={this.removeFromCart.bind(this)} className="product_sum_de">
                    <img width="16" height="16" className="delete" src="/images/delete1.png" />
                </a>
            </li>
        );
    }
}
