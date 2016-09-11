import React, {Component} from 'react';
import Filter from './Filter';
import ListOrder from './ListOrder';
import orderAPI from '../../apis/order';
import _ from 'lodash';
import OrderDetail from './OrderDetail';
import CreateOrder from './CreateOrder';

export default class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order: null,
            filtering: false,
            createOrder: false
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
    createOrderFrom(value) {
        this.setState({
            createOrder: value
        });
    }
    renderFilterAndResult() {
        return (
            <div>
                <Filter 
                    createOrderFrom={this.createOrderFrom.bind(this)}
                    updateListOrders={this.updateListOrders.bind(this)} 
                    {...this.props} 
                    updateFilterState={this.updateFilterState.bind(this)}/>
                <ListOrder 
                    filtering={this.state.filtering} 
                    orders={this.props.listOrders}/>
            </div>
        )
    }
    // componentDidMount() {
    //     if (this.state.filtering) {
    //         this.setState({
    //             filtering: true
    //         });
    //     }
    // }
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
    renderCreateOrderForm() {
        return (<CreateOrder {...this.props} createOrderFrom={this.createOrderFrom.bind(this)}/>);
    }
    render() {
        if (this.state.createOrder) {
            return this.renderCreateOrderForm();
        } else {
            var id = this.props.params.id;
            if (id) {
                return this.renderOrderById();
            } else {
                return this.renderFilterAndResult();
            }
        }
    }
}
