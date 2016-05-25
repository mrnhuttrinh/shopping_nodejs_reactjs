import React, {Component} from 'react';

export default class HightLightDeal extends Component {
    render() {
        var menu = this.props.menu;
        return (
            <div className="hightlight_deal">
                <a className="big_deal" href="http://www.cungmua.com/bn-cm-hcm070416-villas-nghi-duong.html?cmpid=0&cmps=home_page&cmpm=list_t2_banner&cmpc=1" target="_blank">
                    <img alt={menu.name} src={"admin/" + menu.logo_image}></img>
                </a>
            </div>
        );
    }
}
