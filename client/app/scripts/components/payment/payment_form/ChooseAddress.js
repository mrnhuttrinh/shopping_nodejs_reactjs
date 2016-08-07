import React, {Component} from 'react';
import _ from 'lodash';

export default class ChooseAddress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chooseAddress: false
        };
    }
    chooseAddressOther(event) {
        event.preventDefault();
        this.setState({
            chooseAddress: !this.state.chooseAddress
        });
    }
    changeAddress(event) {
        event.preventDefault();
        this.props.addAddressForm(true, "update");
    }
    createNewAddress(event) {
        event.preventDefault();
        this.props.addAddressForm(true, "create");
    }
    changeSelectAddress(event) {
        event.preventDefault();
        var index = parseInt(this.refs["CustomerAddress"].value);
        this.props.updateChooseAddress(index);
        this.setState({
            chooseAddress: !this.state.chooseAddress
        });
    }
    renderSelectAddress() {
        var listAddress = this.props.listAddress;
        var chooseAddress = this.props.chooseAddress;
        var options = _.map(listAddress, (address, index) => {
            if (index === chooseAddress) {
                return (<option selected value={index} key={address.id}>{address.homeno} Đường {address.street}, {address.ward}, {address.district}, {address.province}</option>);
            } else {
                return (<option value={index} key={address.id}>{address.homeno} Đường {address.street}, {address.ward}, {address.district}, {address.province}</option>);
            }
        });
        return (
            <p>
                <select onChange={this.changeSelectAddress.bind(this)} autocomplete="off" ref="CustomerAddress" name="CustomerAddress">
                    {options}
                </select>
            </p>
        );
    }
    render() {
        var listAddress = this.props.listAddress;
        var control = null;
        if (listAddress && listAddress.length) {
            control = (
                <p>
                    <a className="other_add" onClick={this.chooseAddressOther.bind(this)}>Chọn địa chỉ khác</a>
                    <a className="change" onClick={this.changeAddress.bind(this)}>Thay đổi</a>
                </p>
            );
        }
        return (
            <div className="chose_add">
                {control}
                {
                    this.state.chooseAddress ? this.renderSelectAddress() : null
                }
                {
                    this.state.chooseAddress ? (
                        <p>
                            <a onClick={this.createNewAddress.bind(this)} className="chose_ad">Tạo địa chỉ mới</a>
                        </p>
                    ) : null
                }
            </div>
        )
    }
}