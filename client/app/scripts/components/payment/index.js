import React, {Component} from 'react';
import Title from './Title';
import PaymentForm from './payment_form';
import SumPayment from './SumPayment';

export default class Payment extends Component {
    redirectLoginPage() {
        var cartItems = this.props.cartItems;
        var user = this.props.user;
        if (cartItems && user) {
        } else {
            window.location = "/#/login";
        }
    }
    componentWillMount() {
        this.redirectLoginPage();
    }
    componentDidUpdate() {
        this.redirectLoginPage();
    }
    render() {
        var cartItems = this.props.cartItems;
        return (
            <div className="container payment">
                <Title />
                <PaymentForm cartItems={cartItems} {...this.props}/>
                <SumPayment />
            </div>
        )
    }
}
