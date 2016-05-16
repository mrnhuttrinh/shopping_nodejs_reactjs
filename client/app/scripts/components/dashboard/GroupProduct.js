import React, {Component} from 'react'
import ListFour from './ListFour';
import DivLoading from '../FlatLoading';

class HightLightDeal extends Component {
    render() {
        var menu = this.props.menu;
        return (
            <div className="hightlight_deal">
                <a className="big_deal" href="http://www.cungmua.com/bn-cm-hcm070416-villas-nghi-duong.html?cmpid=0&cmps=home_page&cmpm=list_t2_banner&cmpc=1" target="_blank">
                    <img alt={menu.name} height="295" src={menu.logo_image} width="1000">
                    </img>
                </a>
            </div>
        );
    }
}

class TitleHome extends Component {
    render() {
        var menu = this.props.menu;
        return (
            <div className="title_home">
                <p className="bg_ic ic_text">
                    T1
                </p>
                <a className="title_home_text" href="/voucher/du-lich-khach-san">
                    {menu.name}
                </a>
                <ul className="title_link">
                    <li>
                        <a className="ic_cm link_next" href="/voucher/du-lich-khach-san">
                            i
                        </a>
                    </li>
                    <li>
                        <a className="end" href="/voucher/du-lich-khach-san/thai-lan_l493">
                            Thái Lan
                        </a>
                    </li>
                    <li>
                        <a href="/voucher/du-lich-khach-san/da-nang_l33">
                            Ðà Nẵng
                        </a>
                    </li>
                    <li>
                        <a href="/voucher/du-lich-khach-san/nha-trang_l29">
                            Nha Trang
                        </a>
                    </li>
                    <li>
                        <a href="/voucher/du-lich-khach-san/da-lat_l30">
                            Ðà Lạt
                        </a>
                    </li>
                    <li>
                        <a href="/voucher/du-lich-khach-san/vung-tau_l38">
                            Vũng Tàu
                        </a>
                    </li>
                </ul>
            </div>
        );
    }
}

export default class GroupProduct extends Component {
    render() {
        return (
            <div className="index_middle">
                <div className="container1" data-cat-id="105" data-floor="T1">
                    <TitleHome menu={this.props.menu} />
                    <HightLightDeal menu={this.props.menu} />
                    <ListFour menu={this.props.menu} />
                </div>
            </div>
        );
    }
}
