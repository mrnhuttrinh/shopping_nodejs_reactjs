import React, {Component} from 'react';
import formatCurrency from '../../../utils/formatcurrency';

export default class CartSum extends Component {
    render() {
        return (
            <li className="sum_cart"> Tổng cộng:<span>{formatCurrency(this.props.total)}đ</span> </li>
        );
    }
}
