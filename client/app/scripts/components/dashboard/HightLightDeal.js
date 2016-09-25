import React, {Component} from 'react';
import {Link} from 'react-router';

export default class HightLightDeal extends Component {
    render() {
        var menu = this.props.menu;
        return (
            <div className="hightlight_deal">
                <Link className="big_deal" to={'/' + menu.link}>
                    <div className='div_mask_one'></div>
                    <div className='div_mask_two'></div>
                    <img alt={menu.name} src={"admin/" + menu.logo_image}></img>
                </Link>
            </div>
        );
    }
}
// http://www.nikesh.me/blog/2010/05/sexy-image-hover-effects-using-css3/