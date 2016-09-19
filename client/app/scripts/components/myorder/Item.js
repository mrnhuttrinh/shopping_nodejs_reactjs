import React, {Component} from 'react';
import formatCurrency from '../../utils/formatcurrency';
import localItem from '../../utils/localItem';
import _ from 'lodash';

export default class Item extends Component {
    render() {
        var item = this.props.item;
        var product = this.props.product;
        return (
            <tr>
                <td valign="left">
                    <a href={"/#/product/" + product.text_link}>
                        <img alt={product.name} height="64" src={"/admin/" + product.thumbnail} width="64"/>
                    </a>
                    <a className="deal_name" href={"/#/product/" + product.text_link}>
                        {product.name} - size: {item.name}
                    </a>
                    <p className="acc_note">
                        Giao sản phẩm toàn quốc
                    </p>
                </td>
                <td align="center">
                    <strong>
                        {formatCurrency(product.price_wholesale_promotion)}đ
                    </strong>
                </td>
                <td align="center">
                    <strong>
                        {item.quantity}
                    </strong>
                </td>
                <td align="center">
                    <span className="num_money">
                        <strong>
                            {formatCurrency(product.price_wholesale_promotion * item.quantity)}đ
                        </strong>
                    </span>
                </td>
            </tr>
        );
    }
}
