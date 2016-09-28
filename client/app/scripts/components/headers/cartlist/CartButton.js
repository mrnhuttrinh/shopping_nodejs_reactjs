import React, {Component} from 'react';

export default class CartButton extends Component {
    redirect() {
        // window.location = '/checkout/cart';
        this.context.router.push('/checkout/cart');
    }
    render() {
        return (
            <li className="btn_cart">
                <button className="btn_brand1" onClick={this.redirect.bind(this)}>XEM GIỎ HÀNG</button>
            </li>
        );
    }
}

CartButton.contextTypes = {
    router: function() { return React.PropTypes.func.isRequired; }
};
