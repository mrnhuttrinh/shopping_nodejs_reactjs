import React, {Component} from 'react';
import BlockOne from './BlockOne';
import BlockTwo from './BlockTwo';
import BlockThree from './BlockThree';
import UserAPI from '../../../apis/user';
import _ from 'lodash';

export default class PaymentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addAddress: false,
            formType: "",
            listAddress: []
        };
    }
    addAddressForm(state, formType) {
        this.setState({
            addAddress: state,
            formType: formType,
            listAddress: this.state.listAddress
        });
    }
    updateListAddress(address, type) {
        var listAddress = this.state.listAddress;
        if (type === "create") {
            listAddress.push(address);
            this.setState({
                listAddress: listAddress
            });
        } else {
            var oldIndexAddress = _.findIndex(listAddress, _add => {
                return _add.id === address.id;
            });
            listAddress[oldIndexAddress] = address;
            this.setState({
                listAddress: listAddress
            });
        }
    }
    componentDidMount() {
        var user = this.props.user;
        var data = {
            user_id: user.id
        };
        UserAPI.getUserAddresses(data, (err, res) => {
            if (err) {} else {
                // this.state.listAddress = res.body.data;
                this.setState({
                    listAddress: res.body.data
                });
            }
        });
    }
    render() {
        var cartItems = this.props.cartItems;
        return (
            <div className="row payment_form">
                <BlockOne cartItems={cartItems}/>
                <BlockTwo 
                    updateListAddress={this.updateListAddress.bind(this)} 
                    ref="BlockTwo" 
                    listAddress={this.state.listAddress} 
                    formType={this.state.formType} 
                    addressForm={this.state.addAddress} 
                    addAddressForm={this.addAddressForm.bind(this)} 
                    {...this.props}/>
                <BlockThree />
            </div>
        )
    }
}