import React, {Component} from 'react'
import _ from 'lodash'

export default class HeaderMenu extends Component {

    sortMenus(menus) {

        var menuLevelThree = _.filter(menus, menu => {
            if (menu.level === 3) {
                menu.html = (
                    <li key={"menu_" + menu.id}>
                        <a href= {menu.href}>{menu.name}</a>
                    </li>
                );
                return menu;
            }
        });

        var menuLevelTwo = _.filter(menus, menu => {
            if (menu.level === 2) {
                var html = [];
                html.push(
                    <li key={"menu_" + menu.id} className="bold">
                        <a href= {menu.href}>{menu.name}</a>
                    </li>
                );
                _.map(menuLevelThree, ml3 => {
                    if (ml3.parent === menu.id) {
                        html.push(ml3.html);
                    }
                });
                menu.html = html;
                return menu;
            }
        });

        var menuLevelOne = _.filter(menus, menu => {
            if (menu.level === 1) {
                var html = [];
                _.map(menuLevelTwo, ml2 => {
                    if (ml2.parent === menu.id) {
                        html.push(ml2.html);
                    }
                });

                var TwoLevelHtml;
                var TwoLevelHtmlHidden;
                if (html.length) {
                    TwoLevelHtml = (
                        <div className="menu_ver_hover">
                            <ul className="menu_ver_item">
                                {html}
                            </ul>
                        </div>
                    );
                    TwoLevelHtmlHidden = (
                        <ul className="menu_cate_hidden">
                            {html}
                        </ul>
                    );
                }
                menu.html = (
                    <li key={"menu_" + menu.id}>
                        <a href={menu.href}>
                            <span className={"ic_cm " + menu.icon}>
                                {menu.char}
                            </span>
                            {menu.name}
                            <span className="ic_cm icon_arr">
                                K
                            </span>
                        </a>
                        {TwoLevelHtml}
                        {TwoLevelHtmlHidden}
                    </li>
                );
                return menu;
            }
        });
        return menuLevelOne;
    }
    render() {
        var menus = this.sortMenus(this.props.menus);
        var html = _.map(menus, (menu) => {
            return menu.html;
        })
        return (
            <ul className="menu_ver"> 
                {html}
            </ul>
        );
    }
}
