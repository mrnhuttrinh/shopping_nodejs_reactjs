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
            <table key="table_info" className="table table-bordered">
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
            <table key="table_person" className="table table-bordered">
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
            <table key="table_general" className="table table-bordered">
                <thead>
                    <tr>
                        <th colSpan ="2">Thông Tin Đơn Hàng</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th width="200">Tình Trạng</th>
                        <th>{statusContent}</th>
                    </tr>
                    <tr>
                        <th>Tổng Tiền</th>
                        <th>{formatCurrency(order.total)}đ</th>
                    </tr>
                    <tr>
                        <th>Ngày Đặt Hàng</th>
                        <th>{moment(order.createdAt).format("DD/MM/YYYY")}</th>
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
            // return (
            //     <tr key={"order_product_" + _od.product.id}>
            //         <th><Link to={"/product/" + _od.product.id}>{product.name}</Link></th>
            //         <th>{product.code}</th>
            //         <th>{_od.size}</th>
            //         <th>{formatCurrency(_od.price)}</th>
            //         <th>{_od.quantity}</th>
            //     </tr>
            // );
            return (
                <tr key={"order_product_" + _od.id}>
                    <td><Link to={"/product/" + _od.product.id}>{product.name}</Link></td>
                    <td>{product.code}</td>
                    <td>{_od.size_name}</td>
                    <td>{formatCurrency(_od.price)}</td>
                    <td>{_od.quantity}</td>
                </tr>
            );
        });
        return (
            <table key="table_detail" className="table table-bordered">
                <thead>
                    <tr>
                        <th>Tên Sản Phẩm</th>
                        <th>Mã Sản Phẩm</th>
                        <th>Size</th>
                        <th>Đơn Giá</th>
                        <th>Số Lượng</th>
                    </tr>
                </thead>
                <tbody>
                    {listProduct}
                    <tr>
                        <th colSpan="4">Tổng</th>
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
    markSuccess(event) {
        event.preventDefault();
        var data = {
            order_id: this.props.orderId
        };
        orderAPI.markCompletedOrder(data, (err, res) => {
            if (err) {
                toastr.error("Cập Nhật Không Thành Công");
            } else {
                toastr.success("Cập Nhật Thành Công");
                var order = this.state.order;
                order.completed = true;
                this.setState({
                    order: order
                });
            }
        });
    }
    cancelOrder(event) {
        event.preventDefault();
        var data = {
            order_id: this.props.orderId
        };
        orderAPI.cancelOrder(data, (err, res) => {
            if (err) {
                toastr.error("Hủy Đơn Hàng Lỗi!");
            } else {
                toastr.success("Hủy Đơn Hàng Thành Công");
                this.state.order.status = false;
                this.setState({
                    order: this.state.order
                });
            }
        });
    }
    render() {
        if (this.state.getOrder) {
            return (<DivLoading />);
        } else {
            var orderId = this.props.orderId;

            var order = this.state.order;

            var cancelOrder = false;
            if (!order.completed && order.status) cancelOrder = true;

            return (
                <div className="jarviswidget" id="wid-id-3" data-widget-editbutton="false" data-widget-custombutton="false">
                    <header>
                        <span className="widget-icon"> 
                            <i className="fa fa-edit"></i> 
                        </span>
                        <h2>Đơn Đặt Hàng - {orderId}</h2>
                        {
                            (cancelOrder)?(<a onClick={this.cancelOrder.bind(this)} className="pull-right btn btn-danger btn-sm">Hủy Đơn Đặt Hàng</a>) : null
                        }
                    </header>
                    <div>
                        <div className="widget-body no-padding" id="print_area">
                            {this.renderCustomerInfo()}
                            {this.renderRecievePerson()}
                            {this.renderOrderGeneral()}
                            {this.renderOrderDetail()}
                        </div>
                    </div>
                    {
                        order.status ? (
                            order.completed ? null : (<a onClick={this.markSuccess.bind(this)} className="pull-left btn btn-success">Đánh Dấu Hoàn Thành</a>)
                        ) : null
                    }
                    <a onClick={this.printOrder.bind(this)} className="pull-right btn btn-primary">Print</a>
                </div>
            );
        }
    }
}
