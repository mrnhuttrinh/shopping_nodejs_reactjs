import React, {Component} from 'react';
import _ from 'lodash';

export default class Control extends Component {
    redirectPay(event) {
        event.preventDefault();
        window.location = "/#/payment";
    }
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
                        <button className="btn_primary" onClick={this.redirectPay.bind(this)}>
                            ĐẶT MUA
                        </button>
                    ) : null
                }
            </div>
        );
    }
}
