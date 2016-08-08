import React, {Component} from 'react';
import ItemCart from './ItemCart';
import _ from 'lodash';

export default class BlockOne extends Component {
    renderListItem() {
        var cartItems = this.props.cartItems;
        return _.map(cartItems, (cart) => {
            return _.map(cart.items, item => {
                return (<ItemCart item={item} product={cart.product}/>);
            });
        });
    }
    render() {
        return (
            <div className="col-xl-4 col-md-4 col-sm-12">
                <p className="title_buy col-xl-12 col-md-12 col-sm-12">
                    1. Sản phẩm
                </p>
                <div className="col-xl-12 col-md-12 col-sm-12 clear_padding border_right_e8e8e8">
                    <ul className="list_pay">
                        {this.renderListItem()}
                    </ul>
                    <p className="change_cart">
                        <a className="change_shop" href="/#/checkout/cart">
                            Thay đổi giỏ hàng
                        </a>
                    </p>
                </div>
            </div>
        )
    }
}