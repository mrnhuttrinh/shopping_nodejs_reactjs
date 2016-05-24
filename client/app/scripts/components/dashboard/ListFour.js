import React, {Component} from 'react'
import _ from 'lodash';

class Item extends Component {
    render() {
        var product = this.props.product;
        return (
            <li>
                <div className="img">
                    <a href="/voucher/du-lich-khach-san/tour-trong-nuoc/tour-nha-trang-3n3d-ve-vinpearl-land-khach-san-3_p59588.html?cmpid=59588&cmps=home_page&cmpm=list_t2&cmpc=1">
                        <img alt={product.alt} className="deal" height="235" src="http://resources.cungmua.com/Product/cm_s59588.jpg" width="235">
                        </img>
                    </a>
                    <span className="lbl_place">
                        Nha Trang
                    </span>
                    <div className="listdeal_hover_B">
                        <span className="text_alert">
                            Nh?n voucher di?n t? qua email/SMS
                        </span>
                        <a className="btn_view" href="/voucher/du-lich-khach-san/tour-trong-nuoc/tour-nha-trang-3n3d-ve-vinpearl-land-khach-san-3_p59588.html?cmpid=59588&cmps=home_page&cmpm=list_t2&cmpc=1">
                            XEM NGAY
                        </a>
                    </div>
                    <div className="listdeal_evoucher">
                        <span className="ic_cm icon-voucher">
                            I
                        </span>
                        Voucher
                        di?n t?
                    </div>
                </div>
                <div className="listdeal_info">
                    <a className="list_name" href="/voucher/du-lich-khach-san/tour-trong-nuoc/tour-nha-trang-3n3d-ve-vinpearl-land-khach-san-3_p59588.html?cmpid=59588&cmps=home_page&cmpm=list_t2&cmpc=1">
                        Tour Nha Trang 3N3Ð + Vé Vinpearl Land + Khách s?n 3*
                    </a>
                    <div className="listdeal_group">
                        <p className="listdeal_info_L num_down">
                            34
                            <span className="percent">
                                %
                            </span>
                        </p>
                        <p className="listdeal_info_Ce">
                            <span className="trueprice">
                                2.380.000d
                            </span>
                            <span className="price">
                                1.568.000d
                            </span>
                        </p>
                        <div className="listdeal_info_R">
                            <p className="num_people">
                                <span className="ic_cm icon-num-people">
                                    f
                                </span>
                                <span className="text_num_people">
                                    152
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </li>
        );
    }
}

export default class ListFour extends Component {
    render() {
        var products = this.props.products;
        var listItem = _.map(products, (product) => {
            return (<Item product={product}/>)
        });
        return (
            <ul className="listdeal_four">
                {listItem}
            </ul>
        );
    }
}
