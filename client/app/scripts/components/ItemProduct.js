import React, {Component} from 'react';
import productAPI from '../apis/product';
import {Link} from 'react-router';
import _ from 'lodash';
import formatCurrency from '../utils/formatcurrency';

export default class ItemProduct extends Component {
    render() {
        var product = this.props.product;
        var percentSale = 0;
        if (product.price_wholesale !== product.price_wholesale_promotion) {
            percentSale = 100 - Math.ceil((product.price_wholesale_promotion/product.price_wholesale)*100);
        }
        return (
            <li>
                <div className="img">
                    <div className='mask'></div>
                    <Link to={'/product/' + product.text_link}>
                        <img alt={product.alt} className="deal" height="235" src={"/admin/" + product.thumbnail} width="235">
                        </img>
                    </Link>
                    <span className="lbl_place">
                        Nha Trang
                    </span>
                    <div className="listdeal_hover_B">
                        <span className="text_alert">

                        </span>
                        <Link className="btn_view" to={'/product/' + product.text_link}>
                            XEM NGAY
                        </Link>
                    </div>
                    <div className="listdeal_evoucher">
                        <span className="ic_cm icon-voucher">
                            I
                        </span>
                        {product.code}
                    </div>
                </div>
                <div className="listdeal_info">
                    <Link className="list_name" to={'/product/' + product.text_link}>
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
                        <div className="listdeal_info_R">
                            <p className="num_people">
                                <span className="ic_cm icon-num-people">
                                    f
                                </span>
                                <span className="text_num_people">
                                    {product.rate}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </li>
        );
    }
}