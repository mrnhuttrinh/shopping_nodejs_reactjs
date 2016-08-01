import React, {Component} from 'react';
import BlockOne from './BlockOne';
import BlockTwo from './BlockTwo';
import BlockThree from './BlockThree';

export default class PaymentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addAddress: false
        };
    }
    addAddressForm(state) {
        this.setState({
            addAddress: state
        });
    }
    renderShowAddress() {
        var cartItems = this.props.cartItems;
        return (
            <div className="row payment_form">
                <BlockOne classCSS={"col-md-4 col-sm-12"} cartItems={cartItems}/>
                <BlockTwo addressForm={this.state.addAddress} addAddressForm={this.addAddressForm.bind(this)} classCSS={"col-md-4 col-sm-12"} {...this.props}/>
                <BlockThree classCSS={"col-md-4 col-sm-12"} />
            </div>
        );
    }
    renderShowAddAddress() {
        var cartItems = this.props.cartItems;
        return (
            <div className="row payment_form">
                <BlockOne classCSS={"col-md-4 col-sm-12"} cartItems={cartItems}/>
                <BlockTwo addressForm={this.state.addAddress} addAddressForm={this.addAddressForm.bind(this)} classCSS={"col-md-8 col-sm-12"} {...this.props}/>
            </div>
        );
    }
    render() {
        if (this.state.addAddress) {
            return this.renderShowAddAddress();
        } else {
            return this.renderShowAddress();
        }
    }
}