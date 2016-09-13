import React, {Component} from 'react';

export default class RightBottom extends Component {
    clickAddToCart(event) {
        event.preventDefault();
        this.props.addToCart();
    }
    render() {
        var product = this.props.product;
        return (
            <div className="panel_info">
                <div className="panel3 R">
                    <button className="btn_primary" data-id="1" onClick={this.clickAddToCart.bind(this)} type="button">
                        MUA NGAY
                        <span className="arrow_W_big">
                        </span>
                    </button>
                    <div id="wrapperSaveMoney" >
                    </div>
                </div>
                <p className="panel2 R">
                    <span className="pane2_icon_delivery">
                    </span>
                    <span className="panel_text">
                        Giao sản phẩm
                    </span>
                    <br/>
                    <span className="panel_text1">
                        toàn quốc
                    </span>
                </p>
                <p className="panel1 R">
                    <span className="panel_icon">
                    </span>
                    <span className="panel_text">
                        {product.rate}
                    </span>
                    <br/>
                    <span className="panel_text1">
                        người cùng mua
                    </span>
                </p>
            </div>
        );
    }
};