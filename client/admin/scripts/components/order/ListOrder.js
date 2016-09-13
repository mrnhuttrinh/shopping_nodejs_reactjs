import React, {Component} from 'react';
import _ from 'lodash';
import {Link} from 'react-router';
import DivLoading from '../DivLoading';
import formatCurrency from '../../utils/formatCurrency';

export default class ListOrder extends Component {
    renderListOrder() {
        var orders = this.props.orders;
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
                        <td><Link to={"/order/" + order.text_id}>{order.text_id}</Link></td>
                        <td>{order.fullname}</td>
                        <td>{formatCurrency(order.total)}đ</td>
                        <td>{statusContent}</td>
                    </tr>
                );
            });
            return (
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Mã Đặt Hàng</th>
                            <th>Tên Khách Hàng</th>
                            <th>Tổng Tiền</th>
                            <th>Trạng Thái</th>
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
        return (
            <div className="jarviswidget" id="wid-id-4" data-widget-editbutton="false" data-widget-custombutton="false">
                <header>
                    <span className="widget-icon"> 
                        <i className="fa fa-edit"></i> 
                    </span>
                    <h2>Danh Sách Đơn Đặc Hàng</h2>
                </header>
                <div>
                    <div className="widget-body no-padding">
                        {this.props.filtering ? (<DivLoading />) : this.renderListOrder()}
                    </div>
                </div>
            </div>
        );
    }
}
