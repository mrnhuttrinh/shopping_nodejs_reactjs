import React, {Component} from 'react';
import Filter from './Filter';
import ListOrder from './ListOrder';
import orderAPI from '../../apis/order';
import _ from 'lodash';
import OrderDetail from './OrderDetail';

export default class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order: null,
            filtering: false
        };
    }
    updateListOrders(orders) {
        this.props.updateListOrders(orders);
    }
    updateFilterState(value) {
        this.setState({
            filtering: value
        });
    }
    renderFilterAndResult() {
        return (
            <div>
                <Filter 
                    updateListOrders={this.updateListOrders.bind(this)} 
                    {...this.props} 
                    updateFilterState={this.updateFilterState.bind(this)}/>
                <ListOrder 
                    filtering={this.state.filtering} 
                    orders={this.props.listOrders}/>
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
        return (<OrderDetail orderId={id}/>);
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
