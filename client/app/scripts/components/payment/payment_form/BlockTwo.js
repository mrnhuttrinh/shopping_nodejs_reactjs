import React, {Component} from 'react';
import ChooseAddress from './ChooseAddress';
import AddAddress from './AddAddress';

export default class BlockTwo extends Component {
    renderAddAddress() {
        return (
            <div className={this.props.classCSS} id="block_two_payment_add_address">
                <div className="parent_column_payment">
                    <p className="title_buy">
                        2. Địa chỉ nhận hàng
                    </p>
                    <AddAddress {...this.props}/>
                </div>
            </div>
        );
    }
    renderChooseAddress() {
        return (<ChooseAddress />);
    }
    renderShowAddress() {
        return (
            <div className={this.props.classCSS} id="block_two_payment">
                <div className="parent_column_payment">
                    <p className="title_buy">
                        2. Địa chỉ nhận hàng
                    </p>
                    <div className="delivery">
                        <div className="info_delivery">
                            <div>
                                <p className="delivery_name">
                                    Nguyễn Nhựt Trình
                                </p>
                                <p>
                                    01656033621, 8/4 Đường 21, Khác, Quận Thủ Đức, TP Hồ Chí Minh
                                </p>
                                <ChooseAddress {...this.props}/>
                            </div>
                            <div className="clearfix">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    setHeightBlockTwo() {
        var getHeightBlockOne = $("#block_one_payment").height();
        var pHeight = $("p.title_buy").height();

        if (this.props.addressForm) {
            var getHeightBlockTwoAddAddress = $("#form_add_address").height();
            if (getHeightBlockOne > (getHeightBlockTwoAddAddress + pHeight)) {
                $("#block_two_payment_add_address").height(getHeightBlockOne);
                $(".row.payment_form").height(getHeightBlockOne);
            } else {

                $("#block_two_payment_add_address").height(getHeightBlockTwoAddAddress + pHeight);
                $(".row.payment_form").height(getHeightBlockTwoAddAddress + pHeight + pHeight);
            }
        } else {
            var getHeightBlockTwo = $("#info_delivery").height();
            if (getHeightBlockOne > (getHeightBlockTwo + pHeight) ) {
                $("#block_two_payment").height(getHeightBlockOne );
                $(".row.payment_form").height(getHeightBlockOne);
            } else {
                $(".row.payment_form").height(getHeightBlockTwo);
            }
        }
    }
    componentDidMount() {
        this.setHeightBlockTwo();
    }
    componentDidUpdate() {
        this.setHeightBlockTwo();
    }
    render() {
        if (this.props.addressForm) {
            return this.renderAddAddress();
        } else {
            return this.renderShowAddress();
        }
    }
}