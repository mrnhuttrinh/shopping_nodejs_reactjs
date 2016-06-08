import React, {Component} from 'react'
import _ from 'lodash';
import DivLoading from '../FlatLoading';

export default class CategoryContents extends Component {
    render() {
        return (
            <div>
                <div className="index_middle">
                    <div className="container1" id="cateContainer">
                        <div className="title_deal">
                            <div className="title_deal_text">
                                Thời trang nữ
                                <span className="ic_cm">
                                    T
                                </span>
                                <span className="colortext">
                                    1364
                                </span>
                                KHUYẾN MÃI
                            </div>
                            <ul className="title_menu">
                                <li>
                                    <a className="" href="/thoi-trang-nu?sortType=1" id="newest">
                                        <span className="ic_cm ic_check">
                                            r
                                        </span>
                                        MỚI NHẤT
                                    </a>
                                </li>
                                <li>
                                    <a className="actived" href="/thoi-trang-nu?sortType=0" id="best_seller">
                                        <span className="ic_cm ic_check">
                                            r
                                        </span>
                                        ĐANG HOT
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <ul className="listdeal_three" id="cate_list">
                            <li>
                                <div className="img">
                                    <a href="http://www.shipto.vn/dong-ho_c3970?utm_source=cungmua&utm_medium=dealgia&utm_campaign=dong-ho-nu">
                                        <img alt="Đồng hồ nữ chính hãng trên Amazon" className="deal" height="318" src="http://resources.cungmua.com/CMBanner/636009787819296663.jpg" width="318">
                                        </img>
                                    </a>
                                    <div className="listdeal_hover_B">
                                        <a className="btn_view" href="http://www.shipto.vn/dong-ho_c3970?utm_source=cungmua&utm_medium=dealgia&utm_campaign=dong-ho-nu">
                                            XEM NGAY
                                        </a>
                                    </div>
                                </div>
                                <div className="listdeal_info">
                                    <a className="list_name" href="http://www.shipto.vn/dong-ho_c3970?utm_source=cungmua&utm_medium=dealgia&utm_campaign=dong-ho-nu">
                                        Đồng hồ nữ chính hãng trên Amazon
                                    </a>
                                    <div className="listdeal_group">
                                        <p className="listdeal_info_L num_down">
                                            40
                                            <span className="percent">
                                                %
                                            </span>
                                        </p>
                                        <p className="listdeal_info_Ce">
                                            <span className="trueprice">
                                                4.494.000đ
                                            </span>
                                            <br />
                                            <span className="price">
                                                2.600.000đ
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </li>
                             <li>
                                <div className="img">
                                    <a href="http://www.shipto.vn/tui-xach-bop-vi_c733/roxy_th61668?utm_source=cungmua&utm_medium=dealgia&utm_campaign=roxy">
                                        <img alt="BST túi xách Roxy" className="deal" height="318" src="http://resources.cungmua.com/CMBanner/636009791208246616.jpg" width="318">
                                        </img>
                                    </a>
                                    <div className="listdeal_hover_B">
                                        <a className="btn_view" href="http://www.shipto.vn/tui-xach-bop-vi_c733/roxy_th61668?utm_source=cungmua&utm_medium=dealgia&utm_campaign=roxy">
                                            XEM NGAY
                                        </a>
                                    </div>
                                </div>
                                <div className="listdeal_info">
                                    <a className="list_name" href="http://www.shipto.vn/tui-xach-bop-vi_c733/roxy_th61668?utm_source=cungmua&utm_medium=dealgia&utm_campaign=roxy">
                                        BST túi xách Roxy
                                    </a>
                                    <div className="listdeal_group">
                                        <p className="listdeal_info_L num_down">
                                            44
                                            <span className="percent">
                                                %
                                            </span>
                                        </p>
                                        <p className="listdeal_info_Ce">
                                            <span className="trueprice">
                                                857.000đ
                                            </span>
                                            <br />
                                            <span className="price">
                                                497.000đ
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="img">
                                    <a href="/thoi-trang-nu/ao-nu/ao-kieu/ao-nu-dong-gia-39k_pp110637.html">
                                        <img alt="Áo nữ đồng giá 39k" className="deal" height="318" src="http://resources2.cungmua.com/Product/110000/cm_110637.jpg" width="318">
                                        </img>
                                    </a>
                                    <p className="clock">
                                        <span className="ic_cm icon-clock">
                                            g
                                        </span>
                                        <span className="countdown">
                                            00:38:21
                                        </span>
                                    </p>
                                    <p className="flash_hover_T">
                                    </p>
                                    <div className="listdeal_hover_B">
                                        <span className="num_product">
                                            Có 134 sản phẩm
                                        </span>
                                        <a className="btn_view" href="/thoi-trang-nu/ao-nu/ao-kieu/ao-nu-dong-gia-39k_pp110637.html">
                                            XEM NGAY
                                        </a>
                                    </div>
                                </div>
                                <div className="listdeal_info">
                                    <a className="list_name" href="/thoi-trang-nu/ao-nu/ao-kieu/ao-nu-dong-gia-39k_pp110637.html">
                                        Áo nữ đồng giá 39k
                                    </a>
                                    <div className="listdeal_group">
                                        <p className="listdeal_info_L num_down">
                                            90
                                            <span className="percent">
                                                %
                                            </span>
                                        </p>
                                        <p className="listdeal_info_Ce">
                                            <span className="trueprice1">
                                                Chỉ từ
                                            </span>
                                            <br />
                                            <span className="price">
                                                39.000đ
                                            </span>
                                        </p>
                                        <div className="listdeal_info_R">
                                            <p className="num_people">
                                                <span className="ic_cm icon-num-people">
                                                    f
                                                </span>
                                                <span className="text_num_people">
                                                    >2190
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

