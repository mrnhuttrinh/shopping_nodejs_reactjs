import React, {Component} from 'react';
import BlockOne from './BlockOne';
import BlockTwo from './BlockTwo';
import BlockThree from './BlockThree';

export default class PaymentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addAddress: false,
            formType: ""
        };
    }
    addAddressForm(state, formType) {
        this.setState({
            addAddress: state,
            formType: formType
        });
    }
    render() {
        var cartItems = this.props.cartItems;
        return (
            <div className="row payment_form">
                <BlockOne cartItems={cartItems}/>
                <BlockTwo formType={this.state.formType} addressForm={this.state.addAddress} addAddressForm={this.addAddressForm.bind(this)} {...this.props}/>
                <BlockThree />
            </div>
        )
    }
}