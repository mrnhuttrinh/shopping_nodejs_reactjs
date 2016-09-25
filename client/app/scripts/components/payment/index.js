import React, {Component} from 'react';
import Title from './Title';
import PaymentForm from './payment_form';
import SumPayment from './SumPayment';
import orderAPI from '../../apis/order';
import _ from 'lodash';

export default class Payment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitLoading: false
        };
    }
    componentWillMount() {
        var cartItems = this.props.cartItems;
        var user = this.props.user;
        if (cartItems && user) {
            var cartItems = this.props.cartItems;
            var products = [];
            _.forEach(cartItems, cart => {
                _.forEach(cart.items, item => {
                    var product = cart.product;
                    products.push({
                        id: product.id,
                        price_wholesale: product.price_wholesale,
                        price_wholesale_promotion: product.price_wholesale_promotion,
                        quantity: item.quantity,
                        size: item.id
                    });
                });
            });
            if (products.length) {} else {
                window.location = "/";
            }
        } else {
            window.location = "/login";
        }
    }
    createNewOrder() {
        var data = {};

        var user = this.props.user;
        data.customer_id = user.id;
        var paymentForm = this.refs["PaymentForm"]
        var listAddress = paymentForm.state.listAddress;
        var blockTwo = paymentForm.refs["BlockTwo"];
        var chooseAddress = blockTwo.state.chooseAddress;
        data.address_id = listAddress[chooseAddress].id;
        var cartItems = this.props.cartItems;
        var products = [];
        _.forEach(cartItems, cart => {
            _.forEach(cart.items, item => {
                var product = cart.product;
                products.push({
                    id: product.id,
                    price_wholesale: product.price_wholesale,
                    price_wholesale_promotion: product.price_wholesale_promotion,
                    quantity: item.quantity,
                    size: item.id
                });
            });
        });
        if (products.length) {
            data.products = products;
            data.note = this.refs["SumPayment"].refs["orderNote"].value;
            this.setState({
                submitLoading: true
            });
            orderAPI.createNewOrder(data, (err, res) => {
                if (err) {
                    // TODO
                } else {
                    this.props.updateCartItems({});
                    window.location = "/myorder/" + res.body.data.text_id;
                }
                this.setState({
                    submitLoading: false
                });
            });
        } else {
            window.location = "/";
        }
    }
    render() {
        var cartItems = this.props.cartItems;
        return (
            <div className="container payment">
                <Title />
                <PaymentForm 
                    ref="PaymentForm" cartItems={cartItems} 
                    {...this.props}/>
                <SumPayment submitLoading={this.state.submitLoading} createNewOrder={this.createNewOrder.bind(this)} ref="SumPayment" {...this.props}/>
            </div>
        )
    }
}
