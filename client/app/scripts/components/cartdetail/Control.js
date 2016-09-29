import React, {Component} from 'react';
import _ from 'lodash';

export default class Control extends Component {
    constructor(props) {
        super(props);
    }
    redirectPay(event) {
        event.preventDefault();
        if (this.props.user) {
            // window.location = "/payment";
            this.context.router.push("/payment" );
        }
    }
    render() {
        var cartItems = this.props.cartItems;
        var user = this.props.user;
        return (
            <div className="cart_link">
                <a className="continue_cart" href="/">
                    <span className="ic_cm icon-arrow-double-l">
                        N
                    </span>
                    Tiếp tục mua hàng
                </a>
                {
                    (!_.isEmpty(cartItems) && user)? (
                        <button className="btn_primary" onClick={this.redirectPay.bind(this)}>
                            ĐẶT MUA
                        </button>
                    ) : null
                }
            </div>
        );
    }
}

Control.contextTypes = {
    router: function() { return React.PropTypes.func.isRequired; }
};