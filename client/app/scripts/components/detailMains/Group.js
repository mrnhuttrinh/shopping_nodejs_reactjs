import React, {Component} from 'react'
import {Link} from 'react-router'
import _ from 'lodash';

export default class Group extends Component{
    render() {
        var data_group = this.props.data_group;
        var listGroup = _.map(data_group, data => (
            <li>
                <div className="img">
                    <Link to={"/categories/" + data.href}>
                        <img alt={data.alt} className="deal" height="231" src={data.src} width="490">
                        </img>
                    </Link>
                    <p className="icon_new">
                        New
                    </p>
                    <p className="flash_hover_T">
                    </p>
                    <div className="listdeal_hover_B">
                        <span className="num_product">
                            Có {data.num_product} sản phẩm
                        </span>
                        <Link className="btn_view" to={"/categories/" + data.href}>
                            XEM NGAY
                        </Link>
                    </div>
                </div>
                <div className="listdeal_info">
                    <a className="list_name" href="#">
                        Hàng công nghệ xả kho
                    </a>
                    <div className="listdeal_group">
                        <p className="listdeal_info_L num_down">
                            {data.num_down}
                            <span className="percent">
                                %
                            </span>
                        </p>
                        <p className="listdeal_info_Ce">
                            <span className="trueprice1">
                                Chỉ từ
                            </span>
                            <br>
                                <span className="price">
                                    {data.price}đ
                                </span>
                            </br>
                        </p>
                        <p className="listdeal_info_Ce1">
                            <span className="ic_cm icon-clock">
                                g
                            </span>
                            <span className="countdown">
                                02:28:28
                            </span>
                        </p>
                        <div className="listdeal_info_R">
                            <span className="btn_flash_group">
                                Số lượng có hạn
                            </span>
                        </div>
                    </div>
                </div>
            </li>
        ))
        return (
            <ul className="listdeal_two" id="data-flashsale">
                {listGroup}
            </ul>
        )
    }
}
