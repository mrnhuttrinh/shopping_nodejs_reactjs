import React, {Component} from 'react'
import {Link} from 'react-router'
import _ from 'lodash';

export default class Category extends Component{
    render() {
        var categories = this.props.categories;
        var listDetail = _.map(categories, (category) => (
            <li>
                <div className="img">
                    <Link to={category.href + category.id}>
                        <img width="318" height="318" src={category.src} alt={category.alt} className="deal" />
                    </Link>
                    <p className="clock">
                        <span className="ic_cm icon-clock">g</span><span className="countdown">12:23:43</span>
                    </p>
                    <p className="icon_new">New</p>
                    <div className="listdeal_hover_B">
                        <span className="text_alert">{category.text_alert}</span>
                        <Link to={category.href + category.id} className="btn_view">XEM NGAY</Link>
                    </div>
                </div>
                <div className="listdeal_info">
                    <Link to={category.href + category.id} className="list_name">{category.alt}</Link>
                    <div className="listdeal_group">
                        <p className="listdeal_info_L num_down">{category.num_down}<span className="percent">%</span></p>
                        <p className="listdeal_info_Ce">
                            <span className="trueprice">{category.trueprice} đ</span><br/>
                            <span className="price">{category.price}đ</span>
                        </p>
                        <div className="listdeal_info_R">
                            <span className="btn_flash_group">Số lượng có hạn</span>
                        </div>
                    </div>
                </div>
            </li>
        ))
        return (
            <ul id="product_list" className="listdeal_three">
                {listDetail}
            </ul>
        )
    }
}
