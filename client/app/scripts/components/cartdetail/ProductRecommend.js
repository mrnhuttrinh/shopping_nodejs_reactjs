import React, {Component} from 'react';

export default class ProductRecommend extends Component {
    render() {
        return (
            <div className="container1">
                <div className="product_promotion">
                    <div className="title_page_new home_panel">
                        <h4 className="like_text">
                            Chỉ cần mua đơn hàng từ 
                            <b>
                                {" "}100.000đ{" "}
                            </b>
                            bạn được mua sản phẩm sau với giá ưu đãi
                        </h4>
                    </div>
                    <div className="product_cate_home">
                        <ul className="listdeal_four" id="slideProductKMBanKem">
                            <li>
                                <div className="img">
                                    <a href="/thoi-trang-nu/ao-nu/ao-thun-nu/ao-thun-nu-xuat-khau-f21-gia-cuc-soc_p112083.html" target="_blank">
                                        <img alt="Áo thun nữ xuất khẩu F21 giá cực sốc " className="deal" height="235" src="http://resources2.cungmua.com/Product/112000/cm_s112083.jpg" width="235">
                                        </img>
                                    </a>
                                    <p className="num_product_hover_T">
                                        Có 11 lựa chọn
                                    </p>
                                    <div className="listdeal_hover_B">
                                        <span className="text_alert">
                                            Giao sản phẩm toàn quốc
                                        </span>
                                        <a className="btn_view" href="/thoi-trang-nu/ao-nu/ao-thun-nu/ao-thun-nu-xuat-khau-f21-gia-cuc-soc_p112083.html" target="_blank">
                                            XEM NGAY
                                        </a>
                                    </div>
                                </div>
                                <div className="listdeal_info">
                                    <a className="list_name" href="/thoi-trang-nu/ao-nu/ao-thun-nu/ao-thun-nu-xuat-khau-f21-gia-cuc-soc_p112083.html" target="_blank">
                                        Áo thun nữ xuất khẩu F21 giá cực sốc
                                    </a>
                                    <div className="listdeal_group">
                                        <p className="listdeal_info_L num_down">
                                            86
                                            <span className="percent">
                                                %
                                            </span>
                                        </p>
                                        <p className="listdeal_info_Ce">
                                            <span className="trueprice">
                                                120.000đ
                                            </span>
                                            <span className="price">
                                                17.000đ
                                            </span>
                                            <br />
                                        </p>
                                        <div className="listdeal_info_R">
                                            <p className="num_people">
                                                <span className="ic_cm icon-num-people">
                                                    f
                                                </span>
                                                <span className="text_num_people">
                                                    465
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <br className="clean" />
                    </div>
                </div>
            </div>
        );
    }
}
