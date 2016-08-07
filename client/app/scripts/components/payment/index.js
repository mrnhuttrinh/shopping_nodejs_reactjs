import React, {Component} from 'react';
import Title from './Title';
import PaymentForm from './payment_form';
import SumPayment from './SumPayment';

export default class Payment extends Component {
    componentWillMount() {
        var cartItems = this.props.cartItems;
        var user = this.props.user;
        if (cartItems && user) {
        } else {
            window.location = "/#/login";
        }
    }
    render() {
        var cartItems = this.props.cartItems;
        return (
            <div className="container payment">
                <Title />
                <PaymentForm cartItems={cartItems} {...this.props}/>
                <SumPayment {...this.props}/>
            </div>
        )
    }
}
