import React, {Component} from 'react';
import CartList from './cartlist';
import _ from 'lodash';

export default class Cart extends Component {
    renderEmptyCart() {
        return (
            <div className="hover_menu">
                <p className="hover_TT">Giỏ hàng của bạn</p>
                <p className="no_item">
                    Hiện chưa có sản phẩm nào
                    <br />
                    trong giỏ hàng của bạn
                </p>
            </div>
        );
    }
    renderFullCart(cartItems) {
        return (
            <div className="hover_menu">
                <CartList cartItems={cartItems} {...this.props}/>
            </div>
        );
    }
    render() {
        var cartItems = this.props.cartItems;
        if (_.isEmpty(cartItems)) {
            return this.renderEmptyCart();
        } else {
            return this.renderFullCart(cartItems);
        }
        
    }
}
