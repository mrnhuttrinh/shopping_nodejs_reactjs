import React, {Component} from 'react';

export default class PaymentForm extends Component {
    render() {
        return (
            <div className={this.props.classCSS}>
                <div className="parent_column_payment">
                    <p className="title_buy">
                        3. Chọn hình thức thanh toán
                    </p>
                </div>
            </div>
        )
    }
}