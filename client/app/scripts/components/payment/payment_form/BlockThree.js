import React, {Component} from 'react';

export default class PaymentForm extends Component {
    render() {
        return (
            <div className="col-xl-4 col-md-4 col-sm-12">
                <p className="title_buy col-xl-12 col-md-12 col-sm-12">
                    3. Chọn hình thức thanh toán
                </p>
                <div id="wrapperPaymentMethod">
                    <div className="payment_choose">
                        <ul className="choose_item border_left_e8e8e8">
                            <li>
                                <label>
                                    <span className="ic_cm icon-money">B</span>
                                    <span>
                                        {" "}Bằng tiền mặt khi nhận hàng
                                    </span>
                                </label>
                                <p className="note">
                                    Nhân viên sẽ thu tiền khi giao hàng
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}