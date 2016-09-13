import React, {Component} from 'react';
import formatCurrency from '../../../utils/formatcurrency';
import Facebook from './Facebook';
import ListSelect from './ListSelect';

export default class RightTop extends Component {
    render() {
        var product = this.props.product;
        var percentSale = 0;
        if (product.price_wholesale !== product.price_wholesale_promotion) {
            percentSale = 100 - Math.ceil((product.price_wholesale_promotion/product.price_wholesale)*100);
        }
        return (
            <div className="detail_co">
                <h1 className="deal_detail_name">
                    {product.name}
                </h1>
                <p className="market_note">Sản phẩm giao bởi Áo Thun Phong Cách</p>
                <h2 className="deal_detail_name_long">
                    {product.description}
                </h2>
                <div className="detail_bar">
                    <p className="bg_price">
                        <span className="detail_trueprice" id="detail_trueprice">
                            {formatCurrency(product.price_wholesale)}đ
                        </span>
                        <br/>
                        <span className="detail_price" id="price">
                            {formatCurrency(product.price_wholesale_promotion)}đ
                        </span>
                    </p>
                    <p className="detail_precent">
                        {percentSale}
                        <span>
                            %
                        </span>
                    </p>
                    <div className="likeface">
                        Mã SP: {product.code}
                        <br/>
                        <Facebook />
                    </div>
                    <br className="clean"/>
                </div>
                <span className="text_note">
                    Chọn số lượng
                </span>
                <ListSelect increaseSize={this.props.increaseSize}
                    product={product}/>
            </div>
        );
    }
};