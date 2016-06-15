import React, {Component} from 'react';

export default class RightBottom extends Component {
    render() {
        return (
            <div className="panel_info">
                <div className="panel3 R">
                    <button className="btn_primary" data-id="1" onclick="productdetail.addToCart(this);" type="button">
                        MUA NGAY
                        <span className="arrow_W_big">
                        </span>
                    </button>
                    <div id="wrapperSaveMoney" >
                    </div>
                    <p className="txt_cmart" id="containerSaveMoney" >
                        Bạn tích lũy được
                        <strong id="saveMoneyForPremium">
                            0đ
                        </strong>
                        khi mua sản phẩm này.
                    </p>
                    <p className="txt_cmart" id="containerDisplaySaveMoney" >
                        Bạn sẽ được tích lũy
                        <strong>
                            2%
                        </strong>
                        khi là hội viên Premium
                    </p>
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
                        202
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