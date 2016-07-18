import React, {Component} from 'react';
import formatCurrency from '../../utils/formatcurrency';

export default class Item extends Component {
    removeFromCart(event) {
        event.preventDefault();
        // add to local item
        var cartItems = localItem.getItem("cartItems");
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
        localItem.setItem("cartItems", cartItems);
    }
    render() {
        var item = this.props.item;
        var product = this.props.product;
        return (
            <tr>
                <td valign="left">
                    <a href={"/#/product/" + product.text_link}>
                        <img alt={product.name} height="64" src={"/admin/" + product.thumbnail} width="64"/>
                    </a>
                    <a className="deal_name" href={"/#/product/" + product.text_link}>
                        {product.name} - size: {item.name}
                    </a>
                    <p className="acc_note">
                        Giao sản phẩm toàn quốc
                    </p>
                </td>
                <td align="center">
                    <strong>
                        {formatCurrency(product.price_wholesale_promotion)}đ
                    </strong>
                </td>
                <td align="center">
                    <input style={{color: "black"}} min="0" defaultValue={item.quantity} type="number" className="select_number num selectUpdateQTY"/>
                    <a className="ic_cm icon-close1" onClick={this.removeFromCart.bind(this)}>
                        W
                    </a>
                </td>
                <td align="center">
                    <span className="num_money">
                        <strong>
                            {formatCurrency(product.price_wholesale_promotion * item.quantity)}đ
                        </strong>
                    </span>
                </td>
            </tr>
        );
    }
}
