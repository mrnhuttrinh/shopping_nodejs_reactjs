import React, {Component} from 'react';
import _ from 'lodash';

export default class Control extends Component {
    render() {
        var cartItems = this.props.cartItems;
        return (
            <div className="cart_link">
                <a className="continue_cart" href="/#">
                    <span className="ic_cm icon-arrow-double-l">
                        N
                    </span>
                    Tiếp tục mua hàng
                </a>
                {
                    !_.isEmpty(cartItems) ? (
                        <button className="btn_primary" onclick="window.location = '/checkout/thanh-toan' ">
                            ĐẶT MUA
                        </button>
                    ) : null
                }
            </div>
        );
    }
}
