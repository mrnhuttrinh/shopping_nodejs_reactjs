import React, {Component} from 'react';
import ChooseAddress from './ChooseAddress';
import AddAddress from './AddAddress';

export default class BlockTwo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chooseAddress: 0
        };
    }
    updateChooseAddress(index) {
        this.setState({
            chooseAddress: index
        });
    }
    renderAddAddress() {
        return (
            <div className="col-md-4 col-sm-12">
                <div className="parent_column_payment">
                    <p className="title_buy">
                        2. Địa chỉ nhận hàng
                    </p>
                    <div className="delivery">
                        <AddAddress updateListAddress={this.props.updateListAddress} chooseAddress={this.state.chooseAddress} formType={this.props.formType} {...this.props}/>
                    </div>
                </div>
            </div>
        );
    }
    renderChooseAddres() {
        return (<ChooseAddress />);
    }
    showAddress() {
        var listAddress = this.props.listAddress;
        if (listAddress && listAddress.length) {
            var user = listAddress[this.state.chooseAddress];
            return (
                <div>
                    <p className="delivery_name">
                        {user.fullname}
                    </p>
                    <p>
                        {user.phone}, {user.homeno} Đường {user.street}, Phường {user.ward}, {user.district}, {user.province}
                    </p>
                </div>
            );
        } else {
            return (
                <div>
                    <p>Chưa có địa chỉ nào</p>
                    <p>
                        <a onClick={this.createNewAddress.bind(this)} className="chose_ad">Tạo địa chỉ mới</a>
                    </p>
                </div>
            );
        }
    }
    createNewAddress(event) {
        event.preventDefault();
        this.props.addAddressForm(true, "create");
    }
    renderShowAddress() {
        return (
            <div className="col-md-4 col-sm-12">
                <div className="parent_column_payment">
                    <p className="title_buy">
                        2. Địa chỉ nhận hàng
                    </p>
                    <div className="delivery">
                        <div className="info_delivery">
                            <div>
                                {this.showAddress()}
                                <ChooseAddress updateChooseAddress={this.updateChooseAddress.bind(this)} chooseAddress={this.state.chooseAddress} listAddress={this.props.listAddress} {...this.props}/>
                            </div>
                            <div className="clearfix">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    render() {
        if (this.props.addressForm) {
            return this.renderAddAddress();
        } else {
            return this.renderShowAddress();
        }
    }
}