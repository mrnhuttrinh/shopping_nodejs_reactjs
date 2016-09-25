import React, {Component} from 'react';
import formatCurrency from '../../../utils/formatcurrency';

export default class ItemCart extends Component {
    render() {
        var item = this.props.item;
        var product = this.props.product;
        return (
            <li>
                <a href={"/product/" + product.text_link}>
                    <img alt={product.name} src={"admin/" + product.thumbnail} className="img" height="57" width="57" />
                </a>
                <p className="title">
                    <a href={"/product/" + product.text_link}>
                        {product.name} - {item.name}
                    </a>
                </p>
                <span className="price">
                    {formatCurrency(product.price_wholesale_promotion)}đ x {item.quantity}
                </span>
                <div className="market_alert">
                    Sản phẩm giao bởi Áo Thun Phong Cách
                </div>
            </li>
        )
    }
}