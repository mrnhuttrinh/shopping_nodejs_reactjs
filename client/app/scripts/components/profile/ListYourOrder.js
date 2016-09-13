import React, {Component} from 'react';
import _ from 'lodash';
import moment from 'moment';
import formatCurrency from '../../utils/formatcurrency';

export default class ListYourOrder extends Component {
    renderEmpty() {
        return (
            <tr>
                <td>
                    Bạn Chưa Có Đơn Hàng Nào!
                </td>
            </tr>
        );
    }
    renderListOrder() {
        var listOrder = this.props.listOrder;
        return _.map(listOrder, (order, index) => {
            return (
                <tr key={"order_" + index}>
                    <td>
                        {order.text_id} - {moment(order.createdAt).format("DD MMM YYYY")} - Tổng Tiền: {formatCurrency(order.total)}đ - Trạng Thái: {order.completed ? "Hoàn Thành" : "Chưa Hoàn Thành"}
                    </td>
                </tr>
            );
        });
    }
    render() {
        var content = null;
        if (this.props.listOrder.length) {
            content = this.renderListOrder();
        } else {
            content = this.renderEmpty();
        }
        return (
            <tr>
                <td className="padding-0px">
                    <table className="table table-hover margin-0px">
                        <tbody>
                            {content}
                        </tbody>
                    </table>
                </td> 
            </tr> 
        );
    }
}
