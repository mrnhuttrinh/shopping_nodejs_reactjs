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
            <div className="col-md-4 col-sm-12">
                <div className="parent_column_payment">
                    <p className="title_buy">
                        1. Sản phẩm
                    </p>
                    <div>
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
            </div>
        )
    }
}