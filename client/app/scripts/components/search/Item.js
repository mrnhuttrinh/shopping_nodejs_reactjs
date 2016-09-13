import React, {Component} from 'react';
import {Link} from 'react-router';
import formatCurrency from '../../utils/formatcurrency';

export default class Item extends Component {
    render() {
        var product = this.props.product;
        var postFixProduct = product.text_link || product.id;
        var percentSale = 0;
        if (product.price_wholesale !== product.price_wholesale_promotion) {
            percentSale = 100 - Math.ceil((product.price_wholesale_promotion/product.price_wholesale)*100);
        }
        return (
            <li>
                <div className="img">
                    <Link to={"/product/" + postFixProduct}>
                        <img alt={product.name} className="deal" height="318" src={product.thumbnail} width="318">
                        </img>
                    </Link>
                    <div className="listdeal_hover_B">
                        <Link className="btn_view"to={"/product/" + postFixProduct}>
                            XEM NGAY
                        </Link>
                    </div>
                </div>
                <div className="listdeal_info">
                    <Link className="list_name" to={"/product/" + postFixProduct}>
                        {product.name}
                    </Link>
                    <div className="listdeal_group">
                        <p className="listdeal_info_L num_down">
                            {percentSale}
                            <span className="percent">
                                %
                            </span>
                        </p>
                        <p className="listdeal_info_Ce">
                            <span className="trueprice">
                                {formatCurrency(product.price_wholesale)}đ
                            </span>
                            <br />
                            <span className="price">
                                {formatCurrency(product.price_wholesale_promotion)}đ
                            </span>
                        </p>
                    </div>
                </div>
            </li>
        );
    }
}

