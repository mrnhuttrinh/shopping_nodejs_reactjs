import React, {Component} from 'react';

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
    render() {
        return (
            <div className="chose_add">
                <p>
                    <a className="other_add" onClick={this.chooseAddressOther.bind(this)}>Chọn địa chỉ khác</a>
                    <a className="change" onClick={this.changeAddress.bind(this)}>Thay đổi</a>
                </p>
                {
                    this.state.chooseAddress ? (
                        <p>
                            <select autocomplete="off" name="CustomerAddress">
                                <option selected="selected" value="2013704">8/4 Đường 21, Khác, Quận Thủ Đức, TP Hồ Chí Minh</option>
                            </select>
                        </p>
                    ) : null
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