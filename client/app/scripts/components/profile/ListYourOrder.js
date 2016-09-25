import React, {Component} from 'react';
import _ from 'lodash';
import moment from 'moment';
import formatCurrency from '../../utils/formatcurrency';
import {Link} from 'react-router';

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
        var orders = this.props.listOrder;
        if (orders.length) {
            var orderContent = _.map(orders, (order, index) => {
                var statusContent = "";
                if (order.status) {
                    if (order.completed) {
                        statusContent = (<span className="label label-success">Hoàn Thành</span>);
                    } else {
                        statusContent = (<span className="label label-warning">Chưa Hoàn Thành</span>) ;
                    }
                } else {
                    statusContent = (<span className="label label-danger">Hủy Đơn Hàng</span>);
                }
                return (
                    <tr key={"order_" + index}>
                        <td>{index + 1}</td>
                        <td><Link to={"/myorder/" + order.text_id}>{order.text_id}</Link></td>
                        <td>{formatCurrency(order.total)}đ</td>
                        <td>{statusContent}</td>
                        <td>{moment(order.createdAt).format("DD/MM/YYYY")}</td>
                    </tr>
                );
            });
            return (
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Mã Đặt Hàng</th>
                            <th>Tổng Tiền</th>
                            <th>Trạng Thái</th>
                            <th>Ngày Đặt Hàng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderContent}
                    </tbody>
                </table>
            );
        } else {
            return (
                <div className="row">
                    <article className="col-sm-12">
                        <div className="alert alert-warning fade in">
                            <i className="fa-fw fa fa-warning"></i>
                            <strong>Không</strong> có hóa đơn nào.
                        </div>
                    </article>
                </div>
            );
        }
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
