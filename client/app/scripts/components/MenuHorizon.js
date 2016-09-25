import React, {Component} from 'react';
import {Link} from 'react-router';
import _ from 'lodash';

export default class MenuHorizon extends Component {
    componentDidMount() {
        $(function () {
            var div = $('div.cate_menu_hoz');
            var divWidth = div.width();
            div.css({ overflow: 'hidden' });
            div.mousemove(function (e) {
                var ul = $('ul.menu_cate_hoz');
                var ulPadding = 15;
                var lastLi = ul.find('li:last-child');
                var ulWidth = lastLi[0].offsetLeft + lastLi.outerWidth() + ulPadding;
                var left = (e.pageX - div.offset().left) * (ulWidth - divWidth) / divWidth;
                div.scrollLeft(left);
            });
        });
    }
    getChildrenMenu(currentMenu) {
        return _.map(this.props.menus, menu => {
            if(menu.parent === currentMenu.id && menu.level === (currentMenu.level + 1)) {
                return (<li key={"li_horizontial_" + menu.id} className=""><Link to={"/" + menu.link}>{menu.name}</Link></li>);
            }
        });
    }
    render() {
        var props = this.props;
        var currentHash = props.params.category_link;
        var currentMenu = _.find(props.menus, (menu) => {
            return menu.link === currentHash;
        });
        var listChildren;
        if (currentMenu) {
            listChildren = this.getChildrenMenu(currentMenu);
        }
        return (
            <div className="cate_menu_hoz">
                <ul className="menu_cate_hoz">
                    <li key={"li_horizontial_first"} className="active">
                        <Link to={"/" + currentHash}>Tất cả</Link>
                    </li>
                    {listChildren}
                </ul>
            </div>
        );
    }
}
