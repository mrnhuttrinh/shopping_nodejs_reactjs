import React, {Component} from 'react';

export default class SumPayment extends Component {
    render() {
        return (
            <div className="row payment_sum">
                <div className="col-md-4 col-sm-12">
                    <p className="buy_note">
                        Ghi chú cho đơn hàng
                        <br />
                        <textarea className="GINGER_SOFTWARE_control no_resize" ginger_software_editor="true" id="orderNote" placeholder="Nhập vào đây các ghi chú cho đơn hàng này, nếu có" spellcheck="false" >
                        </textarea>
                    </p>
                </div>
                <div className="col-md-4 col-sm-12">
                    <div className="form_sum">
                        <div className="row sum">
                            <span className="row_L">
                                THÀNH TIỀN
                            </span>
                            <span className="row_R">
                                199.000đ
                            </span>
                            <br className="clean" />
                        </div>
                        <div className="row">
                            <span className="row_L">
                                Phí vận chuyển
                            </span>
                            <a className="sum_note">
                                <span className="ic_cm icon-note">
                                    R
                                </span>
                            </a>
                            <div className="sum_note">
                                <p className="title">
                                    CƯỚC PHÍ GIAO HÀNG
                                </p>
                                <p>
                                    Miễn phí giao hàng cho sản phẩm giao bởi Nhà bán hàng
                                </p>
                                <p>
                                    Ngoại thành TP. HCM, Hà Nội, Tỉnh thành khác
                                </p>
                                <ul>
                                    <li>
                                        Miễn phí với đơn hàng từ
                                        <span>
                                            500.000đ
                                        </span>
                                        trở lên
                                    </li>
                                    <li>
                                        Phí
                                        <span>
                                            29.000đ
                                        </span>
                                        với đơn hàng dưới 500.000đ
                                    </li>
                                </ul>
                                <p>
                                    Nội thành Tp.HCM, HN và các Tp. chi nhánh của Cùng Mua
                                </p>
                                <ul>
                                    <li>
                                        Miễn phí hội viên có thẻ Premium chính thức
                                    </li>
                                    <li>
                                        Miễn phí đơn hàng từ
                                        <span>
                                            100.000đ
                                        </span>
                                        trở lên
                                    </li>
                                    <li>
                                        Phí
                                        <span>
                                            9.000đ
                                        </span>
                                        với đơn hàng sản phẩm dưới 100.000đ
                                    </li>
                                </ul>
                            </div>
                            <span className="row_R">
                                Miễn phí
                            </span>
                            <br className="clean" />
                        </div>
                        <div className="row sum">
                            <span className="row_L">
                                Tiền giảm giá
                            </span>
                            <span className="row_R">
                                -0đ
                            </span>
                            <br className="clean" />
                        </div>
                        <div className="row">
                            <span className="row_L">
                                Cần thanh toán
                            </span>
                            <span className="row_R total_sum">
                                199.000đ
                            </span>
                            <br className="clean" />
                        </div>
                    </div>
                </div>
                <div className="col-md-4 col-sm-12">
                    <p className="bg_btn_buy">
                        <button className="btn_primary">
                            ĐẶT HÀNG
                            <span className="arrow_W_big">
                            </span>
                        </button>
                    </p>
                    <div className="logo_brand">
                        <span className="logo_acb">
                        </span>
                        <span className="logo_cyber">
                        </span>
                        <span className="logo_ssl">
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}
