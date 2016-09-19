import React, {Component} from 'react';
import _ from 'lodash';
import EndItem from './EndItem';
import Item from './Item';
import TableTitle from './TableTitle';
import OrderAPI from '../../apis/order';
import Title from './Title';

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
    componentDidMount() {
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
    }
    render() {
        var props = this.props;
        var params = props.params;
        var id = params.id;
        if (!_.isEmpty(id) && !_.isNull(id)) {
            return (
                <div>
                    <div className="container">
                        <div id="cartPage">
                            <div className="container account_col">
                                <p className="title_inside2">
                                    Chi tiết hóa đơn 
                                </p>
                                <Title id={id} />
                                <table border="0" cellpadding="0" cellspacing="0" className="list_order_view">
                                    <tbody>
                                        <TableTitle />
                                        {this.renderListItem()}
                                        <EndItem total={this.total}/>
                                    </tbody>
                                </table>
                                <br className="clean" />
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            window.location = "/#/profile/myorders";
        }
    }
}
