import React, {Component} from 'react'

export default class MenuHorizon extends Component {
    render() {
        return (
            <div className="cate_menu_hoz">
                <ul className="menu_cate_hoz">
                    <li className="active"><a href="/voucher">Tất cả</a></li>
                    <li className=""><a href="/voucher/nha-hang-an-uong">Nhà hàng - Ăn uống</a></li>
                    <li className=""><a href="/voucher/suc-khoe-lam-dep">Sức khỏe - Làm đẹp</a></li>
                    <li className=""><a href="/voucher/su-kien-giai-tri">Sự kiện - Giải trí</a></li>
                    <li className=" end"><a href="/voucher/du-lich-khach-san">Du lịch - Khách sạn</a></li>
                </ul>
            </div>
        );
    }
}
