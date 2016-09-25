import React, {Component} from 'react';
import _ from 'lodash';
import EndItem from './EndItem';
import Item from './Item';
import TableTitle from './TableTitle';
import OrderAPI from '../../apis/order';
import Title from './Title';
import LeftControl from '../LeftControl';

export default class MyOrder extends Component {
    constructor(props) {
        super(props);
        this.total = 0;
        this.state = {
            order: null 
        };
    }
    renderListItem() {
        var order = this.state.order;
        if (order) {
            var orderDetail = order.orderDetail;
            this.total = order.total;
            var totalQuantity = 0;
            return _.map(orderDetail, detail => {
                return (<Item key={"item_" + detail.id} item={detail} {...this.props} product={detail.product}/>);
            });
        } else {
            return null;
        }
    }
    getOrder(id) {
        if (!_.isEmpty(id) && !_.isNull(id)) {
            var props = this.props;
            var params = props.params;
            var id = params.id;
            var data = {
                text_id: id
            };
            OrderAPI.getMyOrderById(data, (err, res) => {
                if (err) {

                } else {
                    this.setState({
                        order: res.body.data
                    });
                }
            });
        } else {
            window.location = "/#/profile/myorders";
        }
    }
    componentWillReceiveProps(nextProps) {
        var params = nextProps.params;
        var id = params.id;
        this.getOrder(id);
    }
    componentDidMount() {
        var props = this.props;
        var params = props.params;
        var id = params.id;
        this.getOrder(id);
    }
    renderRecievePerson() {
        var order = this.state.order;
        if (order) {
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
        } else {
            return null;
        }
    }
    render() {
        var props = this.props;
        var params = props.params;
        var id = params.id;
        if (!_.isEmpty(id) && !_.isNull(id)) {
            var status = false;
            if (this.state.order) {
                status = this.state.order.completed;
            }
            return (
                <div className="index_middle">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-9 col-md-10">
                                <div className="container account_col">
                                    <p className="title_inside2">
                                        Chi tiết hóa đơn 
                                    </p>
                                    <Title id={id} status={status} />
                                    <table border="0" cellpadding="0" cellspacing="0" className="list_order_view">
                                        <tbody>
                                            <TableTitle />
                                            {this.renderListItem()}
                                            <EndItem total={this.total}/>
                                        </tbody>
                                    </table>
                                    <p className="title_inside2">
                                        Thông Tin Người Nhận
                                    </p>
                                    {this.renderRecievePerson()}
                                    <br className="clean" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }
}
