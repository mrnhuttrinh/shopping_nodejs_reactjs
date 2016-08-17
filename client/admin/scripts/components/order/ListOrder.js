import React, {Component} from 'react';
import _ from 'lodash';
import {Link} from 'react-router';

export default class ListOrder extends Component {
    renderListOrder() {
        var orders = this.props.orders;
        if (orders.length) {
            var orderContent = _.map(orders, (order, index) => {
                return (
                    <tr key={"order_" + index}>
                        <td>{index + 1}</td>
                        <td><Link to={"/order/" + order.text_id}>{order.text_id}</Link></td>
                        <td>{order.fullname}</td>
                        <td>{order.total}</td>
                    </tr>
                );
            });
            return (
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th></th>
                            <th></th>
                            <th>Tên Khách Hàng</th>
                            <th>Tổng Tiền</th>
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
                        {this.renderListOrder()}
                    </div>
                </div>
            </div>
        );
    }
}
