import React, {Component} from 'react';
import BlockOne from './BlockOne';
import BlockTwo from './BlockTwo';
import BlockThree from './BlockThree';

export default class PaymentForm extends Component {
    render() {
        var cartItems = this.props.cartItems;
        return (
            <div className="row payment_form">
                <BlockOne cartItems={cartItems}/>
                <BlockTwo {...this.props}/>
                <BlockThree />
            </div>
        )
    }
}