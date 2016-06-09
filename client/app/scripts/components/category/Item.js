import React, {Component} from 'react'

export default class Item extends Component {
    render() {
        return (
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
        );
    }
}

