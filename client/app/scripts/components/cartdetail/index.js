import React, {Component} from 'react';
import TableTitle from './TableTitle';
import Item from './Item';
import EndItem from './EndItem';
import Control from './Control';
import ProductRecommend from './ProductRecommend';
import _ from 'lodash';

export default class CartDetail extends Component {
    constructor(props) {
        super(props);
        this.total = 0;
    }
    // componentWillMount() {
    //     var cartItems = localItem.getItem("cartItems");
    //     if (_.isEmpty()) {
    //         window.location = "/#";
    //     }
    // }
    renderListItem() {
        this.total = 0;
        var cartItems = this.props.cartItems;
        return _.map(cartItems, cart => {
            return _.map(cart.items, item => {
                this.total += (cart.product.price_wholesale_promotion * item.quantity);
                return (<Item key={"product_" + cart.product.id + "_item_" + item.id} item={item} {...this.props} product={cart.product}/>);
            });
        });
    }
    render() {
        var cartItems = this.props.cartItems;
        return (
            <div>
                <div className="container">
                    <div id="cartPage">
                        <div className="container account_col">
                            <p className="title_inside2">
                                Chi tiết giỏ hàng
                            </p>
                            {
                                !_.isEmpty(cartItems) ? (
                                    <table border="0" cellpadding="0" cellspacing="0" className="list_order_view">
                                        <tbody>
                                            <TableTitle />
                                            {this.renderListItem()}
                                            <EndItem total={this.total}/>
                                        </tbody>
                                    </table>
                                ) : (
                                    <p className="no_product">Không có sản phẩm nào trong giỏ hàng</p>
                                )
                            }
                            <Control cartItems={cartItems} {...this.props}/>
                            <br className="clean" />
                        </div>
                    </div>
                </div>
                <ProductRecommend />
            </div>
        );
    }
}
