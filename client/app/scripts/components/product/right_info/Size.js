import React, {Component} from 'react';
import formatCurrency from '../../../utils/formatcurrency';

export default class Size extends Component {
    clickIncreaseSize(event) {
        event.preventDefault();
        var value = parseInt(event.target.value);
        if (value < 0 || isNaN(value)) {
            event.target.value = 0;
            return;
        }
        var props = this.props;
        var result = props.increaseSize(props.size, value);
        if (!result) {
            event.target.value = props.size.quantity_temp;
        }
    }
    render() {
        var product = this.props.product;
        var size = this.props.size;
        return (
            <tr className={this.props.classCSS}>
                <td className="left_col" data-abc="" width="78">
                    <a href="javascript:;">
                        <img alt="" height="45" src={window.pathAdmin + product.thumbnail} width="45">
                        </img>
                    </a>
                </td>
                <td className="name_book" width="221">
                    <a href="javascript:;">
                        Size: <strong>{size.name}</strong>
                    </a>
                    <br />
                    <abbr style={{color: "gray"}} title="attribute">Số Lượng Còn Trong Kho: <strong>{size.quantity_temp}</strong></abbr>
                </td>
                <td className="bg_price" width="126">
                    <span className="book_true_price">
                        {formatCurrency(product.price_wholesale)}đ
                    </span>
                    <br/>
                    <span className="book_price">
                        {formatCurrency(product.price_wholesale_promotion)}đ
                    </span>
                </td>
                <td className="bg_price" width="75">
                    <input style={{color: "black"}} onChange={this.clickIncreaseSize.bind(this)} min="0" defaultValue="0" type="number" className="select_number"/>
                </td>
            </tr>
        );
    }
}
