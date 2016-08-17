import React, {Component} from 'react';
import Filter from './Filter';
import ListOrder from './ListOrder';
import orderAPI from '../../apis/order';
import _ from 'lodash';

export default class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order: null
        };
    }
    updateListOrders(orders) {
        this.props.updateListOrders(orders);
    }
    renderFilterAndResult() {
        return (
            <div>
                <Filter updateListOrders={this.updateListOrders.bind(this)} {...this.props}/>
                <ListOrder orders={this.props.listOrders}/>
            </div>
        )
    }
    componentDidUpdate() {
        var id = this.props.params.id;
        if (id) {
            if (this.state.order === null || this.state.order.text_id !== id) {
                this.state.order = {};
                var data = {
                    text_id: id
                };
                orderAPI.getOrderById(data, (err, res) => {
                    if (err) {} else {
                        this.setState({
                            order: res.body.data
                        });
                    }
                });
            }
        }
    }
    renderOrderById() {
        var id = this.props.params.id;
        return (
            <div className="jarviswidget" id="wid-id-3" data-widget-editbutton="false" data-widget-custombutton="false">
                <header>
                    <span className="widget-icon"> 
                        <i className="fa fa-edit"></i> 
                    </span>
                    <h2>Đơn Đặt Hàng - {id}</h2>
                </header>
            </div>
        );
    }
    render() {
        var id = this.props.params.id;
        if (id) {
            return this.renderOrderById();
        } else {
            return this.renderFilterAndResult();
        }
    }
}
