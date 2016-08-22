import React, {Component} from 'react';
import _ from 'lodash';
import {Link} from 'react-router';
import DivLoading from '../DivLoading';
import orderAPI from '../../apis/order';
import formatCurrency from '../../utils/formatCurrency';
import PrintPopup from '../../utils/PrintPopup';
import moment from 'moment';

export default class OrderDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            getOrder: true,
            order: {}
        };
    }
    getOrder() {
        var orderId = this.props.orderId;
        orderAPI.getOrderById({
            text_id: orderId
        }, (err, res) => {
            if (err) {} else {
                console.log(res.body.data)
                this.setState({
                    order: res.body.data
                });
            }
            this.setState({
                getOrder: false
            });
        });
    }
    componentDidMount() {
        this.getOrder();
    }
    renderCustomerInfo() {
        var order = this.state.order;
        var customer = order.customer[0];
        var contact = "";
        if (customer.type === "Facebook") {
            contact = "www.facebook.com/" + customer.id;
        } else if (customer.type === "Google") {
            contact = "www.google.com/" + customer.id;
        }
        return (
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th colSpan ="2">Thông Tin Khách Hàng</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th width="200">Tên Khách Hàng</th>
                        <th>{customer.fullname}</th>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <th>{customer.email}</th>
                    </tr>
                    <tr>
                        <th>Số Điện Thoai</th>
                        <th>{customer.phone}</th>
                    </tr>
                    <tr>
                        <th>Giới Tính</th>
                        <th>{customer.gender ? "Nam" : "Nữ"}</th>
                    </tr>
                    <tr>
                        <th>Liên Kết</th>
                        <th>{contact}</th>
                    </tr>
                </tbody>
            </table>
        );
    }
    renderRecievePerson() {
        var order = this.state.order;
        var address = order.address[0];
        return (
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th colSpan ="2">Thông Tin Người Nhận Hàng</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th width="200">Tên Người Nhận</th>
                        <th>{address.fullname}</th>
                    </tr>
                    <tr>
                        <th>Số Điện Thoại</th>
                        <th>{address.phone}</th>
                    </tr>
                    <tr>
                        <th>Địa Chỉ</th>
                        <th>
                            <p>
                                {address.homeno} Đường {address.street}, Phường {address.ward}, {address.district}, {address.province}
                            </p>
                        </th>
                    </tr>
                </tbody>
            </table>
        );
    }
    renderOrderGeneral() {
        var order = this.state.order;
        return (
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th colSpan ="2">Thông Tin Đơn Hàng</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th width="200">Tình Trạng</th>
                        <th>{order.completed ? "Hoàn Thành" : "Chưa Hoàn Thành"}</th>
                    </tr>
                    <tr>
                        <th>Tổng Tiền</th>
                        <th>{formatCurrency(order.total)}</th>
                    </tr>
                    <tr>
                        <th>Ngày Đặt Hàng</th>
                        <th>{moment(order.createdAt).format("MM/DD/YYYY")}</th>
                    </tr>
                </tbody>
            </table>
        );
    }
    renderOrderDetail() {
        var order = this.state.order;
        var orderDetail = order.orderDetail;
        var totalQuantity = 0;
        var listProduct = _.map(orderDetail, _od => {
            var product = _od.product;
            totalQuantity += _od.quantity;
            return (
                <tr>
                    <th>{product.name}</th>
                    <th>{product.code}</th>
                    <th>{_od.size}</th>
                    <th>{_od.quantity}</th>
                </tr>
            );
        });
        return (
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Tên Sản Phẩm</th>
                        <th>Mã Sản Phẩm</th>
                        <th>Size</th>
                        <th>Số Lượng</th>
                    </tr>
                </thead>
                <tbody>
                    {listProduct}
                    <tr>
                        <th colSpan="3">Tổng</th>
                        <th>{totalQuantity}</th>
                    </tr>
                </tbody>
            </table>
        );
    }
    printOrder(event) {
        event.preventDefault();
        var order = this.state.order;
        PrintPopup($("#print_area").html(), order.text_id);
    }
    render() {
        if (this.state.getOrder) {
            return (<DivLoading />);
        } else {
            var orderId = this.props.orderId;
            return (
                <div className="jarviswidget" id="wid-id-3" data-widget-editbutton="false" data-widget-custombutton="false">
                    <header>
                        <span className="widget-icon"> 
                            <i className="fa fa-edit"></i> 
                        </span>
                        <h2>Đơn Đặt Hàng - {orderId}</h2>
                    </header>
                    <div>
                        <div className="widget-body no-padding" id="print_area">
                            {this.renderCustomerInfo()}
                            {this.renderRecievePerson()}
                            {this.renderOrderGeneral()}
                            {this.renderOrderDetail()}
                        </div>
                    </div>
                    <a onClick={this.printOrder.bind(this)} className="pull-right btn btn-primary">Print</a>
                </div>
            );
        }
    }
}
