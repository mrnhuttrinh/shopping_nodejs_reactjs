import React, {Component} from 'react';
import formatCurrency from '../../utils/formatcurrency';

export default class EndItem extends Component {
    render() {
        return (
            <tr className="end">
                <td align="center" colSpan="2">
                </td>
                <td align="center" className="money_cate" colSpan="2">
                    <div className="row_cate">
                        <p className="row_L">
                            Tổng cộng:
                        </p>
                        <p className="row_R">
                            {formatCurrency(this.props.total)}đ
                        </p>
                    </div>
                </td>
            </tr>
        );
    }
}
