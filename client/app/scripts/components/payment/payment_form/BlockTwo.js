import React, {Component} from 'react';
import ChooseAddress from './ChooseAddress';
import AddAddress from './AddAddress';

export default class BlockTwo extends Component {
    renderAddAddress() {
        return (
            <div className="col-md-4 col-sm-12">
                <div className="parent_column_payment">
                    <p className="title_buy">
                        2. Địa chỉ nhận hàng
                    </p>
                    <AddAddress />
                </div>
            </div>
        );
    }
    renderChooseAddres() {
        return (<ChooseAddress />);
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
                                <p className="delivery_name">
                                    Nguyễn Nhựt Trình
                                </p>
                                <p>
                                    01656033621, 8/4 Đường 21, Khác, Quận Thủ Đức, TP Hồ Chí Minh
                                </p>
                                <ChooseAddress />
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
        return this.renderShowAddress();
    }
}